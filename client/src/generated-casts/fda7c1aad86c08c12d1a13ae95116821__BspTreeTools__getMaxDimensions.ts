// fda7c1aad86c08c12d1a13ae95116821.cct / BspTreeTools / getMaxDimensions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getMaxDimensions(_me: LingoMe, a_ar_nodes: LingoValue, a_iAxisMax: LingoValue) {
  var tDimMax = new LingoList([]);
  var tDimMin = new LingoList([]);
  for (var i = 1; i <= a_iAxisMax; ++i) {
  callMethod("append", tDimMax, -float(float(1000000000)))
  callMethod("append", tDimMin, float(1000000000))
  }

  for (var tNode of a_ar_nodes.toArray()) {
  for (var a = 1; a <= a_iAxisMax; ++a) {
  var tMin = tNode.dimensions[lingoBinary("add", lingoBinary("mul", lingoBinary("sub", a, 1), 2), 1)];
  var tMAX = tNode.dimensions[lingoBinary("add", lingoBinary("mul", lingoBinary("sub", a, 1), 2), 2)];
  if (lingoBinary("lt", tMin, tDimMin[a])) {
  tDimMin[a] = tMin;
  }

  if (lingoBinary("gt", tMAX, tDimMax[a])) {
  tDimMax[a] = tMAX;
  }

  }

  }

  var tOut = new LingoList([]);
  for (var a = 1; a <= a_iAxisMax; ++a) {
  callMethod("append", tOut, tDimMin[a])
  callMethod("append", tOut, tDimMax[a])
  }

  return tOut;
}

