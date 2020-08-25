## Running JSON-Server

`json-server --watch db.json -d 2000 -p <port> --host <ip_address>`

- -d flag => data served after 2s (2000ms) delay to simulate realtime delay while accessing data from a server

- -p flag => set server port number `<port>` where data is served

- --host flag => to make sure data is hosted at `http://<ip_address:>` instead of `http://localhost:`
