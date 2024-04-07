import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

import { Server } from 'socket.io'
import { createServer } from 'node:http'

dotenv.config()

const port = process.env.PORT ?? 8000

const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
})

const db = createClient({
    url: 'libsql://light-shadow-king-smarlboro.turso.io',
    //Esto de abajo no es una buena practica:c
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTI1MTA4NTMsImlkIjoiOTJhOTA2NDMtYzlkMS00MTEyLTk5ZDktYjdmNmM3MGFiYTM0In0.9FMEQkrLMKxd6kRporekWzhGugLH3m964by5bCQIP51hcIFDkwtTsYtqgzn9mN21eGkcYYJDg6Ptfm8ipBhkBA"
})

await db.execute(`CREATE TABLE IF NOT EXISTS mensajes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT
)`)


io.on('connection', async (socket) =>{
    console.log('Un usuario se ha conectado')
    
    socket.on('disconnect',() =>{
        console.log('Un usuario se ha desconectado')
    })

    socket.on('chat message', async (msg) =>{
        let result
        try {
            result = await db.execute({
                sql: 'INSERT INTO mensajes (content) VALUES (:msg)',
                args : { msg }
            })
        } catch (e){
            console.error(e)
            return
        }


        io.emit('chat message', msg, result.lastInsertRowid.toString())
    })

    if (!socket.recovered) {
        try {
            const results = await db.execute({
                sql: 'SELECT id, content FROM mensajes WHERE id > ?',
                args: [socket.handshake.auth.serverOffset ?? 0] 
            })

            results.rows.forEach(row =>{
                socket.emit('chat message', row.content, row.id.toString())
            })
        } catch (e){
            console.error(e)
            return
        }
    }
})

app.use(logger('dev'))

app.get('/', (req, res) =>{
    res.sendFile(process.cwd() + '/chat/client/chat.html')
})

server.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})