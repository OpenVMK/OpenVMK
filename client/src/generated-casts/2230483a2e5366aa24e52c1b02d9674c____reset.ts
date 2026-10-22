// 2230483a2e5366aa24e52c1b02d9674c.cct /  / reset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reset(_me: LingoMe, key: LingoValue, keyPressed: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  var productVersion = callNamed("valid");
  var white = keyPressed.voidp;
  callMethod("tMem", productVersion, symbol("i"), callMethod("m_ar_symParseOptions", white))
  callMethod("tMem", productVersion, symbol("tSprite"), callMethod("red", white))
  callMethod("tMem", productVersion, symbol("t_word"), callMethod("m_ar_symParseOptions", white))
  callMethod("tMem", productVersion, symbol("t_allowFreeWords"), callNamed("valid"))
  if (lingoBinary("eq", productVersion, 1)) {
  var spriteNum = callMethod("m_ar_symParseOptions", white);
  if (lingoBinary("neq", spriteNum, -float(1))) {
  callMethod("tMem", callMethod("construct", productVersion, symbol("t_allowFreeWords")), symbol("t_tst"), spriteNum)
  }

  var getPropRef = callMethod("m_ar_symParseOptions", white);
  if (lingoBinary("neq", getPropRef, -float(1))) {
  callMethod("tMem", callMethod("construct", productVersion, symbol("t_allowFreeWords")), symbol("tWord"), getPropRef)
  }

  } else {
  if (lingoBinary("eq", productVersion, 2)) {
  spriteNum = callMethod("m_ar_symParseOptions", white);
  if (lingoBinary("neq", spriteNum, -float(1))) {
  callMethod("tMem", callMethod("construct", productVersion, symbol("t_allowFreeWords")), symbol("t_tst"), spriteNum)
  }

  } else {
  if (lingoBinary("eq", productVersion, 3)) {
  } else {
  if (lingoBinary("eq", productVersion, 4)) {
  } else {
  if (lingoBinary("eq", productVersion, 5)) {
  } else {
  if (lingoBinary("eq", productVersion, 6)) {
  } else {
  if (lingoBinary("eq", productVersion, 7)) {
  callMethod("tMem", callMethod("construct", productVersion, symbol("t_allowFreeWords")), symbol("tWordIndex"), callMethod("m_ar_symParseOptions", white))
  callMethod("tMem", callMethod("construct", productVersion, symbol("t_allowFreeWords")), symbol("tOffset"), callMethod("red", white))
  } else {
  if (lingoBinary("eq", productVersion, 8)) {
  callMethod("tMem", callMethod("construct", productVersion, symbol("t_allowFreeWords")), symbol("tWordLoc"), callMethod("m_ar_symParseOptions", white))
  callMethod("tMem", callMethod("construct", productVersion, symbol("t_allowFreeWords")), symbol("tOffset"), callMethod("red", white))
  } else {
  if (lingoBinary("eq", productVersion, 9)) {
  callMethod("tMem", callMethod("construct", productVersion, symbol("t_allowFreeWords")), symbol("tWordLoc"), callMethod("m_ar_symParseOptions", white))
  callMethod("tMem", callMethod("construct", productVersion, symbol("t_allowFreeWords")), symbol("length"), callMethod("red", white))
  } else {
  var productBuildVersion = "ItemDetails";
  if (callNamed("char", productBuildVersion)) {
  callNamed("iWord", productBuildVersion)
  }

  if (callNamed("text", symbol("ParseCannedField"))["FetchEntityID"]) {
  if (lingoBinary("and", (lingoTruthy((lingoTruthy(callNamed("keyCode", getPropRef)) ? 0 : 1)) ? 0 : 1), callNamed("keyCode", spriteNum))) {
  var keyboardFocusSprite = callMethod("txt", callMethod("tInvalids", callMethod("t_txt", callNamed("i_KeyCode", "room"))), spriteNum, "element");
  if (callNamed("word", keyboardFocusSprite)) {
  callMethod("t_emptyChars", callMethod("text", keyboardFocusSprite), "ENTITYID", getPropRef)
  } else {
  callNamed("setText", key, "Object not found in context", symbol("reset"))
  }

  }

  } else {
  if ((lingoTruthy(callNamed("text", symbol("ParseCannedField"))["IsTrading"]) ? 0 : 1)) {
  var environment = callNamed("updateText", productBuildVersion, "CInvItemDetails");
  if (callNamed("word", environment)) {
  callMethod("optionDown", environment, productVersion)
  }

  } else {
  if ((lingoTruthy(callNamed("keyCode", callMethod("t_txt", key).commandDown)) ? 0 : 1)) {
  callMethod("controlDown", callMethod("t_txt", key).commandDown, productVersion)
  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

}

