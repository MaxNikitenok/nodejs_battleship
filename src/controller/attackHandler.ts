import { getRoom, getShipInfo, getUserBySocket } from '../dataBase/dataBase';
import { wss } from '../ws_server';

export const attackHandler = (
  data: string,
  socket: import('ws')
) => {
  console.log(data);
  const parsedData = JSON.parse(data);

  const room = getRoom(parsedData.gameId);

  const prevShooter = getUserBySocket(socket);
  const currentShooter = room.roomUsers.find((user) => {
    const shooter = user.index !== prevShooter.index;
    return shooter;
  });

  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: 'turn',
        data: JSON.stringify({
          currentPlayer: currentShooter.index,
        }),
        id: 0,
      })
    );
  });
  

  const shootResult = getShipInfo(parsedData, currentShooter.index)


  console.log(shootResult);

  if(shootResult.status === 'killed') {

    shootResult.freeArea.forEach(item=>{
      socket.send(
        JSON.stringify({
          type: 'attack',
          data: JSON.stringify({
            position: {
              x: item.x,
              y: item.y,
            },
            currentPlayer: prevShooter.index,
            status: 'miss',
          }),
          id: 0,
        })
      );
    })

    shootResult.shipPositions.forEach(item=>{
      socket.send(
        JSON.stringify({
          type: 'attack',
          data: JSON.stringify({
            position: {
              x: item.x,
              y: item.y,
            },
            currentPlayer: prevShooter.index,
            status: 'killed',
          }),
          id: 0,
        })
      );
    })
  }


  socket.send(
    JSON.stringify({
      type: 'attack',
      data: JSON.stringify({
        position: {
          x: shootResult.x,
          y: shootResult.y,
        },
        currentPlayer: prevShooter.index,
        status: shootResult.status,
      }),
      id: 0,
    })
  );
};
