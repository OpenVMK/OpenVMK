// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualPoster / SetBlend

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetBlend(_me: LingoMe, _this: LingoValue, a_iBlend: LingoValue) {
  for (var t_rSprite of meProp(_me, "m_ar_rSprites").toArray()) {
  setThePropOf(t_rSprite, "blend", a_iBlend);
  }

}

