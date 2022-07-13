import React, {useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {useLocation, NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {registerRoute} from "../utils/apiRotes";

const Registration = () => {
    let navigate = useNavigate();
    const [values, setValues] = useState({
        name : "",
        lastName : "",
        email: "",
        password: "",
    });
    async function handleSubmit(event) {
        event.preventDefault();
        await axios.post(registerRoute, values);
        navigate("/login");
    }
    const handleChange = (event) => {
        console.log(values)
        setValues({...values, [event.target.name]: event.target.value});
    }

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
                    <h3 className="m-auto">Регистрация</h3>
                    <Form className="d-flex flex-column ps-4 pe-4 pb-2">
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите email..."
                            name="email"
                            onChange={handleChange}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите пароль..."
                            name="password"
                            onChange={handleChange}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите своё имя..."
                            name="name"
                            onChange={handleChange}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите свою фамилию..."
                            name="lastName"
                            onChange={handleChange}
                        />
                        <Button
                            onClick={handleSubmit}
                            className="mt-3 align-self-center w-50"
                        >зарегистроваться
                        </Button>
                        <NavLink
                            className="mt-2 align-self-center text-success"
                            to={LOGIN_ROUTE}
                        >авторизоваться</NavLink>

                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default Registration;