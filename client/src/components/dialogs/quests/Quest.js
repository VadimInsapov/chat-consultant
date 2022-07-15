import React from 'react';
import Chat from "../chat/Chat";

const Quest = ({thisQuest, chosenQuest, idQuest, setChosenQuest, dialogMode}) => {
    const isDarkMode = idQuest === chosenQuest.user_id;
    return (
        <>
            <div className={"quest d-flex align-items-center border border-3 border-dark p-3 rounded text-dark"}
                 style={
                     isDarkMode ? {
                         background: "#ccc"
                     } : {
                         background: "#F2F2EF"
                     }}
                 onClick={()=> setChosenQuest(thisQuest)}
            >
                <div className="fs-6">{thisQuest.lastName} {thisQuest.name}</div>
            </div>

        </>

    );
};

export default Quest;