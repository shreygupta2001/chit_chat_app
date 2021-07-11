import React from 'react';
import { acceptIncomingCallRequest, rejectIncomingCallRequest } from '../../../utils/webRTC/webRTCHandler';

import './IncomingCallDialog.css';

//function to handle incoming call operation using dialog
const IncomingCallDialog = ({ callerUsername }) => {

    //operation of accepting the call
    const AcceptButton = () => {
        acceptIncomingCallRequest();
    }

    //operation of rejecting the call
    const RejectButton = () => {
        rejectIncomingCallRequest();
    }

    return (
        <div className='call_dialog background_secondary_color'>
            <span className='caller_name'>{callerUsername}</span>
            <div className='button_container'>
                <button className='accept_button' onClick={AcceptButton}>
                    Accept
                </button>
                <button className='reject_button' onClick={RejectButton}>
                    Reject
                </button>
            </div>
        </div>
    );
};

export default IncomingCallDialog;