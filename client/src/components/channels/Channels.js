import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import Channel from "./Channel";
import Popup from "../../Popup/Popup";
import PopupCreateChannel from "./PopupCreateChannel";
import PopupAddEmployeeToChannel from "./PopupAddEmployeeToChannel";
import axios from "axios";
import {channelsByEmployeeRoute, loginRoute} from "../../utils/apiRotes";
import {getChannelsByEmployee} from "../../utils/requests";


const Channels = ({employee}) => {
    const [channels, setChannels] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    useEffect(() => {
        getChannelsByEmployee(employee.id)
            .then((res) => {
                    const channelsArray = Object.entries(res);
                    if (JSON.stringify(channels) !== JSON.stringify(channelsArray)) {
                        setChannels(channelsArray);
                    }
                }
            );
    }, [channels]);
console.log(employee)
    return (
        <>
            <Popup active={popupActive} setActive={setPopupActive}>
                <PopupCreateChannel setPopupActive={setPopupActive} employeeId={employee.id}/>
            </Popup>
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
            {
                channels.map((channel, index) => <Channel key={index} employee={employee} channel={channel}/>)
            }
        </>
    );
};

export default Channels;