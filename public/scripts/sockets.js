/* global ws, $ */ "use strict";



ws.onmessage = socket => {
  const data = JSON.parse(socket.data);

  switch (true) {
    case data.message === "updated html":
      $(data.selector).html(data.html);
      break;

    default:
      console.log(data);
      break;
  }
};
