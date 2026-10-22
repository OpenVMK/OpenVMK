// 565d7caa66391c8e45a3923725ba051b.cct / CInvItemGrid / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("timeoutExists", meProp(_me, "m_sBlinkTimer"))) {
  callNamed("removeTimeout", meProp(_me, "m_sBlinkTimer"))
  }

  setMeProp(_me, "m_rBufferImg", undefined);
  setMeProp(_me, "m_rImgElement", undefined);
  setMeProp(_me, "m_mp_iRef_rItem", undefined);
  return 1;
}

