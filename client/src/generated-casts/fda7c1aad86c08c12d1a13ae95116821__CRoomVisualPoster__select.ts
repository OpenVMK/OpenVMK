// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualPoster / select

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function select(_me: LingoMe, _this: LingoValue, a_bSel: LingoValue) {
  setMeProp(_me, "m_bSelected", a_bSel);
  if (meProp(_me, "m_bSelected")) {
  callMethod("CreateHighlighters", _this)
  } else {
  callMethod("RemoveHighlighters", _this)
  }

}

