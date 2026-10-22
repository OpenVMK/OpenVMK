// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationInterface / AlertNameRejection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AlertNameRejection(_me: LingoMe, _this: LingoValue, a_iReason: LingoValue, a_sInfo: LingoValue) {
  var t_wnd = callNamed("createDialogWindow", callMethod("getID", _this), "NameNotAccepted", 1, 1);
  callMethod("show", t_wnd)
  var t_sMsg = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", callNamed("getText", "reg.name.not.accepted"), "\r"), callNamed("getText", lingoBinary("join", "reg.name.rejection.", a_iReason))), "\r"), a_sInfo);
  callMethod("setText", t_wnd, t_sMsg, "Error", "OK")
}

