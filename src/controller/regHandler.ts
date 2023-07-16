import { createUser, getUserByName } from '../dataBase/userDB';
import { sender } from '../sender';

export const regHandler = async (data: string, socket: import('ws')) => {
  const body = JSON.parse(data);

  const registeredUser = getUserByName(body.name);

  const userData = {
    name: '',
    index: 0,
    error: false,
    errorText: '',
  };

  if (!registeredUser) {
    const newUser = createUser(body, socket);

    userData.name = newUser.name;
    userData.index = newUser.index;

    sender(socket, 'reg', userData);
  } else {
    if (registeredUser.password !== body.password) {
      userData.name = registeredUser.name;
      userData.index = registeredUser.index;
      userData.error = true;
      userData.errorText = 'User exist, wrong password';

      sender(socket, 'reg', userData);
    } else {
      userData.name = registeredUser.name;
      userData.index = registeredUser.index;

      sender(socket, 'reg', userData);
    }
  }
};
