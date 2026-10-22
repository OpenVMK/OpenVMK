// vmk_monorail_train_handler.cct / CMonorailTrainHandler / NextMonorailStop

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NextMonorailStop(_me: LingoMe, a_rMsg: LingoValue) {
  var t_stop = callMethod("GetIntFrom", a_rMsg.connection);
  setMeProp(_me, "m_currentStop", meProp(_me, "m_mp_PossibleStops")[callNamed("string", t_stop)]);
}

