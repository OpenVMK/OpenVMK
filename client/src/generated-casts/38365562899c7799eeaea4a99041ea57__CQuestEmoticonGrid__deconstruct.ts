// 38365562899c7799eeaea4a99041ea57.cct / CQuestEmoticonGrid / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rBufferImg", undefined);
  setMeProp(_me, "m_rImgElement", undefined);
  setMeProp(_me, "m_mp_iRef_rItem", undefined);
  return 1;
}

