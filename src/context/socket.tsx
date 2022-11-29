import { createContext } from "react";
import { ENV } from "../environment/evnironment";
import { socket } from "../utils/socket";

export const ws = socket(ENV.socketURL);
export const SocketContext = createContext(ws);