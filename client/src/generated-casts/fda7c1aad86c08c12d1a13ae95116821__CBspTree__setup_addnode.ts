// fda7c1aad86c08c12d1a13ae95116821.cct / CBspTree / setup_addnode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setup_addnode(_me: LingoMe, a_ar_setup: LingoValue, a_ar_limits: LingoValue, a_pObject: LingoValue) {
  var tNu = callNamed("createObject", symbol("random"), "CBspTreeNode");
  setThePropOf(tNu, "dimensions", a_ar_limits);
  setThePropOf(tNu, "obj", a_pObject);
  setThePropOf(tNu, "isleaf", 1);
  callMethod("append", a_ar_setup, tNu)
  if (lingoBinary("lt", meProp(_me, "m_iAxisMax"), lingoBinary("div", a_ar_limits.count, 2))) {
  setMeProp(_me, "m_iAxisMax", lingoBinary("div", a_ar_limits.count, 2));
  }

}

