// vmk_monorail_train_handler.cct / CMonorailTrainInterface / GetTrainMusicAllowed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetTrainMusicAllowed(_me: LingoMe) {
  return meProp(_me, "m_bAllowMusic");
}

