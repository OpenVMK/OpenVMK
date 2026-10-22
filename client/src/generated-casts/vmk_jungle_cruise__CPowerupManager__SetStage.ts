// vmk_jungle_cruise.cct / CPowerupManager / SetStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetStage(_me: LingoMe, i_rStage: LingoValue) {
  setMeProp(_me, "m_stage", i_rStage);
}

