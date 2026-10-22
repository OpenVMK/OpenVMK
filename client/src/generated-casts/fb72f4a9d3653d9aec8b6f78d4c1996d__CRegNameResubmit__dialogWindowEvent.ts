// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegNameResubmit / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, _this: LingoValue, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  if (lingoBinary("eq", t_dialogName, "CheckName")) {
  var t_txt = callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.username.input"));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.username.input"), t_txt)
  }

  if (lingoBinary("eq", t_dialogName, "ConfirmAvatarName")) {
  if (lingoBinary("eq", t_dialogEvent, symbol("dialogOK"))) {
  callMethod("_GatherData", _this)
  }

  }

}

