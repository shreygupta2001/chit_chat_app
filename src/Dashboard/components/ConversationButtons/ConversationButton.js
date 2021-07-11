//file to handle functions of each comversation button
import React from 'react';

//styling of conversation buttons
const styles = {
    button: {
        width: '50px',
        height: '50px',
        borderRadius: '25px',
        textDecoration: 'none',
        backgroundColor: '#0e2b47',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '11px'
    }
};

//function to handle operation when Conversation button is clicked
const ConversationButton = (props) => {

    const { onClickHandler } = props;

    return (
        <button style={styles.button} onClick={onClickHandler}>
            {props.children}
        </button>
    );
};

export default ConversationButton;