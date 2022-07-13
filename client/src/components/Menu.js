import React from 'react';
import {Button} from "react-bootstrap";
import {modes} from "../utils/panelModes";

const Menu = ({mode, setMode}) => {
    return (
        <div
            className="p-4 d-flex flex-column justify-content-start"
            style={{
                background: "#2B2E34",
                minHeight: "100vh",
                width: "15%"
            }}
        >
            <div
                className="d-flex flex-column justify-content-center"
                style={{
                    height: "100vh"
                }}
            >
                <div
                    className="d-flex flex-column justify-content-between"
                    style={{
                        height: "300px"
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
        </div>
    );
};

export default Menu;