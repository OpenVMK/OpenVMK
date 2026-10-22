// core.old.cct / Broker Manager API / executeMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function executeMessage(_me: LingoMe, a_sMessage: LingoValue, a_vArgA: LingoValue, a_vArgB: LingoValue, a_vArgC: LingoValue) {
  return callMethod("Execute", callNamed("getBrokerManager"), a_sMessage, a_vArgA, a_vArgB, a_vArgC);
}

