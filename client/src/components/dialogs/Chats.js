import React from 'react';
import Quests from "./quests/Quests";
import Chat from "./chat/Chat";
import {useEffect, useRef, useState} from "react";
import io from "socket.io-client";
import {SERVER_URL} from "../../utils/consts";
import {getIncomingMessages} from "../../utils/requests";
import Quest from "./quests/Quest";

const Chats = ({dialogMode, curEmployee}) => {
    const employeeId = curEmployee.id;
    const [chosenQuest, setChosenQuest] = useState({});
    const [incomingQuests, setIncomingQuests] = useState([]);
    const socket = useRef(null);

    useEffect(() => {
        socket.current = io(SERVER_URL);
        socket.current.on('greetUser', (incomingQuestsSocket) => {
            socket.current.emit("getIncomingQuests", {employeeId});
        })
        socket.current.on('incoming', (incomingQuestsSocket) => {
            console.log(incomingQuestsSocket);
            setIncomingQuests(incomingQuestsSocket);
        })
        getIncomingMessages(employeeId)
            .then((res) => {
                console.log(res)
                setIncomingQuests(res);
                setChosenQuest(res[0]);
            });
    }, []);
    return (
        <div className="d-flex border border-5 border-dark rounded justify-content-between"
             style={{
                 height: "76vh",
             }}>
            <div className="quests h-100 d-flex flex-column gap-2 w-25 overflow-scroll p-3"
                 style={{
                     background: "#2B2E34"
                 }}
            >
                {incomingQuests.length !== 0 &&
                    incomingQuests.map((item, index) =>
                        <Quest dialogMode={dialogMode} key={index} setChosenQuest={setChosenQuest}
                               chosenQuest={chosenQuest} idQuest={item.user_id} thisQuest={item}
                        />
                    )
                }
            </div>
            <Chat dialogMode={dialogMode} chatId={chosenQuest.chat_id} socket={socket}/>
        </div>
    );
};

export default Chats;