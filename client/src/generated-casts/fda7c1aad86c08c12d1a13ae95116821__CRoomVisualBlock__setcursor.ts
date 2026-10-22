// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualBlock / setcursor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setcursor(_me: LingoMe, _this: LingoValue, a_voCursor: LingoValue, a_ar_rSpritesToApply: LingoValue) {
  for (var t_iSpr of a_ar_rSpritesToApply.toArray()) {
  if (lingoBinary("lte", t_iSpr, meProp(_me, "m_ar_rSprites").count)) {
  setThePropOf(meProp(_me, "m_ar_rSprites")[t_iSpr], "cursor", a_voCursor);
  continue;
  }

  break;
  }

}

