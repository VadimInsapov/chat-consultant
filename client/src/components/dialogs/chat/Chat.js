import React from 'react';
import Quest from "../quests/Quest";
import Messages from "./Messages";
import NewMessage from "./NewMessage";
import {dialogModes} from "../../../utils/dialogModes";

const Chat = ({dialogMode}) => {
    return (
        <>
            <div className="d-flex flex-column justify-content-between w-75"
            >
                <Messages dialogMode={dialogMode}/>
                {dialogMode !== dialogModes.INCOMING && <NewMessage/>}
            </div>
        </>
    );
};

export default Chat;