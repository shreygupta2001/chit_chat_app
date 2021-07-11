//file to handle webRTC connections

//importing required depenencies
import {
    setCallState,
    setLocalStream,
    callStates,
    setCallingDialogVisible,
    setCallerUsername,
    setCallRejected,
    setRemoteStream,
    setScreenSharingActive,
    resetCallDataState,
    setMessage,
} from "../../store/actions/callActions"
import store from '../../store/store';
import * as wss from '../webSocketConnection/webSocketConnection';
import { getTurnServers } from "./turn";

//possible answers to pre offer
const preOfferAnswers = {
    CALL_ACCEPTED: 'CALL_ACCEPTED',
    CALL_REJECTED: 'CALL_REJECTED',
    CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE'
}

const audioVideoConstraints = {
    video: {
        width: 480,
        height: 360
    },
    audio: true
};

//configuration for webRTC connection
const configuration = {
    iceServers: [{ url: 'stun:stun.1und1.de:3478' }]
};

let connectedUserSocketId;
let peerConnection;
let dataChannel;

//function to get access to local stream
export const getLocalStream = () => {
    navigator.mediaDevices.getUserMedia(audioVideoConstraints)
        .then(stream => {
            store.dispatch(setLocalStream(stream));
            store.dispatch(setCallState(callStates.CALL_AVAILABLE));
            createPeerConnection();
        })
        .catch(err => {
            console.log('error in getting access to local stream');
            console.log(err);
        })
};

//function to create new peer connection using webRTC
const createPeerConnection = () => {
    peerConnection = new RTCPeerConnection(configuration);

    const localStream = store.getState().call.localStream;

    //get access to local stream
    for (const track of localStream.getTracks()) {
        peerConnection.addTrack(track, localStream);
    };

    //dispatching the remote stream from store
    peerConnection.ontrack = ({ streams: [stream] }) => {
        store.dispatch(setRemoteStream(stream));
    };

    //exchange data using webRTC data channels
    peerConnection.ondatachannel = (event) => {
        const dataChannel = event.channel;

        dataChannel.onopen = () => {
            console.log('peer connection ready for messaging');
        };

        dataChannel.onmessage = (event) => {
            store.dispatch(setMessage(true, event.data));
        };
    }

    //data channel for chat
    dataChannel = peerConnection.createDataChannel('chat');

    dataChannel.onopen = () => {
        console.log('chat channel successfully opened');
    }

    //sending of ice candidates to the user
    peerConnection.onicecandidate = (event) => {
        //console.log('getting candidates from STUN');
        if (event.candidate) {
            wss.sendWebRTCCandidate({
                candidate: event.candidate,
                connectedUserSocketId: connectedUserSocketId
            })
        };
    };

    //checking if connection is established
    peerConnection.onconnectionstatechange = (event) => {
        if (peerConnection.connectionState === 'connected') {
            console.log('successfully connected');
        };
    };
};

//function to execute when direct call is placed
export const callToOtherUser = (calleeDetails) => {
    connectedUserSocketId = calleeDetails.socketId;
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
    store.dispatch(setCallingDialogVisible(true));

    //send offer to callee for video chat permission
    wss.sendPreOffer({
        callee: calleeDetails,
        caller: {
            username: store.getState().dashboard.username
        }
    });
};

//function to handle pre offer
export const handlePreOffer = (data) => {

    store.dispatch(setCallingDialogVisible(false));

    if (chekIfCallIsPossible()) {
        connectedUserSocketId = data.callerSocketId;
        store.dispatch(setCallerUsername(data.callerUsername));
        store.dispatch(setCallState(callStates.CALL_REQUESTED));
    } else {
        wss.sendPreOfferAnswer({
            callerSocketId: data.callerSocketId,
            answer: preOfferAnswers.CALL_NOT_AVAILABLE
        })
    }
};

