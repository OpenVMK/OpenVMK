// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / parentChain

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parentChain(_me: LingoMe, tMsg: LingoValue) {
  var t_iNodeCount = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_ParentChain = new LingoList([]);
  for (var i = 1; i <= t_iNodeCount; ++i) {
  var t_iID = callMethod("GetIntFrom", tMsg.connection);
  callMethod("add", t_ar_ParentChain, t_iID)
  }

}

