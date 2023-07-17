import { WebSocketServer } from 'ws';
import { regHandler } from '../controller/regHandler';
import { createRoomHandler } from '../controller/createRoomHandler';
import { addUserToRoomHandler } from '../controller/addUserToRoomHandler';
import { addShipsHandler } from '../controller/addShipsHandler';
import { attackHandler } from '../controller/attackHandler';
import { randomAttackHandler } from '../controller/randomAttackHandler';
import { singlePlayHandler } from '../controller/singlePlayHandler';

export let singlePlayMode = false;
export const wss = new WebSocketServer({ port: 3000 }, () =>
  console.log('WS server started on 3000 port')
);

wss.on('connection', function connection(ws) {
  ws.on('message', async function message(data) {
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
          createRoomHandler(ws);
        } catch (err) {
          console.log(err);
        }
        break;
      case 'add_user_to_room':
        try {
          addUserToRoomHandler(parsedMessage.data, ws);
        } catch (err) {
          console.log(err);
        }
        break;
      case 'add_ships':
        try {
          addShipsHandler(parsedMessage.data);
        } catch (err) {
          console.log(err);
        }
        break;
      case 'attack':
        try {
          attackHandler(parsedMessage.data, ws);
        } catch (err) {
          console.log(err);
        }
        break;
      case 'randomAttack':
        try {
          randomAttackHandler(parsedMessage.data, ws);
        } catch (err) {
          console.log(err);
        }
        break;
      case 'single_play':
        try {
          singlePlayMode = true;
          singlePlayHandler(ws);
        } catch (err) {
          console.log(err);
        }
        break;
    }
  });

  ws.send('something');
});
