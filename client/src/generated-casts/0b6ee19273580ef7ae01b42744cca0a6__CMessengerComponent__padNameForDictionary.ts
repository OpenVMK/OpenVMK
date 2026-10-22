// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / padNameForDictionary

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function padNameForDictionary(_me: LingoMe, t_sName: LingoValue, o_ar_WordList: LingoValue) {
  if (callNamed("stringp", t_sName)) {
  callMethod("append", o_ar_WordList, t_sName)
  callMethod("append", o_ar_WordList, lingoBinary("join", t_sName, "s"))
  callMethod("append", o_ar_WordList, lingoBinary("join", t_sName, "'s"))
  var tNum = callNamed("charToNum", t_sName.char[1]);
  if (lingoBinary("and", lingoBinary("gte", tNum, 65), lingoBinary("lte", tNum, 90))) {
  callMethod("append", o_ar_WordList, callMethod("FirstCharToLower", _me, t_sName))
  callMethod("append", o_ar_WordList, callMethod("FirstCharToLower", _me, lingoBinary("join", t_sName, "s")))
  callMethod("append", o_ar_WordList, callMethod("FirstCharToLower", _me, lingoBinary("join", t_sName, "'s")))
  } else {
  callMethod("append", o_ar_WordList, callMethod("FirstCharToUpper", _me, t_sName))
  callMethod("append", o_ar_WordList, callMethod("FirstCharToUpper", _me, lingoBinary("join", t_sName, "s")))
  callMethod("append", o_ar_WordList, callMethod("FirstCharToUpper", _me, lingoBinary("join", t_sName, "'s")))
  }

  callMethod("append", o_ar_WordList, callNamed("convertToLowerCase", t_sName))
  callMethod("append", o_ar_WordList, lingoBinary("join", callNamed("convertToLowerCase", t_sName), "s"))
  callMethod("append", o_ar_WordList, lingoBinary("join", callNamed("convertToLowerCase", t_sName), "'s"))
  }

}

