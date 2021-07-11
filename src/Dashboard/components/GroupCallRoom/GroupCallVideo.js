//file to display video streams in group call

import React, { useRef, useEffect } from 'react';

//styling for video streams in group calling
const styles = {
    videoContainer: {
        width: '300px',
        height: '300px'
    },
    videoElement: {
        width: '100%',
        height: '100%'
    }
};

const GroupCallVideo = ({ stream }) => {
    const videoRef = useRef();

    //logic to display the video streams
    useEffect(() => {
        const remoteGroupCallVideo = videoRef.current;
        remoteGroupCallVideo.srcObject = stream;
        remoteGroupCallVideo.onloadedmetadata = () => {
            remoteGroupCallVideo.play();
        };
    }, [stream]);

    return (
        <div style={styles.videoContainer}>
            <video ref={videoRef} autoPlay style={styles.videoElement} />
        </div>
    );
};

export default GroupCallVideo;