module.exports = function(...args) {
  let out = 0;
  for(let index=0; index<args.length; index++) {
    const arg = args[index];
    out += arg;
  }
  return out;
}