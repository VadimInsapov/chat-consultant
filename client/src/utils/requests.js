import axios from "axios";
import {
    addEmployeeToChannelRoute,
    channelsByEmployeeRoute,
    createChannelRoute,
    employeeRoute,
    incomingQuestsRoute
} from "./apiRotes";
import {getToken} from "../components/AppRouter";

export async function createChannel(body) {
    const res =
        await axios.post(createChannelRoute, body,
            {headers: {"Authorization": `Bearer ${getToken()}`}})
    return res.data;
}

export async function getChannelsByEmployee(employeeId) {
    const fullRoute = channelsByEmployeeRoute + employeeId;
    const res =
        await axios.get(fullRoute,
            {headers: {"Authorization": `Bearer ${getToken()}`}})
    return res.data;
}

export async function getAllEmployees() {
    const fullRoute = employeeRoute;
    const res =
        await axios.get(fullRoute,
            {headers: {"Authorization": `Bearer ${getToken()}`}})
    return res.data;
}

export async function addEmployeeToChannel(employeeId, channelId, role) {
    const body = {
        employeeId, channelId, role
    }
    const res =
        await axios.put(addEmployeeToChannelRoute, body,
            {headers: {"Authorization": `Bearer ${getToken()}`}})
    return res.data;
}

export async function getIncomingMessages(employeeId) {
    const res =
        await axios.get(incomingQuestsRoute(employeeId),
            {headers: {"Authorization": `Bearer ${getToken()}`}})
    return res.data;
}