//file to display remote user's video in direct calling
import React, { useRef, useEffect } from 'react';

//styling for remote video
const styles = {
    videoContainer: {
        width: '75%',
        height: '100%'
    },
    videoElement: {
        width: '100%',
        height: '100%'
    }
};

//fucntion to fetch and display remote video stream
const LocalVideoView = props => {
    const { remoteStream } = props;
    const remoteVideoRef = useRef();

    useEffect(() => {
        if (remoteStream) {
            const remoteVideo = remoteVideoRef.current;
            remoteVideo.srcObject = remoteStream;

            remoteVideo.onloadedmetadata = () => {
                remoteVideo.play();
            };
        }
    }, [remoteStream]);

    return (
        <div style={styles.videoContainer}>
            <video style={styles.videoElement} ref={remoteVideoRef} autoPlay></video>
        </div>
    );
};

export default LocalVideoView;