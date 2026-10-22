// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualPoster / setcursor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setcursor(_me: LingoMe, _this: LingoValue, a_voCursor: LingoValue, a_ar_spritesToApply: LingoValue) {
  for (var iSpr of a_ar_spritesToApply.toArray()) {
  setThePropOf(meProp(_me, "m_ar_rSprites")[iSpr], "cursor", a_voCursor);
  }

}

