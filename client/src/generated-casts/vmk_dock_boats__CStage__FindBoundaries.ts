// vmk_dock_boats.cct / CStage / FindBoundaries

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FindBoundaries(_me: LingoMe) {
  if (lingoBinary("eq", callMethod("getDirection", _me), "up")) {
  setMeProp(_me, "m_ar_leftboundary", callMethod("FindBoundary", _me, meProp(_me, "m_splines")[2], symbol("right")));
  setMeProp(_me, "m_ar_rightboundary", callMethod("FindBoundary", _me, meProp(_me, "m_splines")[3], symbol("left")));
  } else {
  setMeProp(_me, "m_ar_leftboundary", callMethod("FindBoundary", _me, meProp(_me, "m_splines")[3], symbol("right")));
  setMeProp(_me, "m_ar_rightboundary", callMethod("FindBoundary", _me, meProp(_me, "m_splines")[2], symbol("left")));
  }

}

