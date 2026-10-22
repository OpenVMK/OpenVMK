// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualElement / select

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function select(_me: LingoMe, _this: LingoValue, a_bSelect: LingoValue) {
  setMeProp(_me, "m_bSelected", a_bSelect);
  if ((lingoTruthy(meProp(_me, "m_bSelected")) ? 0 : 1)) {
  if ((lingoTruthy(meProp(_me, "m_bCustomHighlighters")) ? 0 : 1)) {
  callMethod("RemoveHighlighters", _this)
  }

  } else {
  if ((lingoTruthy(meProp(_me, "m_bCustomHighlighters")) ? 0 : 1)) {
  callMethod("CreateHighlighters", _this)
  }

  }

}

