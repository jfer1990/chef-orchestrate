import { InferInsertModel } from 'drizzle-orm';
import { Users } from '../../drizzle/schema';

export type CreateUserDto = Omit<InferInsertModel<typeof Users>, 'id' | 'createdAt' | 'updatedAt'>;
