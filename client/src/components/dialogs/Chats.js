import React from 'react';
import Quests from "./quests/Quests";
import Chat from "./chat/Chat";

const Chats = ({dialogMode}) => {
    return (
        <div className="d-flex border border-5 border-dark rounded justify-content-between"
        style={{height:"76vh",
            }}>
            <Quests dialogMode={dialogMode}/>
            <Chat dialogMode={dialogMode}/>
        </div>
    );
};

export default Chats;