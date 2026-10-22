// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorToolInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  var m_mp_MessageIDList = new LingoPropList([]);
  callNamed("removeObject", "ModMessage")
  callNamed("removeObject", "ModAKB")
  callNamed("removeObject", "ModMenu")
  callNamed("unregisterMessage", "room_avatar_selection", callMethod("getID", _this))
  callNamed("unregisterMessage", "OpenModerationMenu", callMethod("getID", _this))
  callNamed("unregisterMessage", "show_mod_window", callMethod("getID", _this))
  return 1;
}

