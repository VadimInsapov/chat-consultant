import React, {useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {useLocation, NavLink, useNavigate} from "react-router-dom";
import {SetTokenContext} from "../components/AppRouter";
import axios from "axios";
import {loginRoute, registerRoute} from "../utils/apiRotes";

const Login = () => {
    const setToken = React.useContext(SetTokenContext);
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    async function handleSubmit(event) {
        event.preventDefault();
        const token = await axios.post(loginRoute, values);
        console.log(token.data)
        setToken(token.data);
        window.location.reload(false);
    }
    const handleChange = (event) => {
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
                    <h3 className="m-auto">Авторизация</h3>
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
                        <Button
                            onClick={handleSubmit}
                            className="mt-3 align-self-center w-50"
                        >
                            войти
                        </Button>
                        <NavLink
                            className="mt-2 align-self-center text-success"
                            to={REGISTRATION_ROUTE}
                        >зарегистрироваться</NavLink>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default Login;