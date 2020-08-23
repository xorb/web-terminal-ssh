import React, { Component } from "react";
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import io from "socket.io-client";

class App extends Component {
	componentDidMount() {
		const term = new Terminal({
			theme: { background: "#2c2c54", white: "#706fd3" },
		});
		const fitAddon = new FitAddon();
		term.loadAddon(fitAddon);
		term.open(this.termElm);
		fitAddon.fit();

		term.write("\r\n*** Connected to backend***\r\n");
		const socket = io.connect("localhost:8080");
		socket.on("connect", function () {
			term.write("\r\n*** Connected to backend***\r\n");
			term.onKey((key) => {
				socket.emit("data", key.key);
			});
			socket.on("data", function (data) {
				term.write(data);
			});

			socket.on("disconnect", function () {
				term.write("\r\n*** Disconnected from backend***\r\n");
			});
		});
	}

	render() {
		return (
			<div style={{ padding: "10px" }}>
				<div ref={(ref) => (this.termElm = ref)}></div>
			</div>
		);
	}
}

export default App;
