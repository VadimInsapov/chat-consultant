import React from 'react';
import {Button} from "react-bootstrap";

const Employees = () => {
    return (

        <table className="table table-striped table-hover">
            <tbody>
            <tr className="align-middle">
                <th scope="row">1</th>
                <td>Инсапов Вадим</td>
                <td>insapovvadik@mail.ru</td>
                <td>Модератор</td>
                <td className="d-flex gap-2 justify-content-end">
                    <Button variant="warning">Назначить админом</Button>
                    <Button variant="danger">X</Button>
                </td>
            </tr>
            <tr className="align-middle">
                <th scope="row">3</th>
                <td>Инсапов Вадим</td>
                <td>insapovvadik@mail.ru</td>
                <td>Модератор</td>
            </tr>
            </tbody>
        </table>
    );
};

export default Employees;