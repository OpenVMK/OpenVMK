// vmk_casual.cct / CCasualGameManager / RemoveDialogs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveDialogs(_me: LingoMe, _this: LingoValue) {
  for (var t_rDialog of meProp(_me, "m_mp_sType_rDialog").toArray()) {
  callNamed("removeDialogWindow", callMethod("getID", t_rDialog))
  }

  setMeProp(_me, "m_mp_sType_rDialog", new LingoPropList([]));
}

