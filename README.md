# Web terminal

Manage server from the web using SSH

## SSH Server

Sample Alpine server with SSH installed. Use below command to start docker container

```sh
docker run -d -p 2222:22 xorb/alpine-ssh
```

Default credentials:

**port**: 2222
**username**: root
**password**: root

## Server

NodeJS Server, uses SSH2 to connect to remote servers and realtime data messaging. Navigate to `server` folder and run the following commands

```bash
# install dependencies
npm install
# start application
npm start
```

## Client

React application which connects to remote server and gives access to the terminal. It uses xterm.

```bash
# install dependencies
npm install
# start application
npm start
```

![Preview](https://i.ibb.co/znXSpbL/Screen-Shot-2020-08-23-at-16-01-33.png "Preview")

## Author

Created and maintained by Dany Boza ([@xorbmoon](https://twitter.com/xorbmoon)).
