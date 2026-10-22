// core.old.cct / Client Initialization Script / startClient

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function startClient(_me: LingoMe) {
  if (!lingoTruthy(callNamed("CreateObjectManager"))) {
  return 0;
  }

  if (!lingoTruthy(callNamed("dumpVariableField", "System Props"))) {
  return callNamed("stopClient");
  }

  if (!lingoTruthy(callNamed("resetCastLibs", 0, 0))) {
  return callNamed("stopClient");
  }

  if (!lingoTruthy(callMethod("preIndexMembers", callNamed("getResourceManager")))) {
  return callNamed("stopClient");
  }

  if (!lingoTruthy(callNamed("dumpTextField", "System Texts"))) {
  return callNamed("stopClient");
  }

  if (!lingoTruthy(callMethod("create", callNamed("getThreadManager"), symbol("core"), symbol("core")))) {
  return callNamed("stopClient");
  }

  return 1;
}

