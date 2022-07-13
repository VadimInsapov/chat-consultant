import React from 'react';
import {Button} from "react-bootstrap";

const rowStyle = {
    height: "48px"
}
const Employees = ({employees, currentUserIsAdminInChat}) => {
    return (
        <table className="table table-hover mt-3">
            <tbody>
            {employees.map((employee, index) => {
                return (
                    <tr key={index} className="align-middle" style={rowStyle}>
                        <th scope="row">{index + 1}</th>
                        <td>{employee.last_name} {employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.role === "ADMIN" ? "администратор" : "модератор"}</td>
                        {currentUserIsAdminInChat && employee.role === "MODERATOR" &&
                        <td className="d-flex gap-2 justify-content-end">
                            <Button variant="warning"
                                    size="sm"
                            >Назначить админом</Button>
                            <Button variant="danger"
                                    size="sm">X</Button>
                        </td>
                        }
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
};

export default Employees;