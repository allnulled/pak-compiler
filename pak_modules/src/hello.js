module.exports = function(user) {
  console.log("Hello " + user);
  console.log(`Here it is: ${ Pak.require("math-addition")(5,10,15) }`)
};