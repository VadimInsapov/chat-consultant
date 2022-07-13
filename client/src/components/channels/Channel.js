import React, {useState} from 'react';
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
const Channel = () => {
    const [popupActive, setPopupActive] = useState(false);
    return (
        <>
            <Popup active={popupActive} setActive={setPopupActive}>
                <PopupAddEmployeeToChannel setPopupActive={setPopupActive}/>
            </Popup>
            <div className="p-4 w-100 border border-3 border-dark rounded mb-4">
                <div
                    className="d-flex mb-3 p-2 align-items-center justify-content-between">
                    <div>
                        <h4 className="d-inline text-white p-2 rounded"
                            style={channelHeader}
                        >hh.ru
                        </h4>
                        <h4 className="d-inline p-1 border border-dark rounded ms-3"
                        >Администратор
                        </h4>
                    </div>
                    <Button className="" variant="success">
                        <div className="fs-5"
                             onClick={() => setPopupActive(true)}
                        >Добавить сотрудника
                        </div>

                    </Button>
                </div>
                <Employees/>
            </div>
        </>
    );
};

export default Channel;