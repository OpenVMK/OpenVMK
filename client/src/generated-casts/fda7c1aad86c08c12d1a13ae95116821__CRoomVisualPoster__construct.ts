// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualPoster / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_ar_rSprites", new LingoList([]));
  setMeProp(_me, "m_rHighLight", new LingoPropList([symbol("member"), undefined, symbol("sprite"), undefined, symbol("topZ"), -float(400000000), symbol("lastDir"), -float(1)]));
  setMeProp(_me, "m_mp_blinkStat", new LingoPropList([symbol("cur"), 0, symbol("min"), 0, symbol("max"), 50, symbol("inc"), 10]));
  setMeProp(_me, "m_bSelected", 0);
  return 1;
}

