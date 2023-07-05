import { wss } from '../ws_server';

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
                      {
                          name: 11111,
                          index: 0,
                      }
                  ],
          },
          ]
        ),
    id: 0,
}))
})
};
