<h1 align="center">Assignment #3</h1>

## Question 📃

Refactor the code below. By refactor we mean that you should reorganize the code to reduce the unnecessary complexity, and improve readability. In this process you should not modify the way the code functions. Do not create functions or new constants, simply refactor the code.

```js
if (recipe == 'SPANISH') {
  fudge = SPANISH_FUDGE;
  amt = base * SPANISH_FUDGE;
  sugar = 2 * bottom(amt) + top(amt) * 1.17;
} else if (recipe == 'FRENCH' || recipe == 'ENGLISH') {
  fudge = recipe == 'FRENCH' ? FRENCH_FUDGE : ENGLISH_FUDGE;
  amt = base * fudge;
  sugar = 2 * bottom(amt) + top(amt) * 1.17;
  if (recipe == 'FRENCH') {
    chocolate = 7;
  }
} else {
  fudge = 1;
  amt = base;
  sugar = 2 * bottom(amt) + top(amt) * 1.17;
}
```

## Solution 🚀

```bash
  # clone the repository
  git clone https://github.com/vinaysharma14/react-js-developer-quiz

  # open the `index.js` file in below directory
  cd assignment-3
```
