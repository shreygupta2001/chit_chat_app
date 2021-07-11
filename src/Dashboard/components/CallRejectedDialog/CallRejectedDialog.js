//CallRejected component to display dialog when call is rejected

import React, { useEffect } from 'react';

import './CallRejectedDialog.css';

//function to handle operation when call is rejected by a user
const CallRejectedDialog = ({ reason, hideCallRejectedDialog }) => {

    //timeout when component is rendered on call rejection
    useEffect(() => {
        setTimeout(() => {
            hideCallRejectedDialog({
                rejected: false,
                reason: ''
            });
        }, [2000]);
    }, []);

    return (
        <div className='reject_call_dialog background_secondary_color'>
            <span className='dialog_text'>
                {reason}
            </span>
        </div>
    );
};

export default CallRejectedDialog;