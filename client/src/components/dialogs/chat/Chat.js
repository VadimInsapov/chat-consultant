import React, {useState} from 'react';
import Quest from "../quests/Quest";
import Messages from "./Messages";
import NewMessage from "./NewMessage";
import {dialogModes} from "../../../utils/dialogModes";
import {useEffect} from "react";
import io from "socket.io-client";
import {SERVER_URL} from "../../../utils/consts";
import {getIncomingMessages} from "../../../utils/requests";

const Chat = ({dialogMode, chatId, socket, curEmployee, chosenQuest}) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        socket.current = io(SERVER_URL);
        socket.current.on(chatId, (messagesSocket) => {
            console.log("Я тут");
            setMessages(messagesSocket);
        })
        socket.current.emit("getMessages", {chatId});
        if(dialogMode === dialogModes.MY){
            return () => {
                socket.current.disconnect();
            }
        }
    }, [chosenQuest]);
    return (
        <>
            <div className="d-flex flex-column justify-content-between w-75"
            >
                <Messages socket={socket} dialogMode={dialogMode} messages={messages} chatId={chatId}
                          curEmployee={curEmployee}/>
                {dialogMode === dialogModes.MY && <NewMessage chatId={chatId} userId={curEmployee.user_id} socket={socket}/>}
            </div>
        </>
    );
};

export default Chat;