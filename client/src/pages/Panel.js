import React, {useState} from 'react';
import Menu from "../components/Menu";
import {Container} from "react-bootstrap";
import {modes} from "../utils/panelModes";
import Profile from "../components/Profile";
import Channels from "../components/channels/Channels";
import Dialogs from "../components/dialogs/Dialogs";
import jwtDecode from "jwt-decode";

const Panel = ({token}) => {
    const curEmployee = jwtDecode(token);
    const [mode, setMode] = useState(modes.PROFILE);
    if (mode)
        return (
            <div className="h-100">
                <div className="d-flex bg-light">
                    <Menu mode={mode} setMode={setMode}/>
                    {modes.PROFILE === mode && <Profile curEmployee={curEmployee}/>}

                    {modes.CHANNELS === mode &&
                        <div className="p-5"
                             style={{
                                 width: "85%",
                                 background: "#F2F2EF"
                             }}>
                            <Channels curEmployee={curEmployee}/>
                        </div>}
                    {modes.DIALOGS === mode &&
                        <div className="p-5"
                             style={{
                                 width: "85%",
                                 background: "#F2F2EF"
                             }}>
                            <Dialogs/>
                        </div>}

                </div>
            </div>
        );
};

export default Panel;