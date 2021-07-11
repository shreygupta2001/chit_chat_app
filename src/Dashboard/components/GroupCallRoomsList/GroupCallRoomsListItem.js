//importing required dependencies
import React from 'react';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler';

const GroupCallRoomsListItem = ({ room }) => {

    //function to join a room on pressing it from list
    const handleListItemPressed = () => {
        webRTCGroupCallHandler.joinGroupCall(room.socketId, room.roomId);
    };

    return (
        <div onClick={handleListItemPressed} className='rooms_list room'>
            <span> {room.hostName}</span>
        </div>
    );
};

export default GroupCallRoomsListItem;