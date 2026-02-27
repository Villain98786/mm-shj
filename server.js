const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('listening', () => {
    const address = server.address();
    console.log(`🎮 UDP Server listening on ${address.address}:${address.port}`);
});

server.on('message', (msg, rinfo) => {
    console.log(`📩 Packet from ${rinfo.address}:${rinfo.port}`);
    console.log("Data:", msg);

    // Fake matchmaking response
    const response = Buffer.from("ROOM_OK");

    server.send(response, rinfo.port, rinfo.address, (err) => {
        if (err) console.log("Send error:", err);
        else console.log("✅ Response sent");
    });
});

server.bind(process.env.PORT || 41234);