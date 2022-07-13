import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import Channel from "./Channel";
import Popup from "../../Popup/Popup";
import PopupCreateChannel from "./PopupCreateChannel";
import PopupAddEmployeeToChannel from "./PopupAddEmployeeToChannel";


const Channels = () => {
    const [popupActive, setPopupActive] = useState(false);
    return (
        <>
            <Popup active={popupActive} setActive={setPopupActive}>
                <PopupCreateChannel setPopupActive={setPopupActive}/>
            </Popup>
            <div className="p-5"
                 style={{
                     width: "85%",
                     background: "#F2F2EF"
                 }}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="fs-1">Подключенные каналы</div>
                    <div>
                        <Button className="border border-3 border-dark"
                                variant="outline-dark"
                                onClick={() => setPopupActive(true)}
                        >
                            <div className="fs-5 fw-bold">Создать новый канал</div>
                        </Button>
                    </div>
                </div>
                <Channel/>
            </div>
        </>
    );
};

export default Channels;