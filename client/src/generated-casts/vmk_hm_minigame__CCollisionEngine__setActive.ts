// vmk_hm_minigame.cct / CCollisionEngine / setActive

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setActive(_me: LingoMe, t_bEngineIsActive: LingoValue) {
  callMethod("update", _me)
  callNamed("removeTimeout", "HMGCollisionEngineUpdate")
  callNamed("createTimeout", "HMGCollisionEngineUpdate", meProp(_me, "m_iStatusDelay"), symbol("update"), callMethod("getID", _me), undefined, 0)
  if (t_bEngineIsActive) {
  } else {
  }

}

