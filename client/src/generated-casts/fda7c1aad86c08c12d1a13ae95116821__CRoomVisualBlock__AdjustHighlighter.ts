// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualBlock / AdjustHighlighter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AdjustHighlighter(_me: LingoMe, _this: LingoValue, a_iBlend: LingoValue, a_kInk: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", a_iBlend)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "blend", a_iBlend);
  }

  if ((lingoTruthy(callNamed("voidp", a_kInk)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "ink", a_kInk);
  }

}

