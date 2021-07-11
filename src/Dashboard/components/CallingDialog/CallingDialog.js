//Calling dialog component when a direct call is placed

//importing required dependencies
import React from 'react';
import { MdCallEnd } from 'react-icons/md';
import { hangUp } from '../../../utils/webRTC/webRTCHandler';

//styling for dialog box
import './CallingDialog.css';

//calling dialog styling
const styles = {
    buttonContainer: {
        marginTop: '30px',
        width: '45px',
        height: '45px',
        borderRadius: '25px',
        border: '3px solid #ececeb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

//function to handle dialog box when call is initiated
const CallingDialog = () => {

    const handleHangUpButtonPressed = () => {
        hangUp();
    }

    return (
        <div className='call_dialog background_secondary_color'>
            <span className='caller_name'> Calling </span>
            <div style={styles.buttonContainer} onClick={handleHangUpButtonPressed}>
                <MdCallEnd style={{ width: '25px', height: '25px', fill: '#ececeb' }} />
            </div>
        </div>
    );
};

export default CallingDialog;