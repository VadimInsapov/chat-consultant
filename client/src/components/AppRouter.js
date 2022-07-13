import React, {useEffect, useState} from 'react';
import {Routes, Route, Redirect, Navigate} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import {PANEL_ROUTE, WELCOME_ROUTE} from "../utils/consts";

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

export function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

export const SetTokenContext = React.createContext();
const AppRouter = () => {
    const token = getToken();
    return (
        <SetTokenContext.Provider value={setToken}>
            {token ?
                <Routes>
                    {authRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={<Component token={token}/>}></Route>
                    )}
                    <Route
                        path="*"
                        element={<Navigate to={PANEL_ROUTE} replace/>}
                    />
                </Routes>
                :
                <Routes>
                    {publicRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={<Component/>}></Route>
                    )}
                    <Route
                        path="*"
                        element={<Navigate to={WELCOME_ROUTE} replace/>}
                    />
                </Routes>
            }
        </SetTokenContext.Provider>
    );
};

export default AppRouter;