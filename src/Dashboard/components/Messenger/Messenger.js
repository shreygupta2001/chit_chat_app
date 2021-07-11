import React, { useState, useEffect } from 'react';
import { sendMessage } from '../../../utils/webRTC/webRTCHandler';
import MessageShow from './MessageShow';

import './Messenger.css';

//function for sending messages usinf messenger
const Messenger = ({ message, setDirectMessage }) => {

    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            sendMessage(inputValue);
            setInputValue('');
        }
    };

    useEffect(() => {
        if (message.received) {
            setTimeout(() => {
                setDirectMessage(false, '');
            }, [4000])
        }
    }, [message.received]);

    return (
        <>
            <div className='messenger_box'>
                <h2 className='head'>Chat Box</h2>
                <input
                    className='message_input'
                    type='text'
                    value={inputValue}
                    onChange={(e) => { setInputValue(e.target.value) }}
                    onKeyDown={handleKeyDown}
                    placeholder='Type message here'
                />
                {message.received && <MessageShow message={message.content} />}
            </div>

        </>
    );
};

export default Messenger;