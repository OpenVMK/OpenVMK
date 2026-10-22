// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CDictionary / add

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function add(_me: LingoMe, a_ar_words: LingoValue) {
  var tOutput = new LingoList([]);
  if (callMethod("ExpandListToList", meProp(_me, "m_expander"), a_ar_words, tOutput)) {
  callMethod("addWords", meProp(_me, "m_wordIndexList"), tOutput)
  callMethod("AppendWords", meProp(_me, "m_fixedWordTree"), tOutput)
  return 1;
  } else {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "ErrorDialog", 1, 0);
  callMethod("show", t)
  var t_sTxt = "Dictionary resource content was invalid.";
  callMethod("setText", t, t_sTxt, "Error", "OK")
  return 0;
  }

}

