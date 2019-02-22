"use strict"; /* global document, fetch, history, send, window */



document.getElementById("get-started").onclick = event => {
  event.preventDefault();

  send({
    message: "auth me with github"
  });
};

if (window.location.search.includes("?code=")) {
  document.querySelector("developer-program").innerHTML = `
    <form onsubmit="return false;">
      <input-submit>
        <input id="walletAddress" placeholder="Your LBRY wallet address" type="text"/>
        <input id="oauthCode" type="hidden" value="${window.location.search.split("?code=").pop()}"/>
        <button id="creditsAcquire" title="Get LBRY credits" type="button">Get credits</button>
      </input-submit>
    </form>

    <h4>Need An Address?</h4>
    <p>To receive your LBC, you'll need a wallet address. While graphical wallets are available, the recommended path for engineers is to:</p>

    <ol>
      <li>Download <a href="https://github.com/lbryio/lbry/releases">the LBRY SDK</a>.</li>
      <li>Launch the command-line utility (<code>./lbrynet start</code>).</li>
      <li>Run <code>./lbrynet address list</code> and copy the <code>id</code> field.</li>
    </ol>
  `;

  history.replaceState({}, "", window.location.pathname); // clean up URL bar
}

if (document.getElementById("creditsAcquire")) {
  document.getElementById("walletAddress").addEventListener("keyup", event => {
    const key = event.keyCode ? event.keyCode : event.which;

    if (key === 13)
      document.getElementById("creditsAcquire").click();
  });

  document.getElementById("creditsAcquire").onclick = () => {
    send({
      address: document.getElementById("walletAddress").value,
      code: document.getElementById("oauthCode").value,
      message: "verify github token"
    });

    document.querySelector("developer-program").innerHTML = "<p><em>Awaiting response from LBRY server...</em></p>";
  };
}

function syncWithApi(data) { // eslint-disable-line no-unused-vars
  const address = data.address;
  const code = data.code;

  if (code === null)
    document.querySelector("developer-program").innerHTML =
      "<p><strong>There was an issue with accessing GitHub's API. Please try again later.</strong></p>";

  fetch(`https://api.lbry.io/reward/new?github_token=${code}&reward_type=github_developer&wallet_address=${address}`)
    .then(response => response.json())
    .then(result => {
      switch(true) {
        case !result.success:
        case result.error === "this reward is limited to 1 per person":
          document.querySelector("developer-program").innerHTML =
            "<p>You have already claimed this reward. This reward is limited to <strong>ONE</strong> per person. Your enthusiasm is appreciated.</p>";
          break;

        case result.success:
          result = result.data;
          document.querySelector("developer-program").innerHTML =
            `<p><strong>Success!</strong> Your wallet has been credited with ${result.reward_amount} LBC.</p><p>We have a great reference for the <a href="/api/sdk">LBRY SDK here</a> to help you get started.</p><p>You can see proof of this transaction on <a href="https://explorer.lbry.io/tx/${result.transaction_id}">our Blockain Explorer</a>.</p>`;
          break;

        default:
          console.log(data); // eslint-disable-line no-console
          break;
      }
    })
    .catch(() => {
      // Idk what the error would be (probably a 500) so let's just have this message
      document.querySelector("developer-program").innerHTML =
        "<p><strong>LBRY API is down. Please try again later.</strong></p>";
    });
}
