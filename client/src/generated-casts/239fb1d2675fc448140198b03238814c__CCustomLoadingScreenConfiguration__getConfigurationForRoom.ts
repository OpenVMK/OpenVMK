// 239fb1d2675fc448140198b03238814c.cct / CCustomLoadingScreenConfiguration / getConfigurationForRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getConfigurationForRoom(_me: LingoMe, _this: LingoValue, a_iID: LingoValue) {
  if (callNamed("variableExists", lingoBinary("join", "room.", a_iID))) {
  var t_sDataID = callNamed("getVariable", lingoBinary("join", "room.", a_iID));
  return callNamed("getVariableValue", lingoBinary("join", "ls.", t_sDataID));
  } else {
  return;
  }

}

