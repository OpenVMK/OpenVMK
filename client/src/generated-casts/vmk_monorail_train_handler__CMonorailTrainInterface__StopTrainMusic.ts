// vmk_monorail_train_handler.cct / CMonorailTrainInterface / StopTrainMusic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopTrainMusic(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_pTrainMusic"))) {
  callMethod("StopSound", meProp(_me, "m_pTrainMusic"))
  callNamed("removeObject", meProp(_me, "m_pTrainMusic"))
  setMeProp(_me, "m_pTrainMusic", undefined);
  }

}

