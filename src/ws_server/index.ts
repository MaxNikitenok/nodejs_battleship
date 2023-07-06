import { WebSocketServer } from 'ws';
import { regHandler } from '../controller/regHandler';
import { createRoomHandler } from '../controller/createRoomHandler';
import { addUserToRoomHandler } from '../controller/addUserToRoomHandler';

export const wss = new WebSocketServer({ port: 3000 }, () =>
  console.log('WS server started on 3000 port')
);

wss.on('connection', function connection(ws) {
  // ws.on('error', console.error);

  ws.on('message', function message(data) {
    const parsedMessage = JSON.parse(data as unknown as string);
    switch (parsedMessage.type) {
      case 'reg':
        try {
          regHandler(parsedMessage.data, ws);
        } catch (err) {
          console.log(err);
        }
        break;
      case 'create_room':
        try {
          createRoomHandler();
        } catch (err) {
          console.log(err);
        }
        break;
      case 'add_user_to_room':
        try {
          addUserToRoomHandler(parsedMessage.data);
        } catch (err) {
          console.log(err);
        }
        break;
    }
  });

  ws.send('something');
});
