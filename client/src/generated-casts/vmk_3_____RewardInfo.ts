// vmk_3.dcr /  / _RewardInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RewardInfo(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  callNamed("alert", callMethod("GetStrFrom", a_rMsg))
}

