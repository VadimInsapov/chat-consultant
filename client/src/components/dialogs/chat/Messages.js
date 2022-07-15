import React, {useEffect, useRef} from 'react';
import Message from "./Message";
import {Button} from "react-bootstrap";
import {dialogModes} from "../../../utils/dialogModes";

const Messages = ({dialogMode, messages}) => {
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.scrollTop = messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    }, [messages]);
    return (
        <div
            className="h-100 ps-4 pe-4 pt-4"
        >
            {dialogMode === dialogModes.INCOMING &&
                <Button variant="success"
                        className="w-100 mb-1"
                >Принять заявку</Button>}
            <div
                className="quests d-flex flex-column gap-2 overflow-scroll rounded "
                style={{
                    height: "79%",
                    background: "#F2F2EF"
                }}>
                {messages &&
                    messages.map((item, index) =>
                        <Message key={index} isMyMessage={false} author={item.last_name +" "+item.name} body={item.body}
                                 time={item.time}/>
                    )
                }
                <div ref={messagesEndRef}/>
            </div>
        </div>
    );
};

export default Messages;