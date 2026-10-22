// vmk_monorail_train_handler.cct / COscillatorLCD / SetSeed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetSeed(_me: LingoMe, a_mpSeed: LingoValue) {
  setMeProp(_me, "m_mpSeed", a_mpSeed);
}

