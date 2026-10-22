// vmk_fireworks.cct / CFireworksGameComponent / StageStart

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StageStart(_me: LingoMe, i_iTime: LingoValue) {
  setMeProp(_me, "m_bScoreSent", 0);
  setMeProp(_me, "m_ar_hitList", new LingoList([]));
  callMethod("switchState", _me, symbol("nextlevel"))
  setMeProp(_me, "m_iBonus", float(1));
  callMethod("StageStart", callMethod("getInterface", _me))
  if (lingoBinary("eq", meProp(_me, "m_iCurrentLevel"), 0)) {
  callMethod("updateScores", callMethod("getInterface", _me), new LingoList([]))
  }

  callMethod("remainingFireWorkCount", callMethod("getInterface", _me), lingoBinary("sub", callMethod("GetLevel", meProp(_me, "m_stage")).count, meProp(_me, "m_iShotCount")))
}

