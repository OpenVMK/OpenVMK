// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / SetFreeWordList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetFreeWordList(_me: LingoMe, a_ar_words: LingoValue) {
  setMeProp(_me, "m_ar_freeWords", callMethod("duplicate", a_ar_words));
  callMethod("ClearWords", callMethod("GetFreeWordTree", meProp(_me, "m_dictionary")))
  callMethod("AppendWords", callMethod("GetFreeWordTree", meProp(_me, "m_dictionary")), a_ar_words)
}

