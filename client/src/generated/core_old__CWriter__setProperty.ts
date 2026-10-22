// core.old.cct / CWriter / setProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setProperty(_me: LingoMe, _this: LingoValue, a_kKey: LingoValue, a_vValue: LingoValue) {
  var t_mp_list = new LingoPropList([]);
  callMethod("addProp", t_mp_list, a_kKey, a_vValue)
  callMethod("Define", _this, t_mp_list)
  return 1;
}

