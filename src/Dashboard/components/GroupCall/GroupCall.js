//file for all the group call related functions

//importing required dependencies
import React from 'react';
import { connect } from 'react-redux';
import { callStates, setLocalCameraEnabled, setLocalMicrophoneEnabled } from '../../../store/actions/callActions';
import GroupCallButton from '../GroupCallButton/GroupCallButton';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler';
import GroupCallRoom from '../GroupCallRoom/GroupCallRoom';

//function for group calling room
const GroupCall = (props) => {
    const { callState, localStream, groupCallActive} = props;

    //create room using webRTC
    const createRoom = () => {
        webRTCGroupCallHandler.createNewGroupCall();
    };

    //leaving room
    const leaveRoom = () => {
        webRTCGroupCallHandler.leaveGroupCall();
    };

    return (
        <>
            {!groupCallActive && localStream && callState !== callStates.CALL_IN_PROGRESS &&
                <GroupCallButton onClickHandler={createRoom} label='Create Room' />}
            {groupCallActive && <GroupCallRoom {...props} />}
            {groupCallActive && <GroupCallButton onClickHandler={leaveRoom} label='Leave Room' />}
        </>
    );
};

const mapStoreStateToProps = ({ call }) => ({
    ...call
});

const mapActionsToProps = (dispatch) => {
    return {
        setCameraEnabled: enabled => dispatch(setLocalCameraEnabled(enabled)),
        setMicrophoneEnabled: enabled => dispatch(setLocalMicrophoneEnabled(enabled))
    };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(GroupCall);