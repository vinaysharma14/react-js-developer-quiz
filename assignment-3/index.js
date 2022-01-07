// a mapping of each `recipe` against it's fudge
// which fallbacks to `1` if recipe is not found
fudge =
  {
    SPANISH: SPANISH_FUDGE,
    FRENCH: FRENCH_FUDGE,
    ENGLISH: ENGLISH_FUDGE,
  }[recipe] || 1;

// handles the special case of `FRENCH`
// recipe where `chocolate` is required
if (recipe === 'FRENCH') {
  chocolate = 7;
}

// both lines of code are common for all the recipes
amt = base * fudge;
sugar = 2 * bottom(amt) + top(amt) * 1.17;
