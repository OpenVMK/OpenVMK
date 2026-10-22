// d0e535313898676eb605277339b50f27.cct / CAvatarVehicle / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_FxSnd_obj"))) {
  callMethod("StopSound", meProp(_me, "m_FxSnd_obj"))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_FxSnd_obj")))
  setMeProp(_me, "m_FxSnd_obj", undefined);
  }

  callNamed("unregisterMessage", symbol("set_FxOff"), callMethod("getID", _this))
  callNamed("unregisterMessage", "room_leave", callMethod("getID", _this))
  callNamed("unregisterMessage", "close_Settings", callMethod("getID", _this))
  return 1;
}

