// vmk_monorail_train_handler.cct / CMonorailTrainInterface / TrainArrive

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TrainArrive(_me: LingoMe) {
  callMethod("setState", meProp(_me, "m_pStarField"), symbol("slowspeed"))
}

