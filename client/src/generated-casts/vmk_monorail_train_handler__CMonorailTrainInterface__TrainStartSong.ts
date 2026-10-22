// vmk_monorail_train_handler.cct / CMonorailTrainInterface / TrainStartSong

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TrainStartSong(_me: LingoMe) {
  callNamed("put", "Train Start Song")
  callMethod("StopAnim", callMethod("getComponent", callNamed("getThread", symbol("animation"))), meProp(_me, "m_animIDs")[3])
  callMethod("Run", meProp(_me, "m_rOscillator"))
  if (callNamed("objectp", meProp(_me, "m_pTrainMusic"))) {
  callMethod("StopSound", meProp(_me, "m_pTrainMusic"))
  }

  if (callNamed("objectp", meProp(_me, "m_rSndFX"))) {
  callMethod("StopSound", meProp(_me, "m_rSndFX"))
  }

  setMeProp(_me, "m_bAllowMusic", 0);
}

