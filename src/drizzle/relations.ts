import { users } from "./users/schema";
import { session } from "./schematics/session/schema";
import { defineRelations } from "drizzle-orm";
import { meal, mealIngredient } from "./schematics/ingredientsMeals/schema";

export const relations = defineRelations({ users, session, meal, mealIngredient }, (r) => ({
  users: {
    sessions: r.many.session(),
  },
  session: {
    user: r.one.users({
      from: r.session.userId,
      to: r.users.id,
    }),
  },
   meal: {
      ingredientes: r.many.mealIngredient({
        from: r.meal.id,
        to: r.mealIngredient.mealId,
        alias: "recipe",
      }),
      usadoComoIngredienteEn: r.many.mealIngredient({
        from: r.meal.id,
        to: r.mealIngredient.ingredientId,
        alias: "ingredient",
      }),
    },
    alimentoIngrediente: {
      alimento: r.one.meal({
        from: r.mealIngredient.mealId,
        to: r.meal.id,
        alias: "recipe",
      }),
      ingrediente: r.one.meal({
        from: r.mealIngredient.ingredientId,
        to: r.meal.id,
        alias: "ingredient",
      }),
    },
}));

