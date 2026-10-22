// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CAffixExpanderAndConditionEvaluator / AddNoChar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddNoChar(_me: LingoMe, i_sChar: LingoValue, i_iOffset: LingoValue) {
  if (lingoBinary("lt", meProp(_me, "m_ar_chars").count, i_iOffset)) {
  meProp(_me, "m_ar_chars")[i_iOffset] = new LingoPropList([]);
  }

  var tMap = meProp(_me, "m_ar_chars")[i_iOffset];
  if (callNamed("voidp", callMethod("getaProp", tMap, symbol("no")))) {
  callMethod("setaProp", meProp(_me, "m_ar_chars")[i_iOffset], symbol("no"), new LingoList([i_sChar]))
  } else {
  callMethod("append", meProp(_me, "m_ar_chars")[i_iOffset].no, i_sChar)
  }

}

