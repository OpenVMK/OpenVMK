// vmk_monorail_train_handler.cct / CMonorailTrainInterface / leaveRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function leaveRoom(_me: LingoMe) {
  callMethod("StopSound", meProp(_me, "m_rSndFX"))
}

