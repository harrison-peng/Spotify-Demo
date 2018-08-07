import { ACCESS_TOKEN } from "../constants";

export function addAccessToken(accessToken) {
    const action = {
        type: ACCESS_TOKEN,
        accessToken
    }
    // console.log('action:', action);
    return action;
}