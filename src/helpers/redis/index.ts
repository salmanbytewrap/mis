import * as redis from "redis";

const client = redis.createClient({
    socket: {
        host: 'localhost',
        port: 6379
    }
});
client.on('error', err => console.log('Redis Client Error', err));

(async () => {
    await client.connect();
})()

export default client;