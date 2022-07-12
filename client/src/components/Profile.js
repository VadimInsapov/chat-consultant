import React from 'react';
import {Button, Card} from "react-bootstrap";
import {SetTokenContext} from "./AppRouter";
import {useNavigate } from "react-router-dom";

const Profile = () => {
    let navigate = useNavigate();
    const setToken = React.useContext(SetTokenContext);
    function buttonHandler() {
        setToken("");
        window.location.reload(false);
    }
    return (
        <div className="d-flex justify-content-center align-items-center w-75 fs-4">
            <Card style={{
                width: '450px',
            }}>
                <Card.Body>
                    <Card.Title className="fs-3">Инсапов Вадим</Card.Title>
                    <Card.Text>
                        insapovvadik@gmail.com
                    </Card.Text>
                    <Button variant="danger"
                    onClick={buttonHandler}
                    >Выйти</Button>
                </Card.Body>
            </Card>
        </div>

    );
};

export default Profile;