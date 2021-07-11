import React from 'react';

//function to  receive message from props and display it
const MessageShow = (props) => {
    return (
        <div className='message_displayer' >
            {props.message}
        </div>
    );
};

export default MessageShow;