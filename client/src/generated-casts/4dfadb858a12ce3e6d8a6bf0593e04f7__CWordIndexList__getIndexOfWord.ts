// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CWordIndexList / getIndexOfWord

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getIndexOfWord(_me: LingoMe, a_cWord: LingoValue) {
  return callMethod("getPos", meProp(_me, "m_ar_list"), a_cWord);
}

