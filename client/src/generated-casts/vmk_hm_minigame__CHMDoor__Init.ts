// vmk_hm_minigame.cct / CHMDoor / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, i_sDoorName: LingoValue, a_rObject: LingoValue) {
  if (callNamed("voidp", i_sDoorName)) {
  return 0;
  }

  if ((lingoTruthy(callNamed("objectp", a_rObject)) ? 0 : 1)) {
  return 0;
  }

  setMeProp(_me, "m_sDoorName", i_sDoorName);
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  setMeProp(_me, "m_rObj", a_rObject);
  for (var t_sKey of callMethod("GetFactor", meProp(_me, "m_rObj")).m_ar_sKey.toArray()) {
  var tBlock = callMethod("GetObjByKey", callMethod("GetContext", meProp(_me, "m_rObj")), t_sKey);
  if ((lingoTruthy(callNamed("voidp", tBlock)) ? 0 : 1)) {
  var tSprites = callMethod("GetSprites", callMethod("GetVisual", tBlock));
  if (lingoBinary("neq", tSprites.count, 0)) {
  callMethod("append", meProp(_me, "m_rBlocks"), tBlock)
  callMethod("append", meProp(_me, "m_rSprites"), tSprites[1])
  }

  }

  }

  var tVortexName = lingoBinary("join", "hm_vortex_", meProp(_me, "m_sDoorName").char[meProp(_me, "m_sDoorName").length]);
  var tNode = callMethod("Search", tRoomContext, "NAME", tVortexName);
  if (lingoBinary("neq", tNode, 0)) {
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  if (lingoBinary("neq", tSprite, 0)) {
  setMeProp(_me, "m_rVortex", tSprite);
  }

  }

  setMeProp(_me, "m_iCurrentVortex", 0);
  setMeProp(_me, "m_ar_vortexanimation", new LingoList([]));
  for (var i = 0; i <= 7; ++i) {
  var tmember = callNamed("member", lingoBinary("join", "hm_vortex0", i));
  if (lingoBinary("gt", tmember._number, 0)) {
  callMethod("append", meProp(_me, "m_ar_vortexanimation"), tmember)
  }

  }

}

