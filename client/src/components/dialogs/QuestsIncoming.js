import React from 'react';
import Chat from "./chat/Chat";
import {useEffect, useRef, useState} from "react";
import io from "socket.io-client";
import {SERVER_URL} from "../../utils/consts";
import {getIncomingMessages} from "../../utils/requests";
import Quest from "./quests/Quest";
import {dialogModes} from "../../utils/dialogModes";

const QuestsIncoming = ({dialogMode, curEmployee, setDialogMode}) => {
    const employeeId = curEmployee.id;
    const [chosenQuest, setChosenQuest] = useState({});
    const [incomingQuests, setIncomingQuests] = useState([]);
    const socket = useRef(null);

    useEffect(() => {
        socket.current = io(SERVER_URL);
        socket.current.on('greetUser', (incomingQuestsSocket) => {
            console.log("Я тут")
            socket.current.emit("getIncomingQuests", {employeeId});
        })
        socket.current.on('incoming', (incomingQuestsSocket) => {
            setIncomingQuests(incomingQuestsSocket);
        })
        socket.current.on('incoming-accept', (incomingQuestsSocket) => {
            setIncomingQuests(incomingQuestsSocket);
            setChosenQuest(incomingQuestsSocket[0]);
            setDialogMode(dialogModes.MY);
        })
        getIncomingMessages(employeeId)
            .then((res) => {
                setIncomingQuests(res);
                setChosenQuest(res[0]);
            });
        return () => {
            socket.current.disconnect();
        }
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
            {
                chosenQuest &&
                <Chat dialogMode={dialogMode} chosenQuest={chosenQuest} chatId={chosenQuest.chat_id} socket={socket}
                      curEmployee={curEmployee}/>
            }
        </div>
    );
};

export default QuestsIncoming;