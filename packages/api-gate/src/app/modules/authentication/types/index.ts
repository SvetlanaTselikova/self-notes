import { Request } from 'express';
import { Users } from '@self-notes-frontend/database';

export interface TokenPayload {
  userId: number;
}

interface RequestWithUser extends Request {
  user: Users;
}

export default RequestWithUser;
