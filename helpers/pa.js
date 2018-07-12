"use strict";



//  P R O G R A M

module.exports = exports = promises => { // via https://gist.github.com/peisenmann/41488a45364974705cd6
  return new Promise(resolve => {
    let retVals = Array(promises.length).fill();
    let states = Array(promises.length).fill();

    const f = i => res => {
      retVals[i] = res;
      states[i] = true;

      if (states.every(s => s)) resolve(retVals);
    };

    promises.forEach((p, i) => {
      Promise.resolve(p).then(f(i), f(i));
    });
  });
};

/***
  // Usage
  allComplete([p1, p2, p3, "not-a-promise"]).then(result => {
    log(result);
  });
**/
