import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import Employees from "./Employees";
import Popup from "../../Popup/Popup";
import PopupAddEmployeeToChannel from "./PopupAddEmployeeToChannel";

const channelHeader = {
    background: "#3A3E46"
};
const channelRole = {
    background: "#A3A8A0"
};
const Channel = ({allEmployees, curEmployee, channel, reload, setReload}) => {
    const [popupActive, setPopupActive] = useState(false);
    const [reloadChannel, setReloadChannel] = useState(false);

    const channelInfo = channel[0];
    const channelId = channelInfo.split("|")[0];
    const domainName = channelInfo.split("|")[1];
    const employees = channel[1];
    const iAmInChannelM = employees.find(cur => cur.employee_id === curEmployee.id);
    const isAdmin = iAmInChannelM.role === "ADMIN"
    const otherEmployeesInChannel = employees.filter(cur => cur.employee_id !== curEmployee.id);


    return (
        <>
            <Popup active={popupActive} setActive={setPopupActive}>
                <PopupAddEmployeeToChannel reload={reload} setReload={setReload}
                                           setPopupActive={setPopupActive} channelId={channelId}
                                           allEmployees={allEmployees} employeesInChannel={employees}/>
            </Popup>
            <div className="p-4 w-100 border border-3 border-dark rounded mb-4">
                <div
                    className="d-flex p-2 align-items-center justify-content-between">
                    <div>
                        <h4 className="d-inline text-white p-2 rounded"
                            style={channelHeader}
                        >{domainName}
                        </h4>
                        <h4 className="d-inline p-1 border border-dark rounded ms-3"
                        >Я {isAdmin ? "Администратор" : "Модератор"}
                        </h4>
                    </div>
                    {isAdmin &&
                        <Button className="" variant="success">
                            <div className="fs-5"
                                 onClick={() => setPopupActive(true)}
                            >Добавить сотрудника
                            </div>
                        </Button>
                    }
                </div>
                {
                    otherEmployeesInChannel.length !== 0 &&
                    <Employees currentUserIsAdminInChat={isAdmin} employees={otherEmployeesInChannel}/>
                }
            </div>
        </>
    );
};

export default Channel;