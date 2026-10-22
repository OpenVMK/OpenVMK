// fda7c1aad86c08c12d1a13ae95116821.cct / CBspTree / Search

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Search(_me: LingoMe, a_ar_coordinate: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_pRoot"))) ? 0 : 1)) {
  if ((lingoTruthy(callMethod("inside", meProp(_me, "m_pRoot"), a_ar_coordinate)) ? 0 : 1)) {
  return undefined;
  }

  var tSNod = meProp(_me, "m_pRoot");
  while ((lingoTruthy(tSNod.isleaf) ? 0 : 1)) {
  var tIsInside = 0;
  for (var tChild of tSNod.children.toArray()) {
  if (callMethod("inside", tChild, a_ar_coordinate)) {
  tIsInside = 1;
  tSNod = tChild;
  break;
  }

  }

  if ((lingoTruthy(tIsInside) ? 0 : 1)) {
  break;
  }

  }

  return tSNod.obj;
  }

  return undefined;
}

