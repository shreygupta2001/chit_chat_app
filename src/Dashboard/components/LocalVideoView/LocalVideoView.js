//file to dispay the local video stream for direct and group calling
import React, { useRef, useEffect } from 'react';

//styling of local media stream container
const styles = {
    videoContainer: {
        width: '125px',
        height: '125px',
        borderRadius: '20px',
        position: 'absolute',
        top: '2%',
        left: '2%'
    },
    videoElement: {
        width: '100%',
        height: '100%'
    }
};

//function to display local video stream
const LocalVideoView = props => {
    const { localStream } = props;
    const localVideoRef = useRef();

    useEffect(() => {
        if (localStream) {
            const localVideo = localVideoRef.current;
            localVideo.srcObject = localStream;

            localVideo.onloadedmetadata = () => {
                localVideo.play();
            };
        }
    }, [localStream]);

    return (
        <div style={styles.videoContainer} className='background_secondary_color'>
            <video style={styles.videoElement} ref={localVideoRef} autoPlay muted></video>
        </div>
    );
};

export default LocalVideoView;