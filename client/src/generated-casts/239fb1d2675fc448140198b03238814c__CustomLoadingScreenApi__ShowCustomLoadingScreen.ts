// 239fb1d2675fc448140198b03238814c.cct / CustomLoadingScreenApi / ShowCustomLoadingScreen

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowCustomLoadingScreen(_me: LingoMe, a_iID: LingoValue) {
  /* global */ var g_rLoadingScreen = globalVar("g_rLoadingScreen");
  callNamed("RemoveCustomLoadingScreen")
  setGlobal("g_rLoadingScreen", callNamed("createObject", callNamed("getUniqueID"), "CCustomLoadingScreen"));
  return callMethod("Define", globalVar("g_rLoadingScreen"), a_iID);
}

