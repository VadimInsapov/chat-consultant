import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";

const NewMessage = ({socket, userId, chatId}) => {
    const [body, setBody] = useState("")

    function sendNewMessageHandler() {
        if (!body) return;
        console.log({userId, chatId, body})
        setBody("");
        socket.current.emit("message", {userId, chatId, body});
    }

    function handleChange(e) {
        setBody(e.target.value)
    }

    return (
        <div className="quests pe-3  overflow-scroll d-flex justify-content-between align-items-center"
             style={{
                 height: "18%",
                 background: "#2B2E34"
             }}
        >
            <Form.Control as="textarea"
                          value={body}
                          style={{
                              width: "80%",
                              height: "70%",
                          }}
                          onChange={handleChange}
            />
            <Button variant="success"
                    style={{
                        width: "18%",
                        height: "40%",
                    }}
                    onClick={sendNewMessageHandler}
            >Отправить</Button>{' '}
        </div>
    );
};

export default NewMessage;