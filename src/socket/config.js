
export const roomIdToUserIdsMap = new Map();

export const handleRoom = (data, socket, io) => {
  const {user, roomId } = data;
  if (!roomIdToUserIdsMap.has(roomId)) {
    roomIdToUserIdsMap.set(roomId, []);
  }
  if (!roomIdToUserIdsMap.get(roomId).includes(user)) {
    roomIdToUserIdsMap.get(roomId).push(user);
  }
  console.log("name to socket io map: ", roomIdToUserIdsMap);
  socket.join(roomId);
  io.to(socket.id).emit("room-joined", roomId);
  socket.on("ready",()=>{
    io.to(roomId).emit("user-notification", {  peerId:user });
  })
};



















