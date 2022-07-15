import React from 'react';
import Chat from "./chat/Chat";
import {useEffect, useRef, useState} from "react";
import io from "socket.io-client";
import {SERVER_URL} from "../../utils/consts";
import {getIncomingMessages} from "../../utils/requests";
import Quest from "./quests/Quest";
import {dialogModes} from "../../utils/dialogModes";

const QuestsMy = ({dialogMode, curEmployee}) => {
    const employeeId = curEmployee.id;
    const [chosenQuest, setChosenQuest] = useState({});
    const [myQuests, setMyQuests] = useState([]);
    const socket = useRef(null);

    useEffect(() => {
        socket.current = io(SERVER_URL);
        socket.current.on('incomingMyQuests', (myQuestsSocket) => {
            setMyQuests(myQuestsSocket);
        })
        socket.current.emit("getMyQuests", {employeeId});
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
                {myQuests.length !== 0 &&
                    myQuests.map((item, index) =>
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

export default QuestsMy;