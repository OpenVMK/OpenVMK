// 3f02613936ba018480acffaf92dd883a.cct / CVMKAnimationManager / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  setMeProp(_me, "m_bRoomReady", 0);
  callNamed("unregisterMessage", symbol("changeAnimationState"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me))
  callNamed("removeUpdate", callMethod("getID", _me))
  callMethod("deleteAll", meProp(_me, "m_ar_rAnimations"))
  return 1;
}

