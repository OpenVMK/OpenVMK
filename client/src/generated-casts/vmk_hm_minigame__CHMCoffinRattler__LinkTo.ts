// vmk_hm_minigame.cct / CHMCoffinRattler / LinkTo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LinkTo(_me: LingoMe, a_rObject: LingoValue, a_rTile: LingoValue) {
  setMeProp(_me, "m_rObj", a_rObject);
  for (var t_sKey of callMethod("GetFactor", meProp(_me, "m_rObj")).m_ar_sKey.toArray()) {
  var tBlock = callMethod("GetObjByKey", callMethod("GetContext", meProp(_me, "m_rObj")), t_sKey);
  if ((lingoTruthy(callNamed("voidp", tBlock)) ? 0 : 1)) {
  var tSprites = callMethod("GetSprites", callMethod("GetVisual", tBlock));
  if (lingoBinary("neq", tSprites.count, 0)) {
  callMethod("append", meProp(_me, "m_rBlocks"), tBlock)
  callMethod("append", meProp(_me, "m_rSprites"), tSprites[1])
  }

  }

  }

}

