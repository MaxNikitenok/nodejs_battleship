import { getUserByName, createUser } from '../dataBase/dataBase';

export const regHandler = async (data: string, socket: import("ws")) => {
  const body = JSON.parse(data);

  const registeredUser = getUserByName(body.name)

  if (!registeredUser) {
    const newUser = createUser(body, socket);

    socket.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({
          name: newUser.name,
          index: newUser.index,
          error: false,
          errorText: '',
        }),
        id: 0,
      })
    );

  } else {
    if (registeredUser.password !== body.password) {
      socket.send(
        JSON.stringify({
          type: 'reg',
          data: JSON.stringify({
            name: registeredUser.name,
            index: registeredUser.index,
            error: true,
            errorText: 'User exist, wrong password',
          }),
          id: 0,
        })
      );
    } else {
      socket.send(
        JSON.stringify({
          type: 'reg',
          data: JSON.stringify({
            name: registeredUser.name,
            index: registeredUser.index,
            error: false,
            errorText: '',
          }),
          id: 0,
        })
      );
    }
  }
};
