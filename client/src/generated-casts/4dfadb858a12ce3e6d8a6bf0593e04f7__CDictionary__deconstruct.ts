// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CDictionary / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_expander")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_wordIndexList")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_freeWordTree")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_friendListWordTree")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_ownNameWordTree")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_fixedWordTree")))
  return 1;
}

