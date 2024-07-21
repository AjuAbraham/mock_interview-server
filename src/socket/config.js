
export const roomIdToUserIdsMap = new Map();

export const handleRoom = (data, socket, io) => {
  const {user, roomId } = data;
  if (!roomIdToUserIdsMap.has(roomId)) {
    roomIdToUserIdsMap.set(roomId, []);
  }
  roomIdToUserIdsMap.get(roomId).includes(user);
  roomIdToUserIdsMap.get(roomId).push(user);

  console.log("name to socket io map: ", roomIdToUserIdsMap);
  socket.join(roomId);
  io.to(socket.id).emit("room-joined", roomId);
  socket.on("ready",()=>{
    io.to(roomId).emit("user-notification", {  peerId:user });
  })
};




















// export const sendCall = (data, socket, io) => {
//   const { to, offer } = data;
//   io.to(to).emit("incomming-call", { from: socket.id, offer });
// };

// export const acceptCall = (data, socket, io) => {
//   const { to, ans } = data;
//   io.to(to).emit("incomming-accpeted", { from: socket.id, ans });
// };

// export const negotiationNeeded = (data, socket, io) => {
//   const { to, offer } = data;
//   io.to(to).emit("negotiation-needed", { from: socket.id, offer });
// };
// export const negotiationComplete = (data, socket, io) => {
//   const { to, ans } = data;
//   io.to(to).emit("negotiation-final", { from: socket.id, ans });
// };
