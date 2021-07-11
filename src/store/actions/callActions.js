//calling States in the application
export const callStates = {
    CALL_UNAVAILABLE: 'CALL_UNAVAILABLE',
    CALL_AVAILABLE: 'CALL_AVAILABLE',
    CALL_REQUESTED: 'CALL_REQUESTED',
    CALL_IN_PROGRESS: 'CALL_IN_PROGRESS'
};

//all the possible call actions
export const CALL_SET_LOCAL_STREAM = 'CALL.SET_LOCAL_STREAM';
export const CALL_SET_CALL_STATE = 'CALL.SET_CALL_STATE';
export const CALL_SET_CALLING_DIALOG_VISIBLE = 'CALL.SET_CALLING_DIALOG_VISIBLE';
export const CALL_SET_CALLER_USERNAME = 'CALL.SET_CALLER_USERNAME';
export const CALL_SET_CALL_REJECTED = 'CALL.SET_CALL_REJECTED';
export const CALL_SET_REMOTE_STREAM = 'CALL.SET_REMOTE_STREAM';
export const CALL_SET_LOCAL_MICROPHONE_ENABLED = 'CALL.SET_LOCAL_MICROPHONE_ENABLED';
export const CALL_SET_LOCAL_CAMERA_ENABLED = 'CALL.SET_LOCAL_CAMERA_ENABLED';
export const CALL_SET_SCREEN_SHARING_ACTIVE = 'CALL.SET_SCREEN_SHARING_ACTIVE';
export const CALL_RESET_CALL_STATE = 'CALL.RESET_CALL_STATE';
export const CALL_SET_GROUP_CALL_ACTIVE = 'CALL.SET_GROUP_CALL_ACTIVE';
export const CALL_SET_GROUP_CALL_STREAMS = 'CALL.SET_GROUP_CALL_STREAMS';
export const CALL_CLEAR_GROUP_CALL_DATA = 'CALL.CLEAR_GROUP_CALL_DATA';
export const CALL_SET_CHAT_MESSAGE = 'CALL.SET_CHAT_MESSAGE';

//function to set local stream in store
export const setLocalStream = (localStream) => {
    return {
        type: CALL_SET_LOCAL_STREAM,
        localStream
    };
};

//function to set the call state
export const setCallState = (callState) => {
    return {
        type: CALL_SET_CALL_STATE,
        callState
    };
};

//function to make the Calling dialog visible
export const setCallingDialogVisible = (visible) => {
    return {
        type: CALL_SET_CALLING_DIALOG_VISIBLE,
        visible
    };
};

//function to set caller username when call is initiated
export const setCallerUsername = (callerUsername) => {
    return {
        type: CALL_SET_CALLER_USERNAME,
        callerUsername
    };
};

//function to set call as rejected when callee rejects pre-offer
export const setCallRejected = (callRejectedDetails) => {
    return {
        type: CALL_SET_CALL_REJECTED,
        callRejected: {
            rejected: callRejectedDetails.rejected,
            reason: callRejectedDetails.reason
        }
    };
};

//function to set call stream from user
export const setRemoteStream = (remoteStream) => {
    return {
        type: CALL_SET_REMOTE_STREAM,
        remoteStream
    };
};

//function to set local microphone on
export const setLocalMicrophoneEnabled = (enabled) => {
    return {
        type: CALL_SET_LOCAL_MICROPHONE_ENABLED,
        enabled
    };
};

//function to set local camera on
export const setLocalCameraEnabled = (enabled) => {
    return {
        type: CALL_SET_LOCAL_CAMERA_ENABLED,
        enabled
    };
};

//function to activate screen sharing
export const setScreenSharingActive = (active) => {
    return {
        type: CALL_SET_SCREEN_SHARING_ACTIVE,
        active
    };
};

//function to reset state of call
export const resetCallDataState = () => {
    return {
        type: CALL_RESET_CALL_STATE
    };
};

//function to change state of group call room to active
export const setGroupCallActive = (active) => {
    return {
        type: CALL_SET_GROUP_CALL_ACTIVE,
        active
    };
};


//function to get incoming streams in group callS
export const setGroupCallIncomingStreams = (groupCallStreams) => {
    return {
        type: CALL_SET_GROUP_CALL_STREAMS,
        groupCallStreams
    };
};

//function to clear group call data on leaving group
export const clearGroupCallData = () => {
    return {
        type: CALL_CLEAR_GROUP_CALL_DATA
    };
};

//function to set message in conversation
export const setMessage = (messageReceived, messageContent) => {
    return {
        type: CALL_SET_CHAT_MESSAGE,
        message: {
            received: messageReceived,
            content: messageContent
        }
    };
};