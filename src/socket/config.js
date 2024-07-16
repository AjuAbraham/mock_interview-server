

const nameToSocketIdMap = new Map();
const socketIdToNameMap = new Map();


export const handleRoom = (data,socket,io)=>{
      const{name,roomId} = data;
      nameToSocketIdMap.set(name,socket.id);
      socketIdToNameMap.set(socket.id,name);
      io.to(roomId).emit("user-notification",{name,id:socket.id})
      socket.join(roomId);
      io.to(socket.id).emit("room-joined",roomId);
}
