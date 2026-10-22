// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatPinThumbnailGrid / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_mp_iRef_rItem", new LingoList([]));
  if (callNamed("writerExists", meProp(_me, "m_sWriterID"))) {
  callNamed("removeWriter", meProp(_me, "m_sWriterID"))
  }

  if (callNamed("writerExists", meProp(_me, "m_sWriter2Id"))) {
  callNamed("removeWriter", meProp(_me, "m_sWriter2Id"))
  }

  return 1;
}

