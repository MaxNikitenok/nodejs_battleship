import { getUserByName, createUser } from '../dataBase/dataBase';

export let currentUser = {} as { name: string; index: number };

export const regHandler = async (data: string, socket: import('ws')) => {
  const body = JSON.parse(data);

  const registeredUser = getUserByName(body.name)

  if (!registeredUser) {
    const newUser = createUser(body);

    socket.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({
          name: newUser.name,
          index: newUser.id,
          error: false,
          errorText: '',
        }),
        id: 0,
      })
    );
    currentUser = { name: newUser.name, index: newUser.id };
  } else {
    if (registeredUser.password !== body.password) {
      socket.send(
        JSON.stringify({
          type: 'reg',
          data: JSON.stringify({
            name: registeredUser.name,
            index: registeredUser.id,
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
            index: registeredUser.id,
            error: false,
            errorText: '',
          }),
          id: 0,
        })
      );
      currentUser = { name: registeredUser.name, index: registeredUser.id };
    }
  }
};
