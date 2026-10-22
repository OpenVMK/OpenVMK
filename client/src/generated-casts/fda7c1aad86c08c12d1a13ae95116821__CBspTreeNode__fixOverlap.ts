// fda7c1aad86c08c12d1a13ae95116821.cct / CBspTreeNode / fixOverlap

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function fixOverlap(_me: LingoMe, a_ar_low: LingoValue, a_ar_high: LingoValue, a_iAxis: LingoValue) {
  if (lingoBinary("and", lingoBinary("gt", a_ar_low.count, 0), lingoBinary("gt", a_ar_high.count, 0))) {
  var tNuLow = new LingoList([]);
  var tNuHigh = new LingoList([]);
  if (lingoBinary("gt", a_ar_low.count, a_ar_high.count)) {
  var tHighDimensions = callNamed("getMaxDimensions", a_ar_high, lingoBinary("div", _me.dimensions.count, 2));
  for (var tNode of a_ar_low.toArray()) {
  if (lingoBinary("lt", tHighDimensions[lingoBinary("add", lingoBinary("mul", lingoBinary("sub", a_iAxis, 1), 2), 1)], tNode.dimensions[lingoBinary("add", lingoBinary("mul", lingoBinary("sub", a_iAxis, 1), 2), 2)])) {
  callMethod("append", tNuHigh, tNode)
  continue;
  }

  callMethod("append", tNuLow, tNode)
  }

  for (var tNode of a_ar_high.toArray()) {
  callMethod("append", tNuHigh, tNode)
  }

  } else {
  var tLowDimensions = callNamed("getMaxDimensions", a_ar_low, lingoBinary("div", _me.dimensions.count, 2));
  for (var tNode of a_ar_high.toArray()) {
  if (lingoBinary("gt", tLowDimensions[lingoBinary("add", lingoBinary("mul", lingoBinary("sub", a_iAxis, 1), 2), 2)], tNode.dimensions[lingoBinary("add", lingoBinary("mul", lingoBinary("sub", a_iAxis, 1), 2), 1)])) {
  callMethod("append", tNuLow, tNode)
  continue;
  }

  callMethod("append", tNuHigh, tNode)
  }

  for (var tNode of a_ar_low.toArray()) {
  callMethod("append", tNuLow, tNode)
  }

  }

  var tOut = new LingoPropList([symbol("low"), tNuLow, symbol("high"), tNuHigh]);
  return tOut;
  } else {
  tOut = new LingoPropList([symbol("low"), a_ar_low, symbol("high"), a_ar_high]);
  return tOut;
  }

}

