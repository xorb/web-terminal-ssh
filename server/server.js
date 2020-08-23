const server = require("http").createServer();
const io = require("socket.io")(server);
const SSHClient = require("ssh2").Client;

io.on("connection", (socket) => {
	console.log("New connection");
	const conn = new SSHClient();
	conn
		.on("ready", function () {
			socket.emit("data", "\r\n*** SSH CONNECTION ESTABLISHED ***\r\n");
			conn.shell(function (err, stream) {
				if (err)
					return socket.emit(
						"data",
						"\r\n*** SSH SHELL ERROR: " + err.message + " ***\r\n"
					);
				socket.on("data", function (data) {
					stream.write(data);
				});
				stream
					.on("data", function (d) {
						socket.emit("data", d.toString("binary"));
					})
					.on("close", function () {
						conn.end();
					});
			});
		})
		.on("close", function () {
			socket.emit("data", "\r\n*** SSH CONNECTION CLOSED ***\r\n");
		})
		.on("error", function (err) {
			socket.emit(
				"data",
				"\r\n*** SSH CONNECTION ERROR: " + err.message + " ***\r\n"
			);
		})
		.connect({
			host: "localhost",
			port: 2222,
			username: "root",
			password: "root",
		});
});
server.listen(8080);
