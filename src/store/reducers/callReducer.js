import * as callActions from '../actions/callActions';

//initial state of user
const initState = {
    localStream: null,
    callState: callActions.callStates.CALL_UNAVAILABLE,
    callingDialogVisible: false,
    callerUsername: '',
    callRejected: {
        rejected: false,
        reason: ''
    },
    remoteStream: null,
    localCameraEnabled: true,
    localMicrophoneEnabled: true,
    screenSharingActive: false,
    groupCallActive: false,
    groupCallStreams: [],
    message: {
        received: false,
        content: ''
    }
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case callActions.CALL_SET_LOCAL_STREAM:
            return {
                ...state,
                localStream: action.localStream
            };

        case callActions.CALL_SET_CALL_STATE:
            return {
                ...state,
                callState: action.callState
            };
        
        //action to be performe when call is initiated
        case callActions.CALL_SET_CALLING_DIALOG_VISIBLE:
            return {
                ...state,
                callingDialogVisible: action.visible
            };

        //action to set caller username
        case callActions.CALL_SET_CALLER_USERNAME:
            return {
                ...state,
                callerUsername: action.callerUsername
            };

        //action when call is rejected
        case callActions.CALL_SET_CALL_REJECTED:
            return {
                ...state,
                callRejected: action.callRejected
            };
        
        //action to set remote stream
        case callActions.CALL_SET_REMOTE_STREAM:
            return {
                ...state,
                remoteStream: action.remoteStream
            };

        //action to turn on local camera
        case callActions.CALL_SET_LOCAL_CAMERA_ENABLED:
            return {
                ...state,
                localCameraEnabled: action.enabled
            };

        //action to turn on local microphone
        case callActions.CALL_SET_LOCAL_MICROPHONE_ENABLED:
            return {
                ...state,
                localMicrophoneEnabled: action.enabled
            };

        //action to start sharing screen
        case callActions.CALL_SET_SCREEN_SHARING_ACTIVE:
            return {
                ...state,
                screenSharingActive: action.active
            };
        
        //action to reset call data
        case callActions.CALL_RESET_CALL_STATE:
            return {
                ...state,
                remoteStream: null,
                screenSharingActive: false,
                callerUsername: '',
                localMicrophoneEnabled: true,
                localCameraEnabled: true,
                callingDialogVisible: false
            };

        //action to set state of group call room to active
        case callActions.CALL_SET_GROUP_CALL_ACTIVE:
            return {
                ...state,
                groupCallActive: action.active
            };

        //action to set incoming streams as group call streams
        case callActions.CALL_SET_GROUP_CALL_STREAMS:
            return {
                ...state,
                groupCallStreams: action.groupCallStreams
            };
        
        //action to clear group call data and reset states
        case callActions.CALL_CLEAR_GROUP_CALL_DATA:
            return {
                ...state,
                groupCallActive: false,
                groupCallStreams: [],
                callState: callActions.callStates.CALL_AVAILABLE,
                localMicrophoneEnabled: true,
                localCameraEnabled: true
            };
        
        //action to set message through data channel in chat
        case callActions.CALL_SET_CHAT_MESSAGE:
            return {
                ...state,
                message: action.message
            };

        default:
            return state;
    }
};

export default reducer;