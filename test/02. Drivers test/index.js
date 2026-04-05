const first = Pak.require("test/02. Drivers test/modules/first.js");
const second = Pak.require("test/02. Drivers test/modules/second.js");
const third = Pak.require("test/02. Drivers test/modules/third.js");

Pak.assert(first === 1, "First should be 1");
Pak.assert(second === 2, "Second should be 2");
Pak.assert(third === 3, "Third should be 3");