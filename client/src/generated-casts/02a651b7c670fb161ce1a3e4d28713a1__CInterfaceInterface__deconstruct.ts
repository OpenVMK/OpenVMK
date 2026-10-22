// 02a651b7c670fb161ce1a3e4d28713a1.cct / CInterfaceInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_pMessageBar")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rPopulusTest")))
  callNamed("unregisterMessage", symbol("ui_show"), callMethod("getID", _this))
  callNamed("unregisterMessage", symbol("ui_hide"), callMethod("getID", _this))
  return 1;
}

