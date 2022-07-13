import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";

const PopupAddEmployeeToChannel = ({setPopupActive}) => {
    const [userId, setUserId] = useState("");

    function selectHandler(e) {
        setUserId(e.target.value);
    }

    function buttonHandler() {
        if (!userId) {
            //ошибка не введён пользователь
            return;
        }
        setUserId("");
        setPopupActive(false);
    }

    return (
        <Form>
            <div className="text-center mb-2 fs-3">Добавить сотрудника</div>
            <Form.Select
                value={userId}
                onChange={selectHandler}
            >
                <option value="">Выбрать сотрудника</option>
                <option value="1">Инсапов</option>
                <option value="2">Иванов</option>
                <option value="3">Дмитриев</option>
            </Form.Select>
            <div className="text-center">
                <Button
                    className="mt-3 text-center w-50"
                    onClick={buttonHandler}
                >
                    Добавить
                </Button>
            </div>


        </Form>
    );
};

export default PopupAddEmployeeToChannel;