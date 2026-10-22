// core.old.cct / Resource API / registerMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerMember(_me: LingoMe, a_sName: LingoValue, a_iOptionalMemNum: LingoValue) {
  return callMethod("registerMember", callNamed("getResourceManager"), a_sName, a_iOptionalMemNum);
}

