const first = Pak.require("02. Drivers test/modules/first.js");
const second = Pak.require("02. Drivers test/modules/second.js");
const third = Pak.require("02. Drivers test/modules/third.js");

Pak.assert(first === 1, "First should be 1");
Pak.assert(second === 2, "Second should be 2");
Pak.assert(third === 3, "Third should be 3");

const first2 = Pak.require("drivers-test/first");
const second2 = Pak.require("drivers-test/second");
const third2 = Pak.require("drivers-test/modules/third.js");

Pak.assert(first === first2, "First should be 1 like first2");
Pak.assert(second === second2, "Second should be 2 like second2");
Pak.assert(third === third2, "Third should be 3 like third2");