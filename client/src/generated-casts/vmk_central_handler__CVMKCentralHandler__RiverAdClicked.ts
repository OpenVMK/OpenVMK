// vmk_central_handler.cct / CVMKCentralHandler / RiverAdClicked

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RiverAdClicked(_me: LingoMe) {
  callMethod("send", callNamed("getConnection", "VMK"), 701, new LingoPropList([symbol("int"), 1]))
}

