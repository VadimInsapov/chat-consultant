import React, {useEffect, useRef} from 'react';
import Message from "./Message";
import {Button} from "react-bootstrap";
import {dialogModes} from "../../../utils/dialogModes";

const Messages = ({dialogMode}) => {
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.scrollTop = messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    }, []);
    return (
        <div
            className="h-100 ps-4 pe-4 pt-4"
        >
            {dialogMode ===dialogModes.INCOMING &&
                <Button variant="success"
                    className="w-100 mb-1"
            >Принять заявку</Button>}
            <div
                className="quests d-flex flex-column gap-2 overflow-scroll rounded "
                style={{
                    height: "79%",
                    background: "#F2F2EF"
                }}>
                <Message isMyMessage={true} author={"Ваня"} body={"dd"} time={"23.06.2000"}/>
                <Message isMyMessage={false} author={"Ваня"} body={"dd"} time={"23.06.2000"}/>
                <Message isMyMessage={true} author={"Ваня"} body={"dd"} time={"23.06.2000"}/>

                <div ref={messagesEndRef}/>
            </div>
        </div>
    );
};

export default Messages;