import { users } from "./users/schema";
import { session } from "./session/schema";
import { defineRelations } from "drizzle-orm";
import { meal, mealIngredient } from "./meals/schema";

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
      // Ingredientes que componen a este alimento (si es una receta)
      ingredientes: r.many.mealIngredient({
        from: r.meal.id,
        to: r.mealIngredient.mealId,
        alias: "recipe",
      }),
      // Recetas donde este alimento es usado como ingrediente de otro
      usadoComoIngredienteEn: r.many.mealIngredient({
        from: r.meal.id,
        to: r.mealIngredient.ingredientId,
        alias: "ingredient",
      }),
    },
    alimentoIngrediente: {
      // La receta "padre" de esta línea
      alimento: r.one.meal({
        from: r.mealIngredient.mealId,
        to: r.meal.id,
        alias: "recipe",
      }),
      // El alimento usado como ingrediente en esta línea
      ingrediente: r.one.meal({
        from: r.mealIngredient.ingredientId,
        to: r.meal.id,
        alias: "ingredient",
      }),
    },
}));

