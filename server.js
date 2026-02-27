const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('listening', () => {
    const address = server.address();
    console.log(`UDP Server listening on ${address.address}:${address.port}`);
});

server.on('message', (msg, rinfo) => {
    console.log(`Packet from ${rinfo.address}:${rinfo.port}`);

    const response = Buffer.from([0x52,0x4f,0x4f,0x4d,0x5f,0x4f,0x4b]);

    server.send(response, rinfo.port, rinfo.address);
});

server.bind(41234, "0.0.0.0");