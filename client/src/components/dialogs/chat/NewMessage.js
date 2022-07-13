import React from 'react';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";

const NewMessage = () => {
    return (
        <div className="quests pe-3  overflow-scroll d-flex justify-content-between align-items-center"
             style={{
                 height: "18%",
                 background: "#2B2E34"
             }}
        >
            <Form.Control as="textarea"
                          style={{
                              width: "80%",
                              height: "70%",
                          }}
            />
            <Button variant="success"
                    style={{
                        width: "18%",
                        height: "40%",
                    }}>Отправить</Button>{' '}
        </div>
    );
};

export default NewMessage;