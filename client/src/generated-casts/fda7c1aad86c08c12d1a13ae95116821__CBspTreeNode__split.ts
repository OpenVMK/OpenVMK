// fda7c1aad86c08c12d1a13ae95116821.cct / CBspTreeNode / split

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function split(_me: LingoMe, a_iAxis: LingoValue, a_yNoFix: LingoValue) {
  if (lingoBinary("neq", _me.children.count, 2)) {
  callMethod("sortChildrenByAxis", _me, a_iAxis)
  var tPickLow = 1;
  var tPickHigh = _me.children.count;
  var tLow = new LingoList([]);
  var tHigh = new LingoList([]);
  while (lingoBinary("lte", tPickLow, tPickHigh)) {
  callMethod("append", tLow, _me.children[tPickLow])
  if (lingoBinary("lt", tPickLow, tPickHigh)) {
  callMethod("append", tHigh, _me.children[tPickHigh])
  }

  tPickLow = lingoBinary("add", tPickLow, 1);
  tPickHigh = lingoBinary("sub", tPickHigh, 1);
  }

  if (callNamed("voidp", a_yNoFix)) {
  return callMethod("fixOverlap", _me, tLow, tHigh, a_iAxis);
  } else {
  if (lingoBinary("eq", a_yNoFix, symbol("DONT_FIX_OVERLAP"))) {
  var tOut = new LingoPropList([symbol("low"), tLow, symbol("high"), tHigh]);
  return tOut;
  }

  }

  } else {
  tOut = new LingoPropList([symbol("low"), new LingoList([meProp(_me, "children")[1]]), symbol("high"), new LingoList([meProp(_me, "children")[2]])]);
  return tOut;
  }

}

