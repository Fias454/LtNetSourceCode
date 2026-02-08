import {io} from "socket.io-client";
import url from "./serverUrl";
const socket = io(`${url}`, {
    withCredentials:true
})
export default socket;