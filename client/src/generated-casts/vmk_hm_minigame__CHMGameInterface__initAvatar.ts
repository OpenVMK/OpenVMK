// vmk_hm_minigame.cct / CHMGameInterface / initAvatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initAvatar(_me: LingoMe, t_bAgain: LingoValue) {
  setMeProp(_me, "m_rAvatar", undefined);
  var t_rMyPlayer = callMethod("GetMyAvatar", _me);
  if (callNamed("objectp", t_rMyPlayer)) {
  var t_rObj = callMethod("_AccessIndexed", callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room"))), callMethod("GetParam", t_rMyPlayer, "Owner"), "avatar");
  if (callNamed("objectp", t_rObj)) {
  setMeProp(_me, "m_rAvatar", callMethod("GetVisual", t_rObj));
  }

  }

}

