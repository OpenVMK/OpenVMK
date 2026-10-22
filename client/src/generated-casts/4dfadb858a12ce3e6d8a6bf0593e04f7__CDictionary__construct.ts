// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CDictionary / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_fixedWordTree", callNamed("createObject", "DictionaryCharacterTree", "CWordTree"));
  setMeProp(_me, "m_freeWordTree", callNamed("createObject", "FreeWordCharacterTree", "CWordTree"));
  setMeProp(_me, "m_friendListWordTree", callNamed("createObject", "FriendListCharacterTree", "CWordTree"));
  setMeProp(_me, "m_ownNameWordTree", callNamed("createObject", "OwnNameCharacterTree", "CWordTree"));
  setMeProp(_me, "m_wordIndexList", callNamed("createObject", "DictionaryWordList", "CWordIndexList"));
  setMeProp(_me, "m_expander", callNamed("createObject", "AffixExpander", "CAffixExpanderAndConditionEvaluator"));
  return 1;
}

