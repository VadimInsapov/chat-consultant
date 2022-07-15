import React from 'react';

const Message = ({isMyMessage, author, body, time}) => {
    return (
        <div className={isMyMessage ?"d-flex flex-column p-2 text-white message align-items-end": "justify-content-center d-flex flex-column p-2 text-white align-items-start align-items-start"}
             >
            <div className="mb-2">
                <div className="d-inline  rounded text-dark pt-1 pb-1 ps-2 pe-2 "
                     style={{
                         background: "#AE9ABE"
                     }}>{author}
                </div>
            </div>

            <div className="p-2 ps-4 pe-4 rounded"
                 style={{
                     background: "#2B2E34"
                 }}>{body}
            </div>
            <div className="fw-bold"
                 style={{
                     color: "#AE9ABE"
                 }}>{time}</div>

        </div>
    );
};

export default Message;