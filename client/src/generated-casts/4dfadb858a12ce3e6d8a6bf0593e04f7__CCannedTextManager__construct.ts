// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_dictionary", undefined);
  setMeProp(_me, "m_ar_freeWords", new LingoList([]));
  setMeProp(_me, "m_ar_friendWords", new LingoList([]));
  setMeProp(_me, "m_ar_ownWords", new LingoList([]));
  setMeProp(_me, "m_iExpandOffset", 1);
  setMeProp(_me, "m_ar_rawList", new LingoList([]));
  setMeProp(_me, "m_bDecrunched", 0);
  setMeProp(_me, "m_bGotRaw", 0);
  callNamed("registerMessage", symbol("Initialize"), callMethod("getID", _me), symbol("Initialize"))
  return 1;
}

