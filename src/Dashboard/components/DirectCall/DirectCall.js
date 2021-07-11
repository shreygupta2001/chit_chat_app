//file to integrate all functions related to direct call

//importing required dependencies
import React from 'react';
import { connect } from 'react-redux';
import LocalVideoView from '../LocalVideoView/LocalVideoView';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import CallingDialog from '../CallingDialog/CallingDialog';
import CallRejectedDialog from '../CallRejectedDialog/CallRejectedDialog';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog';
import {
    callStates,
    setCallRejected,
    setLocalCameraEnabled,
    setLocalMicrophoneEnabled,
    setMessage
} from '../../../store/actions/callActions';
import ConversationButtons from '../ConversationButtons/ConversationButtons';
import Messenger from '../Messenger/Messenger';

//function for handling Direct calling
const DirectCall = (props) => {

    const {
        localStream,
        remoteStream,
        callState,
        callerUsername,
        callingDialogVisible,
        callRejected,
        hideCallRejectedDialog,
        message,
        setDirectMessage
    } = props;

    return (
        //display various components in direct call
        <>
            <LocalVideoView localStream={localStream} />

            {remoteStream && callState === callStates.CALL_IN_PROGRESS && <RemoteVideoView remoteStream={remoteStream} />}

            {callRejected.rejected && <CallRejectedDialog
                reason={callRejected.reason}
                hideCallRejectedDialog={hideCallRejectedDialog}
            />}

            {callState === callStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername} />}

            {callingDialogVisible && <CallingDialog />}

            {remoteStream && callState === callStates.CALL_IN_PROGRESS && <ConversationButtons {...props} />}

            {remoteStream && callState === callStates.CALL_IN_PROGRESS && <Messenger message={message} setDirectMessage={setDirectMessage} />}
        </>
    );
};

//connect to store to get components
function mapStoreStateToProps({ call }) {
    return {
        ...call
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideCallRejectedDialog: (callRejectedDetails) => dispatch(setCallRejected(callRejectedDetails)),
        setCameraEnabled: (enabled) => dispatch(setLocalCameraEnabled(enabled)),
        setMicrophoneEnabled: (enabled) => dispatch(setLocalMicrophoneEnabled(enabled)),
        setDirectMessage: (received, content) => dispatch(setMessage(received, content))
    };
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall);