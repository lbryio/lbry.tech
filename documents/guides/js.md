---
title: JavaScript Quality Guide
---

## Goal

This style guide aims to provide the ground rules for an application's JavaScript code, such that it's highly readable and consistent across different developers on a team. The focus is put on quality and coherence across the different pieces of your application.



## Table of Contents

1. [Modules](#modules)
2. [Strict Mode](#strict-mode)
3. [Spacing](#spacing)
4. [Semicolons](#semicolons;)
5. [Linting](#linting)
6. [Strings](#strings)
7. [Variable Declaration](#variable-declaration)
8. [Conditionals](#conditionals)
9. [Equality](#equality)
10. [Ternary Operators](#ternary-operators)
11. [Functions](#functions)
12. [Prototypes](#prototypes)
13. [Object Literals](#object-literals)
14. [Array Literals](#array-literals)
15. [Regular Expressions](#regular-expressions)
16. [Comments](#comments)
17. [Variable Naming](#variable-naming)
18. [Everyday Tricks](#everyday-tricks)



## Modules

The most common module systems are [CommonJS](https://wiki.commonjs.org/wiki/CommonJS), [AMD](https://requirejs.org/docs/whyamd.html), and [ES6 Modules](https://eviltrout.com/2014/05/03/getting-started-with-es6.html). Modules systems provide individual scoping, avoid leaks to the `global` object, and improve code base organization by **automating dependency graph generation**, instead of having to resort to manually creating multiple `<script>` tags.

Module systems also provide us with dependency injection patterns, which are crucial when it comes to testing individual components in isolation.



## Strict Mode

**Always** put [`"use strict";`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode) at the top of your modules. Strict mode allows you to catch nonsensical behavior, discourages poor practices, and _is faster_ because it allows compilers to make certain assumptions about your code.



## Spacing

Spacing must be consistent across every file in the application. To this end, using something like [`.editorconfig`](https://editorconfig.org) configuration files is highly encouraged. Here are the defaults used for [lbry.tech](https://lbry.tech):

```ini
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
```

The `.editorconfig` file takes care of creating the desired spacing for this project by pressing the tab key.

Spacing doesn't just entail tabbing, but also the spaces before, after, and in between arguments of a function declaration. Here are some examples of the spacing scheme we employ:

```js
function () {}
```

```js
function (a, b) {}
```

```js
function namedFunction(a, b) {}
```



## Semicolons`;`

We love using semicolons to avoid potential issues with Automatic Semicolon Insertion _(ASI)_ and to save us from ourselves.



## Linting

Linting is great for ensuring basic mistakes don't get merged into master (like unnecessary or unintentional semicolons). We use [`eslint`](https://github.com/eslint/eslint) to ensure our next-generation JavaScript code is up to snuff.

Here is our `.eslintrc.json` file:

```json
{
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "rules": {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"]
  }
}
```



## Strings

Strings should always be quoted using the same quotation mark throughtout a codebase. Be consistent! We prefer double-quotes.

#### Bad

```js
const message = 'oh hai ' + name + "!";
```

#### Good

```js
const message = "oh hai " + name + "!";
```

You'll be a happier JavaScript developer if you use template literals. That way it'll be far easier to format your strings, and the code looks a lot cleaner too.

#### Better

```js
const message = util.format(`oh hai ${name}!`);
```

To declare multi-line strings, particularly when dealing with HTML snippets, template literals definitely come in handy!

```js
const html = `
  <div>
    <span class='monster'>${name}</span>
  </div>
`;
```



## Variable Declaration

Always declare variables in **a consistent manner**, and at the top of their scope. Keeping variable declarations to _one per line is encouraged_. Comma-first, a single `var` statement, multiple `var` statements, it's all fine, just be consistent across the project, and ensure the team is on the same page.

Knowing when to use [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) and [`var`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var) is super important.

#### Bad

```js
const foo = 1,
    bar = 2;

let baz;
let pony;

let a
  , b;
```

```js
const foo = 1;

if (foo > 1) {
  var bar = 2;
}
```

#### Good

```js
const foo = 1;
const bar = 2;

let baz;
let pony;

let a;
let b;
```

```js
const foo = 1;
let bar;

if (foo > 1) {
  bar = 2;
}
```

Variable declarations that aren't immediately assigned a value are acceptable to share the same line of code.

#### Acceptable

```js
const a = "a";
const b = 2;

let i, j;
```



## Conditionals

If you are one-lining conditionals, the conditional should be a) short and b) without brackets. Otherwise, brackets are enforced for the sake of text comprehension.

#### Acceptable

```js
if (err) throw err;
```

#### Better

```js
if (err) {
  throw err;
}
```



## Equality

Avoid using `==` and `!=` operators, always favor `===` and `!==`. These operators are called the "strict equality operators," while [their counterparts will attempt to cast the operands](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) into the same value type.

#### Bad

```js
function isEmptyString (text) {
  return text == "";
}

isEmptyString(0);
// <- true
```

#### Good

```js
function isEmptyString(text) {
  return text === "";
}

isEmptyString(0);
// <- false
```



## Ternary Operators

Ternary operators are fine for clear-cut conditionals, but unacceptable for confusing choices. As a rule, if you can't eye-parse it as fast as your brain can interpret the text that declares the ternary operator, chances are it's probably too complicated for its own good.

Use operators responsibly.

jQuery is a prime example of a codebase that's [**filled with nasty ternary operators**](https://github.com/jquery/jquery/blob/d7237896c79a5a10d85fcdec199c5657a469a92b/src/ajax.js#L125).

#### Bad

```js
function calculate(a, b) {
  return a && b ? 11 : a ? 10 : b ? 1 : 0;
}
```

#### Good

```js
function getName (mobile) {
  return mobile ? mobile.name : "Generic Player";
}
```

In cases that may prove confusing just use `if` and `else` statements instead. If you have more than three `if`/`else` statements, [switch cases](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) are the way to go for readability/comprehension.



## Functions

When declaring a function, always use the [function declaration form](https://stackoverflow.com/a/336868/1167646) instead of [function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function). Because [hoisting](https://github.com/buildfirst/buildfirst/tree/master/ch05/04_hoisting).

#### Bad

```js
const sum = (x, y) => {
  return x + y;
};
```

#### Good

```js
function sum(x, y) {
  return x + y;
}
```

That being said, there's nothing wrong with function expressions that are just [currying another function](http://ejohn.org/blog/partial-functions-in-javascript).

#### Good

```js
const plusThree = sum.bind(null, 3);
```

Keep in mind that [function declarations will be hoisted](https://github.com/buildfirst/buildfirst/tree/master/ch05/04_hoisting) to the top of the scope so it doesn't matter the order they are declared in. That being said, you should make sure to avoid placing them inside conditional statements.

#### Bad

```js
if (Math.random() > 0.5) {
  sum(1, 3);

  function sum(x, y) {
    return x + y;
  }
}

```

#### Good

```js
if (Math.random() > 0.5) {
  sum(1, 3);
}

function sum(x, y) {
  return x + y;
}
```

```js
function sum(x, y) {
  return x + y;
}

if (Math.random() > 0.5) {
  sum(1, 3);
}
```

If you need a _"no-op"_ method you can use either `Function.prototype`, or `function noop () {}`. Ideally a single reference to `noop` is used throughout the application.

---

Don't declare functions inside of loops.

#### Bad

```js
const values = [1, 2, 3];

for (let i = 0; i < values.length; i++) {
  setTimeout(() => {
    console.log(values[i]);
  }, 1000 * i);
}
```

```js
const values = [1, 2, 3];

for (let i = 0; i < values.length; i++) {
  setTimeout(i => {
    return function () {
      console.log(values[i]);
    };
  }(i), 1000 * i);
}
```

#### Good

```js
const values = [1, 2, 3];

for (let i = 0; i < values.length; i++) {
  setTimeout(i => {
    console.log(values[i]);
  }, 1000 * i, i);
}
```

```js
const values = [1, 2, 3];

for (let i = 0; i < values.length; i++) {
  wait(i);
}

function wait(i) {
  setTimeout(() => {
    console.log(i);
  }, 1000 * i);
}
```

#### Better

```js
const values = [1, 2, 3];

for (const value of values) {
  setTimeout(() => {
    console.log(value);
  }, 1000 * value);
}
```

---

Whenever a method is non-trivial, make the effort to **use a named function declaration rather than an anonymous function**. This will make it easier to pinpoint the root cause of an exception when analyzing stack traces.

#### Bad

```js
function once(fn) {
  let ran = false;

  return function () {
    if (ran) return;

    ran = true;
    fn.apply(this, arguments);
  };
}
```

#### Good

```js
function once(fn) {
  let ran = false;

  return function run() {
    if (ran) return;

    ran = true;
    fn.apply(this, arguments);
  };
}
```

---

Avoid keeping indentation levels from raising more than necessary by using guard clauses instead of flowing `if` statements.

#### Bad

```js
if (car) {
  if (black) {
    if (turbine) {
      return "Batman!";
    }
  }
}
```

```js
if (condition) {
  // 10+ lines of code
}
```

#### Good

```js
if (!car) {
  return;
}

if (!black) {
  return;
}

if (!turbine) {
  return;
}

return "Batman!";
```

```js
if (!condition) {
  return;
}
// 10+ lines of code
```



## Prototypes

Hacking native prototypes should be avoided at all costs, use a method instead.

#### Bad

```js
String.prototype.half = function () {
  return this.substr(0, this.length / 2);
};
```

#### Good

```js
function half(text) {
  return text.substr(0, text.length / 2);
}
```

**Avoid prototypical inheritance models** unless you have a very good _performance reason_ to justify yourself.

- Prototypical inheritance boosts puts need for `this` through the roof
- It's way more verbose than using plain objects
- It causes headaches when creating `new` objects
- Needs a closure to hide valuable private state of instances
- Just use plain objects instead



## Object Literals

Instantiate using curly braced notation `{}` and use factories instead of constructors. Here's a proposed pattern for you to implement objects in general.

```js
function util(options) {
  // private methods and state go here
  let foo;

  function add() {
    return foo++;
  }

  function reset() { // note that this method isn't publicly exposed
    foo = options.start || 0;
  }

  reset();

  return {
    // public interface methods go here
    uuid: add
  };
}
```



## Array Literals

Instantiate using the square bracketed notation `[]`. If you have to declare a fixed-dimension array for performance reasons then it's fine to use the `new Array(length)` notation instead.

It's about time you master array manipulation! [Learn about the basics](https://ponyfoo.com/articles/fun-with-native-arrays). It's way easier than you might think.

- [`.forEach`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [`.slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [`.splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- [`.join`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
- [`.concat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
- [`.unshift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
- [`.shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
- [`.push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- [`.pop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

Learn and abuse the functional collection manipulation methods. These are **so** worth the trouble.

- [`.filter`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [`.map`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [`.reduce`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [`.reduceRight`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)
- [`.some`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [`.every`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- [`.sort`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [`.reverse`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)



## Regular Expressions

Keep regular expressions in variables, don't use them inline. This will vastly improve readability.

#### Bad

```js
if (/\d+/.test(text)) {
  console.log("so many numbers!");
}
```

#### Good

```js
const numeric = /\d+/;

if (numeric.test(text)) {
  console.log("so many numbers!");
}
```

Also [learn how to write regular expressions](https://ponyfoo.com/articles/learn-regular-expressions), and what they actually do. Then you can also [visualize them online](https://regexr.com).



## Comments

For code that isn't super obvious, we write comments to explain what it does. The exception to that rule is explaining what a regular expression does.

#### Bad

```js
// create the centered container
const p = $("<p/>");

p.center(div);
p.text("foo");
```

#### Good

```js
const container = $("<p/>");
const contents = "foo";

container.center(parent);
container.text(contents);

megaphone.on("data", value => {
  container.text(value); // the megaphone periodically emits updates for container
});
```

```js
const numeric = /\d+/; // one or more digits somewhere in the string

if (numeric.test(text)) {
  console.log("so many numbers!");
}
```



## Variable Naming

Variables have meaningful names so that we don't have to resort to commenting what a piece of functionality does. We try to be expressive while succinct, and use meaningful variable names.

#### Bad

```js
function a(x, y, z) {
  return z * y / x;
}

a(4, 2, 6);
// <- 3
```

#### Good

```js
function ruleOfThree(had, got, have) {
  return have * got / had;
}

ruleOfThree(4, 2, 6);
// <- 3
```



## Everyday Tricks

We use `||` to define default values. If the left-hand value is [falsy](https://j11y.io/javascript/truthy-falsey) then the right-hand value will be used.

```js
function a(value) {
  const defaultValue = 33;
  const used = value || defaultValue;
}
```
