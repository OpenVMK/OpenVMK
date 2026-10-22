// vmk_monorail_train_handler.cct / COscillatorLCD / setNode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setNode(_me: LingoMe, a_rNode: LingoValue) {
  setMeProp(_me, "m_rNode", a_rNode);
}

