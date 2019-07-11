"use strict";



//  V A R I A B L E S

const regexForIds = /\(#.*\)/g;
const regexForTextBeforeLink = /^.*(?=\()/g;
const regexForUnescaping = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/g;



//  P R O G R A M

function superscript(state, silent) {
  const max = state.posMax;
  const start = state.pos;
  let found;
  let token;

  if (state.src.charCodeAt(start) !== 0x5E/* ^ */)
    return false;

  if (silent)
    return false; // do not run pairs in validation mode

  if (start + 2 >= max)
    return false;

  state.pos = start + 1;

  while(state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x5E/* ^ */) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }

  const content = state.src.slice(start + 1, state.pos);

  // do not allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }

  const supText = content.replace(regexForUnescaping, "$1");

  // found!
  state.posMax = state.pos;
  state.pos = start + 1;

  // Earlier we checked !silent, but this implementation does not need it
  token = state.push("sup_open", "sup", 1);
  token.markup = "^";

  if (content.match(regexForIds)) {
    const theLink = supText.match(regexForIds)[0].replace("(#", "").replace(")", "");
    token.attrPush(["id", theLink]); // eslint-disable-line padding-line-between-statements
  }

  token = state.push("text", "", 0);

  if (content.match(regexForIds)) {
    const theText = supText.match(regexForTextBeforeLink)[0];
    token.content = theText; // eslint-disable-line padding-line-between-statements
  } else token.content = supText;

  token = state.push("sup_close", "sup", -1);
  token.markup = "^";

  state.pos = state.posMax + 1;
  state.posMax = max;

  return true;
}



//  E X P O R T

module.exports = exports = function sup_plugin(md) { // eslint-disable-line camelcase
  md.inline.ruler.after("emphasis", "sup", superscript);
};
