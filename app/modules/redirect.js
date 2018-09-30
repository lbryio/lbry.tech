export default (url, code = 301) => {
  console.log(code + ": " + url);
  throw "fix this please, needs to redirect to:" + url;
}
