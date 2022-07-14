import React, {useEffect, useRef, useState} from 'react';
import Chat from "../chat/Chat";
import Quest from "./Quest";
import io from 'socket.io-client'
import {SERVER_URL} from "../../../utils/consts";

const Quests = ({curEmployee, incomingMessages, chosenQuest}) => {
 console.log(chosenQuest);
    return (
        <>
            <div className="quests h-100 d-flex flex-column gap-2 w-25 overflow-scroll p-3"
                 style={{
                     background: "#2B2E34"
                 }}
            >
                {incomingMessages &&
                    incomingMessages.map((item, index) =>
                        <Quest key={index} userId={item.quest.user_id} lastName={item.quest.last_name} name={item.quest.name} chosenQuest={chosenQuest}/>
                    )
                }
            </div>
        </>

    );
};

export default Quests;