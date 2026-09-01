import { InferInsertModel } from 'drizzle-orm';
import { users } from '../../drizzle/users/schema';

export type CreateUserDto = Omit<InferInsertModel<typeof users>, 'id' | 'createdAt' | 'updatedAt'>;
