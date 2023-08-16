import { Request } from 'express';
import { Users } from '@self-notes/database';

export interface TokenPayload {
  userId: number;
}

interface RequestWithUser extends Request {
  user: Users;
}

export default RequestWithUser;
