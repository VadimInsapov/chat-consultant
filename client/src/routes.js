import Panel from "./pages/Panel";
import Auth from "./pages/Auth";
import Welcome from "./pages/Welcome";
import {LOGIN_ROUTE, PANEL_ROUTE, REGISTRATION_ROUTE, WELCOME_ROUTE} from "./utils/consts";

export const authRoutes = [
    {
        path: PANEL_ROUTE,
        Component: Panel
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: WELCOME_ROUTE,
        Component: Welcome
    }
]