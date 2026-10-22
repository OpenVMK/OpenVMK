// vmk_hm_minigame.cct / CHMFactorSuperGhost / SyncGameParameters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SyncGameParameters(_me: LingoMe) {
  var t_params = new LingoList([]);
  t_params[1] = meProp(_me, "m_iMoveDelay");
  callMethod("SetParam", callMethod("getObject", _me), "GameParams", t_params)
}

