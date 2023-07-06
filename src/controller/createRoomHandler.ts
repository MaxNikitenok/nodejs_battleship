import { createRoom } from '../dataBase/dataBase';
import { wss } from '../ws_server';
import { currentUser } from './regHandler';

export const createRoomHandler = () => {

const newRoom = createRoom(currentUser)

wss.clients.forEach(client => {
  client.send(JSON.stringify({
    type: "update_room",
    data: JSON.stringify(
          [
            newRoom,
          ]
        ),
    id: 0,
}))
})
};
