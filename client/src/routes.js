import Panel from "./pages/Panel";
import Registration from "./pages/Registration";
import Welcome from "./pages/Welcome";
import {LOGIN_ROUTE, PANEL_ROUTE, REGISTRATION_ROUTE, WELCOME_ROUTE} from "./utils/consts";
import Login from "./pages/Login";

export const authRoutes = [
    {
        path: PANEL_ROUTE,
        Component: Panel
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: WELCOME_ROUTE,
        Component: Welcome
    }
]