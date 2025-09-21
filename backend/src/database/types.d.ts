import * as schema from '../database/schemas';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export type Database = NodePgDatabase<typeof schema>;
