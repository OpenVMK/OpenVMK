// vmk_hm_minigame.cct / CHMFactorPlayerObject / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rGameEngine", callNamed("getObject", symbol("minigame_component")));
  setMeProp(_me, "m_rAvatar", undefined);
  setMeProp(_me, "m_sName", "");
  setMeProp(_me, "m_bFoundExit", 0);
  setMeProp(_me, "m_bCaughtBySuperGhost", 0);
  return 1;
}

