// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualElement / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bSelected", 0);
  setMeProp(_me, "m_bLoaded", 0);
  if (lingoBinary("or", meProp(_me, "m_bSelected"), meProp(_me, "m_bCustomHighlighters"))) {
  callMethod("RemoveHighlighters", _this)
  }

  setMeProp(_me, "m_ar_loadAnimation", undefined);
  return 1;
}

