// vmk_domestic.cct /  / getMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getMember(_me: LingoMe, getComponent: LingoValue) {
  callNamed("t_fY", "select(this)")
  callMethod("t_rColor", callNamed("GetStrFrom", symbol("loc")), "CLICKPET", new LingoPropList([symbol("t_veLoc"), callNamed("GetCount", callMethod("GetStrFrom", getComponent)["REF"])]))
  callNamed("getThread", 1)
}

