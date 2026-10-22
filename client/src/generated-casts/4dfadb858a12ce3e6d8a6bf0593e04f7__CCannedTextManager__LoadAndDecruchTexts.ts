// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / LoadAndDecruchTexts

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadAndDecruchTexts(_me: LingoMe, _this: LingoValue) {
  callNamed("unregisterMessage", lingoBinary("join", "start_process_", meProp(_me, "m_iProcessNumber")), callMethod("getID", _this))
  if (lingoBinary("eq", callNamed("getText", "dict.separators"), 0)) {
  setMeProp(_me, "m_sSeparators", lingoBinary("join", lingoBinary("join", " .,!?:;)(]-", "\x03"), "\r"));
  } else {
  setMeProp(_me, "m_sSeparators", lingoBinary("join", lingoBinary("join", callNamed("getText", "dict.separators"), "\x03"), "\r"));
  }

  setMeProp(_me, "m_netID", callNamed("getNetText", callNamed("getVariableValue", "dictionary_url")));
  callNamed("receiveUpdate", callMethod("getID", _this))
  setMeProp(_me, "m_iTimeElapsed", 0);
  setMeProp(_me, "m_fPercentReady", float(0));
}

