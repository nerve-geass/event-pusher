import { serve } from '@hono/node-server'
import { randomInt } from 'crypto'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { streamSSE, streamText } from 'hono/streaming'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use('*', cors(
  {
    origin: '*',
    allowMethods: ['GET'],
    allowHeaders: ['Content-Type'],
  }
))

app.get('/', (c) => c.text('Hello Hono!'))

app.use('/sse/*', async (c, next) => {
  c.header('Content-Type', 'text/event-stream');
  c.header('Cache-Control', 'no-cache');
  c.header('Connection', 'keep-alive');
  await next();
});

app.get('/sse', async (c) => {
  let id = 0
  return streamSSE(c, async (stream) => {

    stream.onAbort(() => {
      console.log("Aborted!")
    })

    const timeZones = [
      {flag: 'us', timeZone:'America/New_York'},
      {flag: 'eu', timeZone:'Europe/Rome'},
      {flag: 'jp', timeZone:'Asia/Tokyo'},
      {flag: 'br', timeZone:'America/Sao_Paulo'},
      {flag: 'mz', timeZone:'Africa/Maputo'},
      {flag: 'gb', timeZone:'Europe/London'},
      {flag: 'au', timeZone:'Australia/Sydney'},
      {flag: 'ae', timeZone:'Asia/Dubai'},
      {flag: 'fi', timeZone:'Europe/Helsinki'},
    ]

    while (true) {

      let date = new Date
      let timeZone = timeZones.at(randomInt(8))
      let options = { timeZone: timeZone!.timeZone, flag: timeZone!.flag}
      let eastCoastTime = date.toLocaleString('en-US', options)
      const message = `It is ${eastCoastTime} in ${options.timeZone}`

      if (id == 8) {
        await stream.writeSSE({
          data: "",
          event: 'close',
          id: String(id++),
        })
        await stream.close()
      }
      await stream.writeSSE({
        data: JSON.stringify({message: message, flag: options.flag}),
        event: 'time-update',
        id: String(id++),
      })
      await stream.sleep(5000)
    }
  })
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
