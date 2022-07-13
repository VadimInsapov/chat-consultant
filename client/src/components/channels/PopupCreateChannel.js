import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import axios from "axios";
import {channelsByEmployeeRoute, createChannelRoute} from "../../utils/apiRotes";
import {createChannel} from "../../utils/requests";

const PopupCreateChannel = ({setPopupActive, employeeId}) => {
    const [domain, setDomain] = useState("");
    const [channelScript, setChannelScript] = useState(false);

    async function buttonCreateChannelHandler() {
        const body = {
            employeeId: employeeId,
            domain: domain
        }
        const res = await createChannel(body);
        console.log(res);
        setChannelScript(res.channelScript);
        setDomain("");
    }

    async function buttonOkHandler() {
        setPopupActive(false);
        setChannelScript(false);
    }

    const handleChange = (event) => {
        setDomain(event.target.value)
    }

    return (
        <Form>
            {channelScript ?
                <>
                    <div className="text-center mb-2 fs-3">Вставьте скрипт на сайт</div>
                    <div>{channelScript}</div>
                    <div className="text-center">
                        <Button
                            className="mt-3 text-center w-50"
                            onClick={buttonOkHandler}
                        >
                            Ок
                        </Button>
                    </div>
                </>
                :
                <>
                    <div className="text-center mb-2 fs-3">Создание канала</div>
                    <Form.Control
                        placeholder="Введите домен..."
                        onChange={handleChange}
                        value={domain}
                    />
                    <div className="text-center">
                        <Button
                            className="mt-3 text-center w-50"
                            onClick={buttonCreateChannelHandler}
                        >
                            создать
                        </Button>
                    </div>
                </>
            }


        </Form>
    );
};

export default PopupCreateChannel;