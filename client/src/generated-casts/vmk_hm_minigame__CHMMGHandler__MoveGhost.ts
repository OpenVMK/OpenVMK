// vmk_hm_minigame.cct / CHMMGHandler / MoveGhost

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MoveGhost(_me: LingoMe, i_iGhost: LingoValue, i_iX: LingoValue, i_iY: LingoValue, i_iZ: LingoValue, i_iDirection: LingoValue, i_iMood: LingoValue) {
  var tGhostObj = callMethod("GetMGObject", meProp(_me, "m_rGameEngine"), i_iGhost);
  if ((lingoTruthy(callNamed("voidp", tGhostObj)) ? 0 : 1)) {
  callMethod("SetMoveTarget", callMethod("GetFactor", tGhostObj), callNamed("intvector", i_iX, i_iY, i_iZ), i_iDirection, i_iMood)
  }

}

