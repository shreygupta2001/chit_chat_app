//importing required dependencies
import React from 'react';
import usericon from '../../../resources/usericon.png';
import { callStates } from '../../../store/actions/callActions';
import { callToOtherUser } from '../../../utils/webRTC/webRTCHandler';

//function to handle operation on each active user list item
const ActiveUsersListItem = (props) => {

    const { activeUser, callState } = props;

    //calling  only possible if not already in another call
    const handleListItemPressed = () => {
        if (callState === callStates.CALL_AVAILABLE) {
            callToOtherUser(activeUser);
        }
    };

    return (
        <div className='list_item' onClick={handleListItemPressed}>
            <div className='list_image_container'>
                <img className='list_image' src={usericon} alt='user'></img>
            </div>
            <span className='list_text'> {activeUser.username}</span>
        </div>
    );
};

export default ActiveUsersListItem;