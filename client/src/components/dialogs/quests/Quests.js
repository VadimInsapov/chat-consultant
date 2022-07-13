import React from 'react';
import Chat from "../chat/Chat";
import Quest from "./Quest";

const Quests = () => {
    return (
        <>
            <div className="quests h-100 d-flex flex-column gap-2 w-25 overflow-scroll p-3"
                 style={{
                     background:"#2B2E34"
                 }}
            >
                <Quest/>
                <Quest/>
                <Quest/>
                <Quest/>
                <Quest/>
                <Quest/>
                <Quest/>
                <Quest/>
                <Quest/>
                <Quest/>
                <Quest/>
            </div>
        </>

    );
};

export default Quests;