import React from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {useLocation, NavLink} from "react-router-dom";

const Auth = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    console.log(location);
    return (
        <div>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight - 50}}
            >
                <Card
                    style={{width: 450}}
                    className="p-3"
                    bg={"light"}
                >
                    <h3 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h3>
                    <Form className="d-flex flex-column ps-4 pe-4 pb-2">
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите email..."
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите пароль..."
                        />
                        {!isLogin &&
                            <>
                                <Form.Control
                                    className="mt-3"
                                    placeholder="Введите своё имя..."
                                />
                                <Form.Control
                                    className="mt-3"
                                    placeholder="Введите свою фамилию..."
                                />
                            </>
                        }
                        <Button
                            className="mt-3 align-self-center w-50"
                        >
                            {isLogin ? "войти" : "зарегистроваться"}
                        </Button>
                        {isLogin ?
                            <NavLink
                                className="mt-2 align-self-center text-success"
                                to="/registration"
                            >зарегистрироваться</NavLink>
                            :
                            <NavLink
                                className="mt-2 align-self-center text-success"
                                to="/login"
                            >авторизоваться</NavLink>
                        }

                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default Auth;