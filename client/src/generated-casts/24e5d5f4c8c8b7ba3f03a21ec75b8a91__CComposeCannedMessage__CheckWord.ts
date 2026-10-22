// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CComposeCannedMessage / CheckWord

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CheckWord(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var tElement = callMethod("getElement", tWndObj, meProp(_me, "m_sClientElement"));
  if (lingoBinary("neq", tElement, 0)) {
  var tSprite = callMethod("getProperty", tElement, symbol("sprite"));
  var tMem = tSprite.member;
  var tWordLoc = callMethod("charPosToLoc", tMem, lingoBinary("add", theProperty("selStart"), 1));
  var tOffset = tSprite.loc;
  var tWordIndex = callMethod("pointToWord", tSprite, lingoBinary("add", tWordLoc, tOffset));
  if (lingoBinary("neq", tWordIndex, -float(1))) {
  var tWord = tMem.word[tWordIndex];
  tWord = callMethod("removeLastSeparator", _me, tWord);
  var t_tst = callNamed("TestPartialWord", tWord, meProp(_me, "m_ar_symParseOptions"));
  if ((lingoTruthy(t_tst) ? 0 : 1)) {
  setMeProp(_me, "m_ar_cWords", new LingoList([]));
  for (var i = 1; i <= tMem.word.count; ++i) {
  var t_word = new LingoPropList([symbol("word"), tMem.word[i], symbol("valid"), 1]);
  if (lingoBinary("eq", i, tWordIndex)) {
  setThePropOf(t_word, "valid", 0);
  }

  callMethod("append", meProp(_me, "m_ar_cWords"), t_word)
  if ((lingoTruthy(lingoBinary("eq", i, tMem.word.count)) ? 0 : 1)) {
  callMethod("append", meProp(_me, "m_ar_cWords"), new LingoPropList([symbol("word"), " ", symbol("valid"), 1]))
  }

  }

  setMeProp(_me, "m_bFlashing", 1);
  }

  return t_tst;
  }

  }

  }

  return 0;
}

