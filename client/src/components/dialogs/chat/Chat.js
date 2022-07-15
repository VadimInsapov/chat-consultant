import React, {useState} from 'react';
import Quest from "../quests/Quest";
import Messages from "./Messages";
import NewMessage from "./NewMessage";
import {dialogModes} from "../../../utils/dialogModes";
import {useEffect} from "react";
import io from "socket.io-client";
import {SERVER_URL} from "../../../utils/consts";
import {getIncomingMessages} from "../../../utils/requests";

const Chat = ({dialogMode, chatId, socket, curEmployee}) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        socket.current = io(SERVER_URL);
        socket.current.emit("getMessages", {chatId});
        socket.current.on(chatId, (messagesSocket) => {
            setMessages(messagesSocket);
        })
    }, [chatId]);
    return (
        <>
            <div className="d-flex flex-column justify-content-between w-75"
            >
                <Messages socket={socket} dialogMode={dialogMode} messages={messages} chatId={chatId} curEmployee={curEmployee}/>
                {dialogMode !== dialogModes.INCOMING && <NewMessage/>}
            </div>
        </>
    );
};

export default Chat;