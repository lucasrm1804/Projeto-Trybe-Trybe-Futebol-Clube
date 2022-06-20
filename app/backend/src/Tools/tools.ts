import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import * as bcrypt from 'bcryptjs';

async function getSecret() {
  const secret = await fs.readFile('jwt.evaluation.key', 'utf8');
  return secret;
}

async function getToken(id: number) {
  const token = jwt.sign({ id }, await getSecret());
  return token;
}

async function compare(param1: string, param2: string) {
  const result = await bcrypt.compare(param1, param2);
  return result;
}

async function decodedToken(token: string) {
  const decode = jwt.verify(token, await getSecret());
  return decode;
}

export {
  getToken,
  compare,
  decodedToken,
};
