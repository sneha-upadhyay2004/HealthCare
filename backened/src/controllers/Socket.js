import {Server} from 'socket.io';

 let connections = {}
let messages = {}
let timeOnline = {}


export const connectToSocket = (server) =>{
    const io = new Server(server, {
        cors:{
            origin :"*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });
   
     io.on("connection",(socket) => {
        console.log("something connected");
  
        socket.on("join-call", (path) =>{
            if(connections[path] === undefined){
                connections[path] = [];
            }
            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();
            //for track how long the user stay connnected
            console.log("user joined",path, socket.id);

            for(let a = 0; a < connections[path].length; a++){
                io.to(connections[path][a]). emit("user-joined",socket.id, connections[path])
            }
            //notifies all users in the room that a new user who joined

            if(messages[path] !== undefined){
                for(let a=0; a < messages[path]; ++a){
              io.to(socket.id).emit("chat-message", messages[path][a]['data'], messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
                }
            }
            //io.to means kisko vo chij dikhaani hae ya bhejni hae 
          
        })
        //ensure the new user sees the chat hstory when joined

        socket.on('signal',(toId, message)=>{
            io.to(toId).emit("signal", socket.id, message)
        })

      socket.on("chat-message", (data, sender) =>{
        const [matchingRoom, found] = Object.entries(connections)
    .reduce(([Room, isFound], [roomKey, roomValue])=>{
      if(!isFound && roomValue.includes(socket.id)){
        return[roomKey, true]
      }
      return[roomKey, isFound];

    }, ['', false]);

    if(found === true){
        if(messages[matchingRoom] === undefined){
            messages[matchingRoom] = [];

        }
        messages[matchingRoom].push({
            'sender':sender,
            'data':data,
            'socket-id-sender': socket.id
        })
        console.log("message", matchingRoom, ":", sender,data);

        connections[matchingRoom].forEach((elem) => {
            io.to(elem).emit('chat-message', data,sender,socket.id)
        })
    }

})
// Waits for a message ("chat-message" event).
// Finds the room the sender belongs to by searching connections.
// If a room is found, it:
// Saves the message to the room's history.
// Logs it to the server console.
// // Sends the message to all users in the same room.

  socket.on("disconnect", () => {

            var diffTime = Math.abs(timeOnline[socket.id] - new Date())
            var key
            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key = k

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)
                        }

                        var index = connections[key].indexOf(socket.id)

                        connections[key].splice(index, 1)

                        if (connections[key].length === 0) {
                            delete connections[key]
                        }
                    }
                }

            }
        })


    })
      // The script calculates how long the user was online.
    // It loops through all rooms to find where the user was connected.
    // Notifies other users in the same room that the user left.
    // Removes the user from the room.
    // Deletes the room if it becomes empty.
    return io;
}
//emit() = send , on() = receives
