"use strict";



//  P A C K A G E

const html = require("choo-async/html");



//  P R O G R A M

const missionStatement = () => {
  return html`
    <div class="component--mission-statement">
      <strong class="component--mission-statement__title">Mission Statement</strong> To create a market for accessing and publishing information<sup>1</sup> that is global<sup>2</sup>, decentralized<sup>3</sup>, robust<sup>4</sup>, optimal<sup>5</sup> and complete<sup>6</sup>.
    </div>
  `;
};



//  E X P O R T

module.exports = exports = missionStatement;
