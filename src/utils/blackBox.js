const getRandomNumber = (min, max) => parseFloat(Math.random() * (max - min) + min).toFixed(2);
const delay = (ms) => new Promise(res => setTimeout(res, ms));

const task = async (ms, min, max) => {
    await delay(ms);
    return getRandomNumber(min, max);
};

export const runner = async (cb) => {
    const numbersOfTask = [0, 100, 200, 0, 400, 500, 0, 1000, 5, 7000];
    const max = numbersOfTask.length;
    const selectedNumberOfTask = numbersOfTask[Math.round(Math.random() * max)];
    const delay = 1000 / selectedNumberOfTask;
    let lastClose = await task(delay, 10, 100)
    for (let i = 0; i < selectedNumberOfTask; i++) {
        lastClose = await task(delay, lastClose * 0.95, lastClose * 1.05);
        cb(lastClose);
    }
};
