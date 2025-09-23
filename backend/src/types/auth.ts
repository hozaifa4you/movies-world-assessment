import { Role, Status } from '../database/schemas';

export type AuthUserType = {
   id: number;
   name: string;
   email: string;
   role: Role;
   status: Status;
};
