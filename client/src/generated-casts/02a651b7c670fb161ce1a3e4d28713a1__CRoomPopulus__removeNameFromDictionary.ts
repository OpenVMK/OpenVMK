// 02a651b7c670fb161ce1a3e4d28713a1.cct / CRoomPopulus / removeNameFromDictionary

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeNameFromDictionary(_me: LingoMe, t_sName: LingoValue, o_ar_WordList: LingoValue) {
  callMethod("deleteOne", o_ar_WordList, t_sName)
  callMethod("deleteOne", o_ar_WordList, lingoBinary("join", t_sName, "s"))
  callMethod("deleteOne", o_ar_WordList, lingoBinary("join", t_sName, "'s"))
  var tNum = callNamed("charToNum", t_sName.char[1]);
  if (lingoBinary("and", lingoBinary("gte", tNum, 65), lingoBinary("lte", tNum, 90))) {
  callMethod("deleteOne", o_ar_WordList, callMethod("FirstCharToLower", _me, t_sName))
  callMethod("deleteOne", o_ar_WordList, callMethod("FirstCharToLower", _me, lingoBinary("join", t_sName, "s")))
  callMethod("deleteOne", o_ar_WordList, callMethod("FirstCharToLower", _me, lingoBinary("join", t_sName, "'s")))
  } else {
  callMethod("deleteOne", o_ar_WordList, callMethod("FirstCharToUpper", _me, t_sName))
  callMethod("deleteOne", o_ar_WordList, callMethod("FirstCharToUpper", _me, lingoBinary("join", t_sName, "s")))
  callMethod("deleteOne", o_ar_WordList, callMethod("FirstCharToUpper", _me, lingoBinary("join", t_sName, "'s")))
  }

  callMethod("deleteOne", o_ar_WordList, callNamed("convertToLowerCase", t_sName))
  callMethod("deleteOne", o_ar_WordList, lingoBinary("join", callNamed("convertToLowerCase", t_sName), "s"))
  callMethod("deleteOne", o_ar_WordList, lingoBinary("join", callNamed("convertToLowerCase", t_sName), "'s"))
}