//function to accept pre offer request
export const acceptIncomingCallRequest = () => {
    wss.sendPreOfferAnswer({
        callerSocketId: connectedUserSocketId,
        answer: preOfferAnswers.CALL_ACCEPTED
    });

    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

//function to reject pre offer request
export const rejectIncomingCallRequest = () => {
    wss.sendPreOfferAnswer({
        callerSocketId: connectedUserSocketId,
        answer: preOfferAnswers.CALL_REJECTED
    });

    resetCallData();
};

//function to handle the pre-offer answer
export const handlePreOfferAnswer = (data) => {
    store.dispatch(setCallingDialogVisible(false));

    if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
        sendOffer();
    } else {
        let rejectionReason;
        if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
            rejectionReason = 'Callee is not available';
        } else {
            rejectionReason = 'Call Rejected';
        }
        store.dispatch(setCallRejected({
            rejected: true,
            reason: rejectionReason
        }));

        resetCallData();
    }
};

//function to create and send webRTC offer
const sendOffer = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    wss.sendWebRTCOffer({
        calleeSocketId: connectedUserSocketId,
        offer: offer
    });
};

//funciton to handle webRTC offer
export const handleOffer = async (data) => {
    await peerConnection.setRemoteDescription(data.offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    wss.sendWebRTCAnswer({
        callerSocketId: connectedUserSocketId,
        answer: answer
    });
};

//function to handle webRTC offer answer
export const handleAnswer = async (data) => {
    await peerConnection.setRemoteDescription(data.answer);
};

//function to handle ice candidates from a webRTC offer
export const handleCandidate = async (data) => {
    try {
        //console.log('adding ice candidates');
        await peerConnection.addIceCandidate(data.candidate);
    } catch (err) {
        console.error('error in ice candidates receiving', err);
    }
};

//function to check if call to a user is possible or not
export const chekIfCallIsPossible = () => {
    if (store.getState().call.localStream === null ||
        store.getState().call.callState !== callStates.CALL_AVAILABLE) {
        return false;
    } else {
        return true;
    }
};

let screenSharingStream;

//function to take screen stream and share it to other user or other way
export const switchForScreenSharingStream = async () => {

    if (!store.getState().call.screenSharingActive) {
        try {
            screenSharingStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            store.dispatch(setScreenSharingActive(true));
            const senders = peerConnection.getSenders();
            const sender = senders.find(sender => sender.track.kind === screenSharingStream.getVideoTracks()[0].kind);
            sender.replaceTrack(screenSharingStream.getVideoTracks()[0]);
        } catch (err) {
            console.error('error occured in screen sharing', err);
        }
    } else {
        const localStream = store.getState().call.localStream;
        const senders = peerConnection.getSenders();
        const sender = senders.find(sender => sender.track.kind === localStream.getVideoTracks()[0].kind);
        sender.replaceTrack(localStream.getVideoTracks()[0]);
        store.dispatch(setScreenSharingActive(false));
        screenSharingStream.getTracks().forEach(track => track.stop());
    }
};

export const handleUserHangedUp = () => {
    resetCallDataAfterHangUp();
};

//function to end the direct call
export const hangUp = () => {
    wss.sendUserHangedUp({
        connectedUserSocketId: connectedUserSocketId
    });

    resetCallDataAfterHangUp();
};

//function to reset calling ata after ending a call
const resetCallDataAfterHangUp = () => {

    //if screen sharing is active while hanging upS
    if (store.getState().call.screenSharingActive) {
        screenSharingStream.getTracks().forEach(track => {
            track.stop();
        });
    }

    store.dispatch(resetCallDataState());

    peerConnection.close();
    peerConnection = null;
    createPeerConnection();
    resetCallData();

    const localStream = store.getState().call.localStream;

    localStream.getVideoTracks()[0].enabled = true;
    localStream.getAudioTracks()[0].enabled = true;
};

//function for resetting call data
export const resetCallData = () => {
    connectedUserSocketId = null;
    store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};

//function for sending message using data channel
export const sendMessage = (message) => {
    dataChannel.send(message);
}