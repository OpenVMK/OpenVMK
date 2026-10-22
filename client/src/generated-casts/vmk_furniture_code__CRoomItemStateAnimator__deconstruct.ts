// vmk_furniture_code.cct / CRoomItemStateAnimator / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callMethod("StopSound", _me)
  setMeProp(_me, "m_rStructure", undefined);
  setMeProp(_me, "m_ar_frames", new LingoList([]));
  setMeProp(_me, "m_bReady", 0);
  if (callNamed("objectp", meProp(_me, "m_rSoundSettingsListener"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rSoundSettingsListener")))
  setMeProp(_me, "m_rSoundSettingsListener", undefined);
  }

  return callNamed("callAncestor", symbol("deconstruct"), _me);
}

