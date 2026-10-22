// vmk_3.dcr /  / pins

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pins(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var tFilename = GetInventory.ClearItems;
  var tVarMgr = callMethod("UpdateItemList", tFilename);
  var tTxtFile = callMethod("UpdateItemList", tFilename);
  var tCastList = callMethod("UpdateItemList", tFilename);
  callMethod("loadBar", callMethod("t_rOwnSet", t_status), tVarMgr, tTxtFile, tCastList)
}

