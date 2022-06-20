import User from '../database/models/user';
import { getToken, compare, decodedToken } from '../Tools/tools';

async function loginService(email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  console.log('services', email);

  if (!user) {
    throw new Error('Incorrect email or password');
  }
  const token = await getToken(user.id);
  const passwordOk = await compare(password, user.password);

  if (!passwordOk) {
    throw new Error('Incorrect email or password');
  }
  return { user: {
    id: user.id,
    username: user.username,
    role: user.role,
    email: user.email,
  },
  token };
}

async function getRoleService(authorization: string) {
  const token = await decodedToken(authorization) as { id: number };
  const user = await User.findByPk(token.id);
  if (!user) {
    throw new Error('Inexistent user');
  }
  return user.role;
}

export {
  loginService,
  getRoleService,
};
