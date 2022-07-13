import React, {useState} from 'react';
import Menu from "../components/Menu";
import {Container} from "react-bootstrap";
import {modes} from "../utils/panelModes";
import Profile from "../components/Profile";
import Channels from "../components/channels/Channels";
import Dialogs from "../components/dialogs/Dialogs";

const Panel = () => {
    const [mode, setMode] = useState(modes.PROFILE);
    let component;
    if (mode)
        return (
            <div className="h-100">
                <div className="d-flex bg-light">
                    <Menu mode={mode} setMode={setMode}/>
                    {modes.PROFILE === mode && <Profile/>}
                    {modes.CHANNELS === mode && <Channels/>}
                    {modes.DIALOGS === mode && <Dialogs/>}
                </div>
            </div>
        );
};

export default Panel;