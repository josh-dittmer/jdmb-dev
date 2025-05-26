import * as net from 'node:net';

const host = 'localhost';
const port = 3000;

const client = new net.Socket();

client.connect(port, host, () => {
    console.log('Connection opened!');

    const buf = new Uint8Array(32768);
    buf.fill('B'.charCodeAt(0));

    const spam = () => {
        let canWrite = true;
        while (canWrite) {
            canWrite = client.write(buf);
        }

        if (!canWrite) {
            client.once('drain', spam);
        }
    }

    spam();
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (err) => {
    console.error('Socket error: ' + err);
});