// vmk_hm_minigame.cct / CCollisionEngineControlledTile / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_iActionCounter", 0);
  setMeProp(_me, "m_ar_BoundingObjects", new LingoList([]));
  setMeProp(_me, "m_b_collisionInited", 0);
  setMeProp(_me, "m_rMinigameObject", undefined);
  setMeProp(_me, "m_rAvatarObject", undefined);
  setMeProp(_me, "m_iDirection", 0);
  setMeProp(_me, "m_iMoveDirection", -float(1));
  setMeProp(_me, "m_ar_directions", new LingoList([0, 1, 2, 3, 4, 5, 6, 7]));
  return 1;
}

