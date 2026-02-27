const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('listening', () => {
    const address = server.address();
    console.log(`🎮 UDP Lobby Server running on ${address.address}:${address.port}`);
});

server.on('message', (msg, rinfo) => {
    console.log(`📩 Packet from ${rinfo.address}:${rinfo.port}`);

    // Fake room response
    const response = Buffer.from("ROOM_CREATED");

    server.send(response, rinfo.port, rinfo.address, (err) => {
        if (err) console.log("Send error:", err);
        else console.log("✅ Room response sent");
    });
});

server.bind(41234);