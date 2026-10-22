// fireworks_engine.cct / Hierarchic 3D Pipeline Class / Process

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Process(_me: LingoMe, p_pRootObject: LingoValue) {
  var t_mp_Output = new LingoPropList([]);
  var t_rootMtx = callNamed("new", callNamed("script", "Matrix Class"), 4, 4);
  callMethod("loadIdentity", t_rootMtx)
  callMethod("transformMeAndChildren", p_pRootObject, t_mp_Output, t_rootMtx)
  var t_mp_projected = new LingoPropList([]);
  for (var i = 1; i <= callMethod("count", t_mp_Output); ++i) {
  var t_sObjectName = callMethod("getPropAt", t_mp_Output, i);
  var t_ar_worldCoordinates = t_mp_Output[t_sObjectName];
  var t_ar_projected = new LingoList([]);
  var t_ar_viewSpace = new LingoList([]);
  if (lingoBinary("gt", callMethod("count", t_ar_worldCoordinates), 0)) {
  callMethod("addAt", t_ar_viewSpace, callMethod("count", t_ar_worldCoordinates), 0)
  }

  for (var j = 1; j <= callMethod("count", t_ar_worldCoordinates); ++j) {
  t_ar_viewSpace[j] = callMethod("transformToViewSpace", meProp(_me, "m_pView"), t_ar_worldCoordinates[j]);
  if (callMethod("testClip", meProp(_me, "m_pView"), t_ar_viewSpace[j])) {
  callMethod("append", t_ar_projected, callMethod("transformToProjected", meProp(_me, "m_pView"), t_ar_viewSpace[j]))
  }

  }

  t_mp_projected[t_sObjectName] = t_ar_projected;
  }

  return t_mp_projected;
}

