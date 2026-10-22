// vmk_monorail_train_handler.cct / COscillatorLCD / Run

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Run(_me: LingoMe) {
  callNamed("receiveUpdate", callMethod("getID", _me))
  setMeProp(_me, "m_iDelay", 1);
}

