import React from 'react';
import './popup.css';

const Popup = ({active, setActive, children}) => {
    return (
        <div className={active ? "popup open" : "popup"} onClick={() => setActive(false)}>
            <div className="popup__body">
                <div className="popup__content"  onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Popup;