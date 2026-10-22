// vmk_3.dcr /  / getThread

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getThread(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var t_s_Title = callMethod("UpdateItemList", GetInventory.ClearItems);
  callNamed("sprite", t_status, "Unimplemented method!", symbol("getThread"))
  var stringp = 1;
  while (lingoBinary("lte", stringp, t_s_Title)) {
  var dialogOK = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_mp_sGroup_rDetails = callMethod("UpdateItemList", GetInventory.ClearItems);
  stringp = lingoBinary("add", stringp, 1);
  }

}

