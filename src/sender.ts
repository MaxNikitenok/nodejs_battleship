export const sender = (socket: import("ws"), type: string, data) => {
  socket.send(
    JSON.stringify({
      type,
      data: JSON.stringify(data),
      id: 0,
    })
  );
};
