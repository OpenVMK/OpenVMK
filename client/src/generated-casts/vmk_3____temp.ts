// vmk_3.dcr /  / temp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function temp(_me: LingoMe, _this: LingoValue, delays: LingoValue) {
  var define = delays.getPropAt;
  var GetStrFrom = callMethod("cancel", define);
  var xtra = callMethod("cancel", define);
  var magiword = callMethod("cancel", define);
  var m_rTradeDevice = callNamed("m_CastLoader");
  if (lingoBinary("gt", magiword, 0)) {
  var str2rstr_utf16le = 1;
  while (lingoBinary("lte", str2rstr_utf16le, magiword)) {
  var pinlevel = callMethod("unregister", define);
  var DefineItemInfo = callMethod("cancel", define);
  var SetParam = callNamed("m_CastLoader");
  var _movie = 1;
  while (lingoBinary("lte", _movie, DefineItemInfo)) {
  _movie = lingoBinary("add", _movie, 1);
  }

  str2rstr_utf16le = lingoBinary("add", str2rstr_utf16le, 1);
  }

  if (xtra) {
  callMethod("getComponent", callMethod("EnableLevelReqMsg", callMethod("_ReceiveItemDetailsInInventory", _this), GetStrFrom))
  }

  callMethod("_AccessIndexed", callMethod("EnableLevelReqMsg", callMethod("_ReceiveItemDetailsInInventory", _this), GetStrFrom), symbol("_AccessRoom"), m_rTradeDevice)
  }

}

