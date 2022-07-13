import axios from "axios";
import {channelsByEmployeeRoute, createChannelRoute} from "./apiRotes";
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