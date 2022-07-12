import React, {useState} from 'react';
import App from "../App";
import Menu from "../components/Menu";
import {Container} from "react-bootstrap";
const modes = {
    PROFILE: "profile",
    CHANNELS: "channels",
    DIALOGS: "dialogs"
}
const Panel = () => {
    const [mode, setMode] = useState(modes.PROFILE);
    return (
        <div className="h-100">
            <div className="d-flex bg-light">
                <Menu/>
                dd
            </div>
        </div>
    );
};

export default Panel;