import React from 'react';

const Quest = ({userId, name, lastName, chosenQuest}) => {
    console.log(chosenQuest.user_id)
    console.log(userId)
    const aa = chosenQuest.user_id !== userId;
    let myStyle = {};
    if (aa) {
        myStyle = {
            background: "#F2F2EF"
        }
    } else {
        myStyle = {
            background: "#ccc",
        }
    }
    return (
        <div className={"quest d-flex align-items-center border border-3 border-dark p-3 rounded text-dark"}
             style={myStyle}
        >
            <div className="fs-6">{lastName} {name}</div>
        </div>
    );
};

export default Quest;