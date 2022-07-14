import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import {addEmployeeToChannel, getAllEmployees} from "../../utils/requests";
import {forEach} from "react-bootstrap/ElementChildren";

const PopupAddEmployeeToChannel = ({reload, setReload, setPopupActive, channelId, allEmployees, employeesInChannel: channelEmployees}) => {
    const [accessibleEmployees, setAccessibleEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState("");
    const [role, setRole] = useState("");

    // const indexesAllEmployees = allEmployees.map((employee) => employee.id)
    const indexesChannelEmployees = channelEmployees.map((employee) => employee.employee_id)
    const filteredArray = allEmployees.filter((employee) => !indexesChannelEmployees.includes(employee.id))
    if (JSON.stringify(accessibleEmployees) !== JSON.stringify(filteredArray)) {
        setAccessibleEmployees(filteredArray);
    }

    function selectUser(e) {
        setEmployeeId(e.target.value);
    }

    function selectRole(e) {
        setRole(e.target.value);
    }

    async function buttonHandler() {
        if (!employeeId || !role) {
            //ошибка не введён пользователь
            return;
        }
        await addEmployeeToChannel(employeeId, channelId, role);
        setEmployeeId("");
        setRole("");
        setPopupActive(false);
        setReload(!reload);
    }

    return (
        <Form>
            <div className="text-center mb-2 fs-3">Добавить сотрудника</div>
            <Form.Select
                value={employeeId}
                onChange={selectUser}
            >
                <option value="">Выбрать сотрудника</option>
                {accessibleEmployees.map((employee) =>
                    <option key={employee.id} value={employee.id}>
                        {employee.name} {employee.last_name}
                    </option>

                )}
            </Form.Select>
            <Form.Select
                value={role}
                onChange={selectRole}
                className="mt-2"
            >
                <option value="">Выбрать роль в канале</option>
                <option value="ADMIN">Администратор</option>
                <option value="MODERATOR">Модератор</option>
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