// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMenu / _SelectRoomOwner

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SelectRoomOwner(_me: LingoMe, _this: LingoValue) {
  var t_rName = new LingoList([]);
  callNamed("executeMessage", symbol("roomOwner"), t_rName)
  var t_sName = t_rName[1];
  if (lingoBinary("and", lingoBinary("neq", t_sName, ""), lingoBinary("neq", t_sName, undefined))) {
  var t_rAvatar = callMethod("Search", callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component), "NAME", t_sName);
  if (callNamed("objectp", t_rAvatar)) {
  callMethod("select", callMethod("GetFactor", t_rAvatar))
  }

  }

}

