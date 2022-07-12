import React from 'react';
import {Routes, Route, Redirect, Navigate} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import {WELCOME_ROUTE} from "../utils/consts";

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

const AppRouter = () => {
    // const token = getToken();
    const token = true;
    return (
        <Routes>
            {token && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}></Route>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}></Route>
            )}
            <Route
                path="*"
                element={<Navigate to={WELCOME_ROUTE} replace />}
            />
        </Routes>
    );
};

export default AppRouter;