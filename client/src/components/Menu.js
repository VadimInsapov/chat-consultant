import React from 'react';
import {Button} from "react-bootstrap";
import {modes} from "../utils/panelModes";

const Menu = ({mode, setMode}) => {
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
                <Button className={mode === modes.PROFILE ? "menu-button chosen p-3" : "menu-button p-3"}
                        variant="light"
                        onClick={() => setMode(modes.PROFILE)}
                >Профиль</Button>
                <Button className={mode === modes.CHANNELS ? "menu-button chosen p-3" : "menu-button p-3"}
                        variant="light"
                        onClick={() => setMode(modes.CHANNELS)}
                >Каналы</Button>
                <Button className={mode === modes.DIALOGS ? "menu-button chosen  p-3" : "menu-button p-3"}
                        variant="light"
                        onClick={() => setMode(modes.DIALOGS)}
                >Диалоги</Button>

            </div>
        </div>
    );
};

export default Menu;