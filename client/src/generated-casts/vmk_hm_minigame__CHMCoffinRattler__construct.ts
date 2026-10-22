// vmk_hm_minigame.cct / CHMCoffinRattler / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rObj", undefined);
  setMeProp(_me, "m_rBlocks", new LingoList([]));
  setMeProp(_me, "m_rSprites", new LingoList([]));
  setMeProp(_me, "m_iCounter", 0);
  setMeProp(_me, "m_iOpenState", 0);
  setMeProp(_me, "m_iState", symbol("normal"));
  callNamed("receiveUpdate", callMethod("getID", _me))
  return 1;
}

