// vmk_fireworks_minigame.cct / CFireworksStage / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sName", "");
  setMeProp(_me, "m_iChecksum", 0);
  setMeProp(_me, "m_iMagic", 38342);
  setMeProp(_me, "m_iComboReward", 0);
  return 1;
}

