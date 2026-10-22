// vmk_3.dcr /  / posters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function posters(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var tPublicKey = callMethod("t_kCat", GetInventory.ClearItems);
  var LOADING = callNamed("pauseUpdate", symbol("getThreadManager"), tPublicKey, symbol("initAll"), symbol("tstate"), symbol("tPrivateKey"), "VMK Administration");
}

