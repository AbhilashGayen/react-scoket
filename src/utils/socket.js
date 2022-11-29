import { runner } from './blackBox'
let subscribed = {};

const loop = (event, cb, delay) => {
    if (!subscribed[event]) {
        return;
    }
    runner(cb).catch();
    setTimeout(() => loop(event, cb), delay);
};

const subscribe = (channel, cb, delay = 1000) => {
    subscribed[channel] = true;
    loop(channel, cb, delay);
}

const unsubscribe = (channel) => {
    subscribed[channel] = false;
}

let connectionCount = 0

const close = () => {
    --connectionCount
    subscribed = {}
}

export const socket = (baseURL) => {
    ++connectionCount
    console.log(`connecting to ${baseURL}`)
    if (connectionCount > 1) {
        console.log(`multiple socket connection is slow down the service`)
    }
    return {
        subscribe,
        unsubscribe,
        close
    }
}

