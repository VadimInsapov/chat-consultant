import React from 'react';
import Quests from "./quests/Quests";
import Chat from "./chat/Chat";
import {useEffect, useRef, useState} from "react";
import io from "socket.io-client";
import {SERVER_URL} from "../../utils/consts";

const Chats = ({dialogMode, curEmployee}) => {
    const employeeId = curEmployee.id;
    const [chosenQuest, setChosenQuest] = useState({});
    const [incomingMessages, setIncomingMessages] = useState([]);
    const socketRef = useRef(null)
    useEffect(() => {
        socketRef.current = io(SERVER_URL);
        socketRef.current.emit('getIncomingMessages', {employeeId})
        socketRef.current.on('incoming', (incomingMessages) => {
            setIncomingMessages(incomingMessages);
            setChosenQuest(incomingMessages[0].quest);
        })
    }, []);

    return (
        <div className="d-flex border border-5 border-dark rounded justify-content-between"
             style={{
                 height: "76vh",
             }}>
            {incomingMessages &&
                <>
                    <Quests chosenQuest={chosenQuest} dialogMode={dialogMode} curEmployee={curEmployee} incomingMessages={incomingMessages}/>
                    <Chat dialogMode={dialogMode} incomingMessages={incomingMessages}/>
                </>
            }

        </div>
    );
};

export default Chats;