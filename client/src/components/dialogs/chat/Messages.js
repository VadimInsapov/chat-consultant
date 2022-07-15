import React, {useEffect, useRef} from 'react';
import Message from "./Message";
import {Button} from "react-bootstrap";
import {dialogModes} from "../../../utils/dialogModes";

const Messages = ({dialogMode, messages, chatId, curEmployee, socket}) => {
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.scrollTop = messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    function acceptQuest() {
        const employeeId = curEmployee.id;
        socket.current.emit("acceptEmployee", {chatId, employeeId});
    }

    return (
        <div
            className="ps-4 pe-4 pt-4"
            style={{
                height: "82%"
            }}
        >
            {dialogMode === dialogModes.INCOMING &&
                <Button variant="success"
                        className="w-100 mb-1"
                        onClick={acceptQuest}
                >Принять заявку</Button>}
            <div
                className="quests d-flex flex-column gap-2 overflow-scroll rounded"
                style={{
                    background: "#F2F2EF",
                    height: "95%"
                }}>
                {messages &&
                    messages.map((item, index) =>
                        <Message key={index} isMyMessage={curEmployee.user_id===item.user_id} author={item.last_name + " " + item.name}
                                 body={item.body}
                                 time={(new Date(item.created_at)).toLocaleString().split(" ")[1]}/>
                    )
                }
                <div ref={messagesEndRef}/>
            </div>
        </div>
    );
};

export default Messages;