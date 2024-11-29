const useUsersRepository = require("../../app/repositories/UsersRepository");
const usersRepository = useUsersRepository();

test('Listando users', async () => {
  const users = await usersRepository.list();
  expect(users).not.toBeNull();
  expect(users.length).toBeGreaterThan(0);
});

test('Salvar user com sucesso', async () => {
  const user = await usersRepository.save({
    name: "Zaqueu",
    email: "zaqueu.js@script.com",
    password: "SenhaLalala",
    active: true,
  });

  expect(user.id).not.toBeNull();
  expect(user.name).toBe("Zaqueu");
  expect(user.email).toBe("zaqueu.js@script.com");
  expect(user.password).toBe("SenhaLalala");
  expect(user.active).toBe(true);
});

test('Encontrando User pelo ID', async () => {
  const user_data = {
    name: "Zaqueu",
    email: "zaqueu.js@script.com",
    password: "SenhaLalala",
    active: true,
  };

  const new_user = await usersRepository.save(user_data);

  const user = await usersRepository.find(new_user.id);

  expect(user.id).not.toBeNull();
  expect(user.name).toBe(user_data.name);
  expect(user.email).toBe(user_data.email);
  expect(user.password).toBe(user_data.password);
  expect(user.active).toBe(user_data.active);
});

test('Atualizando um User já existente', async () => {
  const user_data = {
    name: "Zaqueu",
    email: "zaqueu.js@script.com",
    password: "SenhaLalala",
    active: true,
  };

  const new_user = await usersRepository.save(user_data);

  const user = await usersRepository.find(new_user.id);

  user.name = "Gutto Silva";
  await user.save();

  const updated_user = await usersRepository.find(user.id);

  expect(updated_user.name).toBe(user.name);
});

test('Removendo User do banco de dados', async () => {
  const user_data = {
    name: "Zaqueu",
    email: "zaqueu.js@script.com",
    password: "SenhaLalala",
    active: true,
  };

  const new_user = await usersRepository.save(user_data);

  await usersRepository.remove(new_user.id);

  const user = await usersRepository.find(new_user.id);

  expect(user).toBeNull();
});
