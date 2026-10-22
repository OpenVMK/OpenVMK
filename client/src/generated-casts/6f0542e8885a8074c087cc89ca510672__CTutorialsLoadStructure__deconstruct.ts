// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialsLoadStructure / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_rTypeMapXML", undefined);
  setMeProp(_me, "m_rNullObjDesc", undefined);
  return 1;
}

