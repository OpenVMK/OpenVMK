// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatPinThumbnailGrid / SelectByItemRef

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SelectByItemRef(_me: LingoMe, _this: LingoValue, a_iRef: LingoValue) {
  for (var i = 1; i <= _this.m_mp_iRef_rItem.count; ++i) {
  if (lingoBinary("eq", a_iRef, _this.m_mp_iRef_rItem[i].ref)) {
  callMethod("select", _this, i)
  break;
  }

  }

}

