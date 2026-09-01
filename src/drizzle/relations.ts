import { users } from "./users/schema";
import { session } from "./session/schema";
import { defineRelations } from "drizzle-orm";

export  default defineRelations({ users, session }, (r) => ({
  users: {
    sessions: r.many.session(),
  },
  session: {
    user: r.one.users({
      from:r.session.userId,
      to:r.users.id,
    }),
  },
}));

