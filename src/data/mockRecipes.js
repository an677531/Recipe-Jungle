/**
 * Mock recipe data for UI development.
 * Used during Phases 4–5 before Supabase is connected in Phase 7.
 * Replace this import with a Supabase fetch once the database is live.
 *
 * When the real recipe file and images are provided, delete this file
 * and update RecipeList.jsx and RecipeDetail.jsx to fetch from Supabase.
 */

const mockRecipes = [
  {
    id: "mock-001",
    title: "Spaghetti Carbonara",
    description:
      "A Roman pasta classic made with eggs, Pecorino Romano, guanciale, and black pepper. No cream — just technique and good ingredients.",
    ingredients: [
      "400g spaghetti",
      "200g guanciale (or pancetta as a substitute)",
      "4 large eggs",
      "2 egg yolks",
      "100g Pecorino Romano, finely grated",
      "50g Parmesan, finely grated",
      "Freshly cracked black pepper",
      "Kosher salt",
    ],
    instructions:
      "1. Bring a large pot of heavily salted water to a boil and cook spaghetti until just al dente. Reserve 1 cup of pasta water before draining.\n\n2. While the pasta cooks, slice guanciale into small lardons and cook in a cold skillet over medium heat, stirring occasionally, until the fat renders and the edges are just crisp, about 8 minutes. Remove from heat.\n\n3. In a bowl, whisk together eggs, egg yolks, Pecorino, and Parmesan into a thick paste. Season generously with black pepper.\n\n4. Add the drained pasta directly to the skillet with the guanciale (off the heat). Toss to coat in the rendered fat.\n\n5. Add the egg and cheese mixture and toss quickly, adding reserved pasta water a splash at a time until the sauce is glossy and coats the noodles. The residual heat cooks the eggs — do not return the pan to the burner or the eggs will scramble.\n\n6. Serve immediately with extra Pecorino and a heavy crack of black pepper.",
    category: "Italian",
    image_url: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800",
    cook_time: 15,
    prep_time: 10,
    servings: 4,
    difficulty: "Medium",
    special_notes:
      "Guanciale (cured pork cheek) is traditional and worth finding at an Italian deli — it has a richer, more complex flavor than pancetta. A kitchen thermometer helps if you are nervous about the egg sauce: the pasta should be around 160°F when you add it. Avoid pre-grated cheese; it won't melt smoothly.",
    created_at: "2025-01-15T10:00:00.000Z",
  },
]

export default mockRecipes
