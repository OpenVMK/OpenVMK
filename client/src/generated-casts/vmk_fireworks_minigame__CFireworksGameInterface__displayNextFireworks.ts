// vmk_fireworks_minigame.cct / CFireworksGameInterface / displayNextFireworks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function displayNextFireworks(_me: LingoMe, a_iFireworksLeft: LingoValue) {
  var t_ar_level = callMethod("GetLevel", callMethod("GetStage", callMethod("getComponent", _me)));
  if (lingoBinary("gt", a_iFireworksLeft, 0)) {
  var t_iFirst = lingoBinary("add", lingoBinary("sub", t_ar_level.count, a_iFireworksLeft), 1);
  var t_iNext = lingoBinary("add", lingoBinary("sub", t_ar_level.count, a_iFireworksLeft), 2);
  if (lingoBinary("lte", t_iFirst, t_ar_level.count)) {
  var t_iType = t_ar_level[t_iFirst][symbol("type")];
  var t_rMember1 = callNamed("member", lingoBinary("join", lingoBinary("join", "fw.type", t_iType), ".next"));
  } else {
  t_rMember1 = callNamed("member", "null");
  }

  if (lingoBinary("lte", t_iNext, t_ar_level.count)) {
  t_iType = t_ar_level[t_iNext][symbol("type")];
  var t_rMember2 = callNamed("member", lingoBinary("join", lingoBinary("join", "fw.type", t_iType), ".next"));
  } else {
  t_rMember2 = callNamed("member", "null");
  }

  callMethod("changeImageInElement", _me, meProp(_me, "m_fireWorkSelector"), "fw.incoming.1", t_rMember1)
  callMethod("changeImageInElement", _me, meProp(_me, "m_fireWorkSelector"), "fw.incoming.2", t_rMember2)
  }

}

