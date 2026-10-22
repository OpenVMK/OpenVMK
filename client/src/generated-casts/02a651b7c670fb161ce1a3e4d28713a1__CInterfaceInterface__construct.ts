// 02a651b7c670fb161ce1a3e4d28713a1.cct / CInterfaceInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_pMessageBar", callNamed("createObject", "message bar", "CMessageBar"));
  setMeProp(_me, "m_rPopulusTest", callNamed("createObject", "popula", "CRoomPopulus"));
  callNamed("registerMessage", symbol("ui_show"), callMethod("getID", _this), symbol("ShowInterface"))
  callNamed("registerMessage", symbol("ui_hide"), callMethod("getID", _this), symbol("HideInterface"))
  return 1;
}

