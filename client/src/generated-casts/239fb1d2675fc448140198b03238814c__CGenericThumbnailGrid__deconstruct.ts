// 239fb1d2675fc448140198b03238814c.cct / CGenericThumbnailGrid / deconstruct

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
  setMeProp(_me, "m_iSlotCount", 0);
  setMeProp(_me, "m_ar_rLinkedGrids", new LingoList([]));
  return 1;
}

