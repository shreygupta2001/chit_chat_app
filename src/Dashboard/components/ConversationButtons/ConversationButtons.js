//file to handle operations related to call buttons

//importing required dependencies
import React from 'react';
import { MdCallEnd, MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdVideoLabel, MdCamera } from 'react-icons/md';
import { hangUp, switchForScreenSharingStream } from '../../../utils/webRTC/webRTCHandler';
import ConversationButton from './ConversationButton';

//styling to the buttons
const styles = {
    buttonBox: {
        display: 'flex',
        position: 'absolute',
        bottom: '21%',
        right: '55%'
    },
    icon: {
        width: '30px',
        height: '30px',
        fill: '#ececeb'
    }
};

const ConversationButtons = (props) => {

    const {
        localStream,
        localCameraEnabled,
        localMicrophoneEnabled,
        setCameraEnabled,
        setMicrophoneEnabled,
        screenSharingActive,
        groupCall
    } = props;

    //handler for pressing microphone button
    const MicPressed = () => {
        const micEnabled = localMicrophoneEnabled;
        localStream.getAudioTracks()[0].enabled = !micEnabled;
        setMicrophoneEnabled(!micEnabled);
    };

    //handler for pressing camera button
    const CameraPressed = () => {
        const cameraEnabled = localCameraEnabled;
        localStream.getVideoTracks()[0].enabled = !cameraEnabled;
        setCameraEnabled(!cameraEnabled);
    };

    //handler for screen sharing button
    const ScreenSharePressed = () => {
        switchForScreenSharingStream();
    };

    //handler for end call button
    const EndCallPressed = () => {
        hangUp();
    }

    return (
        <div style={styles.buttonBox}>

            <ConversationButton onClickHandler={MicPressed}>
                {localMicrophoneEnabled ? <MdMic style={styles.icon} /> : <MdMicOff style={styles.icon} />}
            </ConversationButton>

            {!groupCall && <ConversationButton onClickHandler={EndCallPressed}>
                <MdCallEnd style={styles.icon} />
            </ConversationButton>}

            <ConversationButton onClickHandler={CameraPressed}>
                {localCameraEnabled ? <MdVideocam style={styles.icon} /> : <MdVideocamOff style={styles.icon} />}
            </ConversationButton>

            {!groupCall && <ConversationButton onClickHandler={ScreenSharePressed}>
                {screenSharingActive ? <MdCamera style={styles.icon} /> : <MdVideoLabel style={styles.icon} />}
            </ConversationButton>}
        </div>
    );
};

export default ConversationButtons;