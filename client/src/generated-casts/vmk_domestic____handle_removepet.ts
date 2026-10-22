// vmk_domestic.cct /  / handle_removepet

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_removepet(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  callMethod("_RemoveIndexed", callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room"))), callMethod("GetIntFrom", tMsg.connection), "domestic")
}

