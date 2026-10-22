// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomMouseEventProcessor / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("unregisterMessage", "room_context_removed", callMethod("getID", _this))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rAvatarCtrl")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rElementCtrl")))
  setMeProp(_me, "m_sSelected", "");
  setMeProp(_me, "m_rAvatarCtrl", undefined);
  setMeProp(_me, "m_rElementCtrl", undefined);
  return 1;
}

