import { callStates, setCallState, setGroupCallActive, setGroupCallIncomingStreams, clearGroupCallData } from "../../store/actions/callActions";
import store from "../../store/store";
import * as wss from '../webSocketConnection/webSocketConnection';

let myPeer;
let myPeerId;
let groupCallRoomId;
let groupCallHost = false;

export const connectWithMyPeer = () => {
    myPeer = new window.Peer();

    myPeer.on('open', (id) => {
        console.log('successfully connected with peer server');
        myPeerId = id;
    });

    //listener when a new user joins on call
    myPeer.on('call', call => {
        call.answer(store.getState().call.localStream);
        call.on('stream', incomingStream => {
            const streams = store.getState().call.groupCallStreams;
            const stream = streams.find(stream => stream.id === incomingStream.id);

            if (!stream) {
                addVideoStream(incomingStream);
            }
        });
    });
};

//function for creating new group call room
export const createNewGroupCall = () => {
    groupCallHost = true;
    wss.registerGroupCall({
        username: store.getState().dashboard.username,
        peerId: myPeerId
    });

    store.dispatch(setGroupCallActive(true));
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

//funciton for joining an existing group call
export const joinGroupCall = (hostSocketId, roomId) => {
    const localStream = store.getState().call.localStream;
    groupCallRoomId = roomId;

    wss.userWantsToJoinGroupCall({
        peerId: myPeerId,
        hostSocketId,
        roomId,
        localStreamId: localStream.id
    });

    store.dispatch(setGroupCallActive(true));
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

//function to connect to new user after joing room
export const connectToNewUser = (data) => {
    const localStream = store.getState().call.localStream;

    const call = myPeer.call(data.peerId, localStream);

    //get all the streams and displaying it if not already added
    call.on('stream', (incomingStream) => {
        const streams = store.getState().call.groupCallStreams;
        const stream = streams.find(stream => stream.id === incomingStream.id);

        if (!stream) {
            addVideoStream(incomingStream);
        }
    });
};

//function to leave group call on pressing leave group call button
export const leaveGroupCall = () => {

    //if host ends the group call
    if (groupCallHost) {
        wss.groupCallClosedByHost({
            peerId: myPeerId
        });
    } else {
        wss.userLeftGroupCall({
            streamId: store.getState().call.localStream.id,
            roomId: groupCallRoomId
        });
    }

    clearGroupData();
};

//function to clear group call data 
export const clearGroupData = () => {
    groupCallRoomId = null;
    groupCallHost = null;
    store.dispatch(clearGroupCallData());
    myPeer.destroy();
    connectWithMyPeer();

    const localStream = store.getState().call.localStream;
    localStream.getVideoTracks()[0].enabled = true;
    localStream.getAudioTracks()[0].enabled = true;
};

//function to remove an inactive stream on leaving group call
export const removeInactiveStream = (data) => {
    const groupCallStreams = store.getState().call.groupCallStreams.filter(
        stream => stream.id !== data.streamId
    );
    store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
};

//function to add an incoming stream to other group call streams
const addVideoStream = (incomingStream) => {
    const groupCallStreams = [
        ...store.getState().call.groupCallStreams,
        incomingStream
    ];

    store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
};

//function to check if group call is active, return room id
//otherwise return false
export const checkActiveGroupCall = () => {
    if (store.getState().call.groupCallActive) {
        return groupCallRoomId;
    } else {
        return false;
    }
};