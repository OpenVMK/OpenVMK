// fda7c1aad86c08c12d1a13ae95116821.cct / CBspTreeNode / inside

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function inside(_me: LingoMe, a_ar_coordinate: LingoValue) {
  if (lingoBinary("gt", lingoBinary("mul", a_ar_coordinate.count, 2), meProp(_me, "dimensions").count)) {
  return callNamed("error", _me, "Can't search in more dimensions than the node contains!", symbol("inside"));
  }

  var tInside = 1;
  for (var i = 1; i <= a_ar_coordinate.count; ++i) {
  var tTest = a_ar_coordinate[i];
  var tMin = meProp(_me, "dimensions")[lingoBinary("add", lingoBinary("mul", lingoBinary("sub", i, 1), 2), 1)];
  var tMAX = meProp(_me, "dimensions")[lingoBinary("add", lingoBinary("mul", lingoBinary("sub", i, 1), 2), 2)];
  if (lingoBinary("or", lingoBinary("lt", tTest, tMin), lingoBinary("gt", tTest, tMAX))) {
  tInside = 0;
  }

  }

  return tInside;
}

