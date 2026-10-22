// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / Initialize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Initialize(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iProcessNumber", callMethod("QueueProcessTurn", callMethod("GetProcessManager", callNamed("getThread", symbol("main")).component)));
  callNamed("registerMessage", lingoBinary("join", "start_process_", meProp(_me, "m_iProcessNumber")), callMethod("getID", _this), symbol("LoadAndDecruchTexts"))
}

