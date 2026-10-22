// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatPinThumbnailGrid / RenderShadow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RenderShadow(_me: LingoMe, a_sText: LingoValue) {
  var tWriter = callNamed("getWriter", meProp(_me, "m_sWriter2Id"));
  return callMethod("render", tWriter, a_sText);
}

