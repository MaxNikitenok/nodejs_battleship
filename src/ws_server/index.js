import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 }, () =>
  console.log('Server started on 3000 port')
);

const response = JSON.stringify({
  type: 'reg',
  data: JSON.stringify({
    name: '55555',
    index: 55555,
    error: false,
    errorText: '',
  }),
  id: 0,
});

wss.on('connection', function connection(ws) {
  // ws.on('error', console.error);

  ws.on('message', function message(data) {
    switch (JSON.parse(data).type) {
      case 'reg':
        try {
          ws.send(response);
        } catch (err) {
          console.log(err);
        }

        break;
    }
  });

  ws.send('something');
});
