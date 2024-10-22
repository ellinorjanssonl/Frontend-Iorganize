import users from './data/users.json';

export const authenticate = (username, password) => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  
  if (user) {
    return { success: true, role: user.role };
  } else {
    return { success: false };
  }
};
