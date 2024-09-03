Check the current timezones: https://momentjs.com/timezone/

# Doc
This is just a use case of event stream with server side events, simple and working, it's a starting point and I will add some feature like VAPI checks and some styles to give more love to the UI!

# Getting Started
## Server
- Run `cd server`
- Run `npm run dev`

## Client
- Run `cd client`
- Run `npm start`
Check the ports since if you start the server before, the client will ask you to change the port from 3000 to 3001.
I prefer starting with the server.

Enjoy!!

# Tech and Frameworks
For the server I decided to go with [HonoJs](https://hono.dev), a simple and ultrafast framework for backend, simple to use and set up.

For the client I decided to go with plain [React](https://it.legacy.reactjs.org) since I wanted some boilerplate but nothing more. It's just a lazy decision, next time I would like to try other frameworks.

A friend of mine suggested to me to try with [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) instead of using some heavy libs, fast implementation even if I struggled to find a good combination of the server/client communication

