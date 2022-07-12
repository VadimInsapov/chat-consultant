import React from 'react';
import {Button} from "react-bootstrap";

const Menu = () => {
    return (
        <div
            className="p-4 d-flex flex-column justify-content-center"
            style={{
                background: "#2B2E34",
                height: window.innerHeight,
                width: "15%"
            }}
        >
            <div
                className="d-flex flex-column justify-content-between"
                style={{
                    height: "35%"
                }}
            >
                <Button className="p-3" variant="light"
                        style={{
                            background: "#F2ECEC",
                        }}
                >Профиль</Button>
                <Button className="p-3" variant="light">Каналы</Button>
                <Button className="p-3" variant="light">Диалоги</Button>

            </div>
        </div>
    );
};

export default Menu;