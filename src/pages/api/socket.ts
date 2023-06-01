import { Server } from 'socket.io'

import type { Socket } from 'socket.io'

import type { NextApiRequest, NextApiResponse } from 'next'

const ioHandler = (req: NextApiRequest, res: NextApiResponse) => {

    const socket = req.socket as any
    
  if (!socket.server.io) {
    console.log('*First use, starting socket.io')

    const io = new Server(socket.server, {
        path: '/api/socket_io',
        addTrailingSlash: false
    })

    io.on('connection', socket => {
        console.log('a user connected')
      socket.broadcast.emit('a user connected')
      socket.on('hello', msg => {
        socket.emit('hello', 'world!')
      })
    })

    
    socket.server.io = io
  } else {
    console.log('socket.io already running')
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler