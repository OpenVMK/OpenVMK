// vmk_3.dcr /  / id

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function id(_me: LingoMe, _this: LingoValue, delays: LingoValue) {
  var GetStrFrom = callMethod("cancel", delays.getPropAt);
  var component = callMethod("cancel", delays.getPropAt);
  var t_rInput = callNamed("m_CastLoader");
  var str2rstr_utf16le = 1;
  while (lingoBinary("lte", str2rstr_utf16le, component)) {
  var t_ar_data = callNamed("m_CastLoader");
  callMethod("bit_rol", t_ar_data, symbol("timeout"), callMethod("cancel", delays.getPropAt))
  callMethod("bit_rol", t_rInput, callMethod("str2rstr_utf8", t_ar_data, symbol("t_sObjectID")), t_ar_data)
  str2rstr_utf16le = lingoBinary("add", str2rstr_utf16le, 1);
  }

  callMethod("_Configure", callMethod("EnableLevelReqMsg", callMethod("_ReceiveItemDetailsInInventory", _this), GetStrFrom), symbol("_AccessRoom"), t_rInput)
}

