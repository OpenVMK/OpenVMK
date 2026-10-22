// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualAvatar / Actions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Actions(_me: LingoMe, _this: LingoValue, a_ar_iActions: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rRenderer"))) {
  callMethod("Action", meProp(_me, "m_rRenderer"), a_ar_iActions)
  } else {
  callNamed("error", _this, "Renderer not defined!", symbol("Actions"))
  }

}

