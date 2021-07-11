//file to manage all streams and video elements in group call 

//importing required dependencies
import React from 'react';
import ConversationButtons from '../ConversationButtons/ConversationButtons';
import GroupCallVideo from './GroupCallVideo';
import './GroupCallRoom.css';

//function to display group calling feature
const GroupCallRoom = (props) => {
    const { groupCallStreams } = props;

    return (
        <div className='room_container'>
            <span className='room_title'>
                Group Call Room
            </span>
            <div className='video_streams'>
                {
                    groupCallStreams.map(stream => {
                        return <GroupCallVideo key={stream.id} stream={stream} />;
                    })
                }
            </div>
            <ConversationButtons {...props} groupCall />
        </div>
    );
};

export default GroupCallRoom;