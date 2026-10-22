// 565d7caa66391c8e45a3923725ba051b.cct / CInvItemGrid / SelectByItemRef

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SelectByItemRef(_me: LingoMe, _this: LingoValue, a_iRef: LingoValue) {
  for (var i = 1; i <= meProp(_me, "m_mp_iRef_rItem").count; ++i) {
  if (lingoBinary("eq", a_iRef, meProp(_me, "m_mp_iRef_rItem")[i].ref)) {
  callMethod("select", _this, i)
  break;
  }

  }

}

