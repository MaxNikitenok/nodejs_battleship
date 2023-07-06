import { wss } from '../ws_server';
import { currentUser } from './regHandler';

export const createRoomHandler = () => {
wss.clients.forEach(client => {
  client.send(JSON.stringify({
    type: "update_room",
    data: JSON.stringify(
          [
            {
              roomId: 0,
              roomUsers:
                  [
                      currentUser
                  ],
          },
          ]
        ),
    id: 0,
}))
})
};
