import React from 'react';
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";

const Welcome = () => {
    return (
        <div>
            <Container
                className="d-flex flex-column justify-content-center align-items-center"
                style={{height: window.innerHeight - 50}}
            >
                <h1>Добро пожаловать в онлайн консультант!</h1>
                <div>
                    <Link
                        className="fs-2 me-5"
                        to={LOGIN_ROUTE}
                    >
                        <button>Авторизоваться</button>
                    </Link>
                    <Link
                        to={REGISTRATION_ROUTE}
                        className="fs-2">
                        <button>Зарегистрироваться</button>
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default Welcome;