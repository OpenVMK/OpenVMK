// vmk_text_scroller.cct / CTextScroller / setSpeed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setSpeed(_me: LingoMe, t_fps: LingoValue) {
  setMeProp(_me, "m_iSpeed", lingoBinary("div", 1000, t_fps));
}

