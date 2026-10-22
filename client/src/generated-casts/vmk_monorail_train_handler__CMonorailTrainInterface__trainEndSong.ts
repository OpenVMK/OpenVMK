// vmk_monorail_train_handler.cct / CMonorailTrainInterface / trainEndSong

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function trainEndSong(_me: LingoMe) {
  callNamed("put", "Train End Song")
  callMethod("stop", meProp(_me, "m_rOscillator"))
  setMeProp(_me, "m_bAllowMusic", 1);
  callMethod("PlayAnim", callMethod("getComponent", callNamed("getThread", symbol("animation"))), meProp(_me, "m_animIDs")[3])
}

