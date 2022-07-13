import React, {useState} from 'react';
import Popup from "../../Popup/Popup";
import PopupCreateChannel from "../channels/PopupCreateChannel";
import {Button} from "react-bootstrap";
import Channel from "../channels/Channel";
import Chats from "./Chats";
import {dialogModes} from "../../utils/dialogModes";


const Dialogs = () => {
    const [dialogMode, setDialogMode] = useState(dialogModes.INCOMING)
    return (
        <>
            <div className="mb-2">
                <div className="fs-1 mb-2">Диалоги</div>
                <div className="d-flex gap-3">
                    <Button className={dialogMode === dialogModes.INCOMING ? "bg-warning text-black" : ""}
                            variant="outline-warning"
                            size="lg"
                            onClick={() => setDialogMode(dialogModes.INCOMING)}
                    >Входящие</Button>
                    <Button className={dialogMode === dialogModes.MY ? "bg-warning text-black" : ""}
                            variant="outline-warning"
                            size="lg"
                            onClick={() => setDialogMode(dialogModes.MY)}
                    >Мои</Button>
                    <Button className={dialogMode === dialogModes.ALL ? "bg-warning text-black" : ""}
                            variant="outline-warning"
                            size="lg"
                            onClick={() => setDialogMode(dialogModes.ALL)}
                    >Все</Button>
                </div>
            </div>
            <Chats dialogMode={dialogMode}/>
        </>
    );
};

export default Dialogs;