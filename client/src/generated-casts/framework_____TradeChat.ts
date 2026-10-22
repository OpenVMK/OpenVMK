// framework.dcr /  / _TradeChat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TradeChat(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var t_iTypeCode = callMethod("pinlevel", ref.entityID);
  var t_rGroup = callMethod("pinlevel", ref.entityID);
  var safe_add = 1;
  while (lingoBinary("lte", safe_add, t_rGroup)) {
  var setText = callMethod("pinlevel", ref.entityID);
  var replaceChunks = callMethod("pinlevel", ref.entityID);
  var t_iPrc = callMethod("removeObject", ref.entityID);
  var createDialogWindow = callMethod("removeObject", ref.entityID);
  callMethod("getInterface", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), t_iTypeCode), symbol("UpdateItemList"), setText, callMethod("t_sItemGroup", callMethod("t_iRef", objectp), 2), symbol("UpdateItemList"), replaceChunks, t_iPrc, createDialogWindow)
  safe_add = lingoBinary("add", safe_add, 1);
  }

  t_rGroup = callMethod("pinlevel", ref.entityID);
  safe_add = 1;
  while (lingoBinary("lte", safe_add, t_rGroup)) {
  setText = callMethod("pinlevel", ref.entityID);
  replaceChunks = callMethod("pinlevel", ref.entityID);
  t_iPrc = callMethod("removeObject", ref.entityID);
  createDialogWindow = callMethod("removeObject", ref.entityID);
  callMethod("getInterface", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), 2), symbol("UpdateItemList"), setText, callMethod("t_sItemGroup", callMethod("t_iRef", objectp), t_iTypeCode), symbol("UpdateItemList"), replaceChunks, t_iPrc, createDialogWindow)
  safe_add = lingoBinary("add", safe_add, 1);
  }

}

