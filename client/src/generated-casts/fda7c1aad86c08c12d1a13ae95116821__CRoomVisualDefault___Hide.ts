// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualDefault / _Hide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Hide(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("gt", meProp(_me, "m_rSprite").spriteNum, 0)) {
  setThePropOf(meProp(_me, "m_rSprite"), "visible", 0);
  }

}

