import { Response, Request } from 'express';
import { loginService, getRoleService } from '../services/loginService';

async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;
  console.log('controller', email);
  try {
    const result = await loginService(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
}

async function loginValidate(req: Request, res: Response) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error('Token not found');
    const role = await getRoleService(authorization);
    return res.status(200).json(role);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
}

export {
  loginController,
  loginValidate,
};
