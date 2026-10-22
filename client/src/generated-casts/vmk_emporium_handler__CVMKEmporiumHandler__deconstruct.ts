// vmk_emporium_handler.cct / CVMKEmporiumHandler / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  var t_sID = callNamed("getVariable", "main.connection.id", "VMK");
  var t_rList = new LingoPropList([]);
  callMethod("setaProp", t_rList, 2702, symbol("openCatalogPage"))
  callNamed("unregisterListener", t_sID, callMethod("getID", _me), t_rList)
  return 1;
}

