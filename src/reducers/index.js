import { ACCESS_TOKEN } from "../constants";

export default (state = [], action) => {
    // console.log('reducers:', action);
    switch(action.type) {
        case ACCESS_TOKEN:
            const {accessToken} = action;
            return {accessToken};
        default:
            return state;
    }
}