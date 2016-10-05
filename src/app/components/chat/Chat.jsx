import React from 'react';

export default class Chat extends React.Component {
    render() {
        return (
            <div className="chat-main-container">
                <div className="chat-messages-container">
                    CHAT
                </div>
                <div className="chat-input-container">
                    <span >
                        <input type="text" />
                    </span>
                    <span >
                        <button >SEND</button>
                    </span>
                </div>
            </div>
        )
    }
}
