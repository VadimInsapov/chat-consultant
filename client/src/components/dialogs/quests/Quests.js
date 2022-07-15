import React, {useEffect, useRef, useState} from 'react';
import Chat from "../chat/Chat";
import Quest from "./Quest";
import io from 'socket.io-client'
import {SERVER_URL} from "../../../utils/consts";
import {getAllEmployees, getIncomingMessages} from "../../../utils/requests";

const Quests = ({curEmployee, dialogMode}) => {
    const employeeId = curEmployee.id;
    const [chosenQuest, setChosenQuest] = useState({});
    const [incomingQuests, setIncomingQuests] = useState([]);
    const socket = useRef(null);

    useEffect(() => {
        socket.current = io(SERVER_URL);
        socket.current.on('incoming', (incomingQuestsSocket) => {
            setIncomingQuests(incomingQuestsSocket);
            setChosenQuest(incomingQuestsSocket[0]);
        })
        getIncomingMessages(employeeId)
            .then((res) => {
                console.log(res)
                setIncomingQuests(res);
                setChosenQuest(res[0]);
            });
    }, []);

    // useEffect(() => {
    //     socket.current = io(SERVER_URL);
    //     socket.current.emit('getIncomingQuests', {employeeId})
    //     socket.current.on('incoming', (incomingQuestsSocket) => {
    //         setIncomingQuests(incomingQuestsSocket);
    //                     setChosenQuest(incomingQuestsSocket[0]);
    //
    //         // console.log(incomingQuestsSocket);
    //         console.log(incomingQuests);
    //         // console.log(incomingQuests[0]);
    //     })
    // }, []);


    // useEffect(() => {
    //     // console.log(incomingQuests)
    //     setChosenQuest(incomingQuests[0]);
    // }, [incomingQuests]);

    return (
        <>
            <div className="quests h-100 d-flex flex-column gap-2 w-25 overflow-scroll p-3"
                 style={{
                     background: "#2B2E34"
                 }}
            >
                {incomingQuests.length !== 0 &&
                    incomingQuests.map((item, index) =>
                        <Quest dialogMode={dialogMode} key={index} setChosenQuest={setChosenQuest} chosenQuest={chosenQuest} idQuest={item.user_id} thisQuest={item}
                               />
                    )
                }
            </div>
        </>

    );
};

export default Quests;