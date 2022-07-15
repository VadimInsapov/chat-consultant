import React, {useState} from 'react';
import Quest from "../quests/Quest";
import Messages from "./Messages";
import NewMessage from "./NewMessage";
import {dialogModes} from "../../../utils/dialogModes";
import {useEffect} from "react";
import io from "socket.io-client";
import {SERVER_URL} from "../../../utils/consts";
import {getIncomingMessages} from "../../../utils/requests";

const Chat = ({dialogMode, chatId, socket}) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        socket.current = io(SERVER_URL);
        console.log({chatId})
        socket.current.emit("getMessages", {chatId});
        socket.current.on(chatId, (messagesSocket) => {
            setMessages(messagesSocket);
            console.log(messages);
        })
    }, [chatId]);
    return (
        <>
            <div className="d-flex flex-column justify-content-between w-75"
            >
                <Messages dialogMode={dialogMode} messages={messages}/>
                {dialogMode !== dialogModes.INCOMING && <NewMessage/>}
            </div>
        </>
    );
};

export default Chat;