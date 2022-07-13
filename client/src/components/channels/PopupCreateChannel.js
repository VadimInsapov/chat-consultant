import React from 'react';
import {Button, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";

const PopupCreateChannel = ({setPopupActive}) => {
    function buttonHandler(){
        setPopupActive(false);
    }
    return (
        <Form>
            <div className="text-center mb-2 fs-3">Создание канала</div>
            <Form.Control
                placeholder="Введите домен..."
            />
            <div className="text-center">
                <Button
                    className="mt-3 text-center w-50"
                    onClick={buttonHandler}
                >
                    создать
                </Button>
            </div>


        </Form>
    );
};

export default PopupCreateChannel;