// vmk_3.dcr /  / instance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function instance(_me: LingoMe, _this: LingoValue, delays: LingoValue) {
  var GetStrFrom = callMethod("cancel", delays.getPropAt);
  var component = callMethod("cancel", delays.getPropAt);
  var str2rstr_utf16le = 1;
  while (lingoBinary("lte", str2rstr_utf16le, component)) {
  var GetInventory = callMethod("cancel", delays.getPropAt);
  var ClearItems = callMethod("cancel", delays.getPropAt);
  var wornPins = callMethod("unregister", delays.getPropAt);
  var getaProp = callMethod("unregister", delays.getPropAt);
  callMethod("posters", callMethod("EnableLevelReqMsg", callMethod("_ReceiveItemDetailsInInventory", _this), GetStrFrom), symbol("_TradeStatus"), GetInventory, callMethod("EnableLevelReqMsg", callMethod("_ReceiveItemDetailsInInventory", _this), 2), symbol("_TradeStatus"), ClearItems, wornPins, getaProp)
  str2rstr_utf16le = lingoBinary("add", str2rstr_utf16le, 1);
  }

  component = callMethod("cancel", delays.getPropAt);
  str2rstr_utf16le = 1;
  while (lingoBinary("lte", str2rstr_utf16le, component)) {
  GetInventory = callMethod("cancel", delays.getPropAt);
  ClearItems = callMethod("cancel", delays.getPropAt);
  wornPins = callMethod("unregister", delays.getPropAt);
  getaProp = callMethod("unregister", delays.getPropAt);
  callMethod("posters", callMethod("EnableLevelReqMsg", callMethod("_ReceiveItemDetailsInInventory", _this), 2), symbol("_TradeStatus"), GetInventory, callMethod("EnableLevelReqMsg", callMethod("_ReceiveItemDetailsInInventory", _this), GetStrFrom), symbol("_TradeStatus"), ClearItems, wornPins, getaProp)
  str2rstr_utf16le = lingoBinary("add", str2rstr_utf16le, 1);
  }

}

