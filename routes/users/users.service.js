const Role = require("../auth/roles");
// users hardcoded for simplicity, store in a db for production applications
const users = [
  {
    id: 1,
    username: "admin",
    password: "admin",
    role: Role.admin,
    users: [],
  },
];

async function authenticate({ username, password }) {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

async function getAll() {
  return users.map((u) => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
}

async function createUser(user, me) {
  users.push(user);
  [...users, me.users.push(user)];
  console.log(me);
  return user;
}

function getUser(username) {
  const existing = users.filter((user) => user.username === username);
  return existing;
}

async function deleteUser(username) {
  if (getUser(username).length > 0) {
    let userFound = getUser(username);
    const idx = users.indexOf(userFound[0]);
    users.splice(idx, 1);
    return true;
  } else {
    return false;
  }
}
module.exports = {
  authenticate,
  getAll,
  createUser,
  getUser,
  deleteUser,
};
