// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualPoster / AdjustHighlighters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AdjustHighlighters(_me: LingoMe, _this: LingoValue, a_blend: LingoValue, a_ink: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", a_blend)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "blend", a_blend);
  }

  if ((lingoTruthy(callNamed("voidp", a_ink)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "ink", a_ink);
  }

}

