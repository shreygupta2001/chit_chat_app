//code to establish connection to Web Socket Server

//importing the required dependencies
import socketClient from 'socket.io-client';
import store from '../../store/store';
import * as dashboardActions from '../../store/actions/dashboardActions';
import * as webRTCHandler from '../webRTC/webRTCHandler';
import * as webRTCGroupCallHandler from '../webRTC/webRTCGroupCallHandler';

const SERVER = 'https://chitchat-serverbackend.herokuapp.com/';

const broadcastEventTypes = {
    ACTIVE_USERS: 'ACTIVE_USERS',
    GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
};

let socket;

//function to connect frontend with Web Socket
export const connectWithWebSocket = () => {
    socket = socketClient(SERVER);

    //event listener when backend emits 'connection'
    socket.on('connection', () => {
        console.log('succesfully connected with web socket server');
    });

    //event listener related to broadcasr data 
    socket.on('broadcast', (data) => {
        handleBroadcastEvents(data);
    });

    //event listeners related to direct call
    socket.on('pre-offer', (data) => {
        webRTCHandler.handlePreOffer(data);
    });

    socket.on('pre-offer-answer', (data) => {
        webRTCHandler.handlePreOfferAnswer(data);
    });

    socket.on('webRTC-offer', (data) => {
        webRTCHandler.handleOffer(data);
    });

    socket.on('webRTC-answer', (data) => {
        webRTCHandler.handleAnswer(data);
    });

    socket.on('webRTC-candidate', (data) => {
        webRTCHandler.handleCandidate(data);
    });

    socket.on('user-hanged-up', () => {
        webRTCHandler.handleUserHangedUp();
    });

    //listeners for group calls
    socket.on('group-call-join-request', (data) => {
        webRTCGroupCallHandler.connectToNewUser(data);
    });

    socket.on('group-call-user-left', (data) => {
        webRTCGroupCallHandler.removeInactiveStream(data);
    });
};

//function to register new user and emit it for listener function
export const registerNewUser = (username) => {
    socket.emit('register-new-user', {
        username: username,
        socketId: socket.id
    });
};

//emiting events to server related with direct calling

//sending pre offer
export const sendPreOffer = (data) => {
    socket.emit('pre-offer', data);
};

//web socket response to server sending pre offer answer
export const sendPreOfferAnswer = (data) => {
    socket.emit('pre-offer-answer', data);
};

//sending webRTC offer
export const sendWebRTCOffer = (data) => {
    socket.emit('webRTC-offer', data);
};

//sending webRTC answer
export const sendWebRTCAnswer = (data) => {
    socket.emit('webRTC-answer', data);
};

//sending webRTC candidate on receiving data
export const sendWebRTCCandidate = (data) => {
    socket.emit('webRTC-candidate', data);
};

//sending information that user hanged up
export const sendUserHangedUp = (data) => {
    socket.emit('user-hanged-up', data);
};

//emitting events related to group call

//register a new group call room
export const registerGroupCall = (data) => {
    socket.emit('group-call-register', data);
};

//request to join a group call
export const userWantsToJoinGroupCall = (data) => {
    socket.emit('group-call-join-request', data);
};

//emitting that a user left group call
export const userLeftGroupCall = (data) => {
    socket.emit('group-call-user-left', data);
};

//emitting that group call is closed by host
export const groupCallClosedByHost = (data) => {
    socket.emit('group-call-closed-by-host', data);
};

//function to handle the vaarious events related to broadcast
const handleBroadcastEvents = (data) => {
    switch (data.event) {
        
        case broadcastEventTypes.ACTIVE_USERS:
            //filter to see only other users except ours in the list
            const activeUsers = data.activeUsers.filter(activeUser => activeUser.socketId !== socket.id);
            store.dispatch(dashboardActions.setActiveUsers(activeUsers));
            break;

        //broadcast event related to group calls
        case broadcastEventTypes.GROUP_CALL_ROOMS:
            const groupCallRooms = data.groupCallRooms.filter(room => room.socketId !== socket.id);
            const activeGroupCallRoomId = webRTCGroupCallHandler.checkActiveGroupCall();

            if (activeGroupCallRoomId) {
                const room = groupCallRooms.find(room => room.roomId === activeGroupCallRoomId);

                if (!room) {
                    webRTCGroupCallHandler.clearGroupData();
                }
            }
            store.dispatch(dashboardActions.setGroupCalls(groupCallRooms));
            break;

        default:
            break;
    }
};