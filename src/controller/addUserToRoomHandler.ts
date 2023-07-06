import { wss } from "../ws_server";

export const addUserToRoomHandler = (data: string) => {
  console.log(JSON.parse(data))
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
                        },
                        {
                            name: 22222,
                            index: 1,
                        },
                    ],
            },
            ]
          ),
      id: 0,
  }))
  })
  wss.clients.forEach(client => {
    client.send(JSON.stringify({
      type: "create_game",
      data: JSON.stringify(
        {
          idGame: 0,
          idPlayer: 0,
      },
          ),
      id: 0,
  }))
  })
}