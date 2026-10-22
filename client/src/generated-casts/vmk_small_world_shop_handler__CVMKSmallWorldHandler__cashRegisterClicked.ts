// vmk_small_world_shop_handler.cct / CVMKSmallWorldHandler / cashRegisterClicked

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function cashRegisterClicked(_me: LingoMe) {
  callMethod("send", callNamed("getConnection", "VMK"), 701, new LingoPropList([symbol("int"), 0]))
}

