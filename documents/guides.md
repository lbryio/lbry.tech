---
title: Quality Guides
---

When contributing to this repo there are existing coding guidelines that you can find [here](/guides/css) (CSS) and [here](/guides/js) (JavaScript). However, here's a high-level overview:



## CSS
- Styles should never override - `:not` and media queries make this possible
- **IDs do not belong in stylesheets**
- Nesting should be a maximum of three levels deep
- BEM is your friend
- Nested includes should be at the top of rules
- CSS parameters in alphabetical order, except for presentation styles



## JS
- Space indentation - Two spaces, makes reading code easy for humans
- Double-quotes - Use single quotes within to avoid escaping
- No unused variables - This one catches tons of bugs!
- Semicolons protect you from yourself
- Space after keyword - `if (condition) {}`
- Space after function name - `function name (arg) { ... }`
- No space in array bracket - `const arr = [1, 2, 3]`
- Always space in block - `const obj = { foo: "bar" }`
- Always `===` instead of `==` - Strict compares are consistent
- No trailing commas
