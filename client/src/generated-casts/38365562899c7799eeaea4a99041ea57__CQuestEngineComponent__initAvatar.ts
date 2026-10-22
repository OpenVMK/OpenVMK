// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / initAvatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initAvatar(_me: LingoMe, t_bAgain: LingoValue) {
  var t_rObj = callMethod("_AccessIndexed", callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room"))), callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar"), "avatar");
  if (callNamed("objectp", t_rObj)) {
  var m_rAvatar = callMethod("GetVisual", t_rObj);
  }

}

