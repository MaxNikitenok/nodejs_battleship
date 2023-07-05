import { readFile, writeFile } from 'fs/promises';

export const regHandler = async (data: string, socket: import('ws')) => {
  const body = JSON.parse(data);

  const dataBase = await readFile('src/dataBase/dataBase.json');

  const parsedDataBase = JSON.parse(dataBase.toString());

  const createUser = async (user: { name: string; password: string }) => {
    return { id: parsedDataBase.length, ...user };
  };

  const registeredUser = parsedDataBase.find((user: { name: string }) => {
    return user.name === body.name;
  });

  if (!registeredUser) {
    const newUser = await createUser(body);

    await parsedDataBase.push(newUser);

    const updatedDataBase = JSON.stringify(parsedDataBase);

    await writeFile('src/dataBase/dataBase.json', updatedDataBase);

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
    }
  }
};
