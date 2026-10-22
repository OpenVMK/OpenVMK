// 2230483a2e5366aa24e52c1b02d9674c.cct / CComposeCannedMessage2 / CheckWord

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CheckWord(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", _me.m_sWndTitle);
  if (lingoBinary("neq", tWndObj, 0)) {
  var tElement = callMethod("getElement", tWndObj, _me.m_sClientElement);
  if (lingoBinary("neq", tElement, 0)) {
  var tSprite = callMethod("getProperty", tElement, symbol("sprite"));
  var tMem = tSprite.member;
  var tWordLoc = callMethod("charPosToLoc", tMem, lingoBinary("add", 7, 1));
  var tOffset = tSprite.loc;
  var tWordIndex = callMethod("pointToWord", tSprite, lingoBinary("add", tWordLoc, tOffset));
  if (lingoBinary("neq", tWordIndex, -float(1))) {
  var tWord = tMem.word[tWordIndex];
  tWord = callMethod("removeLastSeparator", _me, tWord);
  var t_tst = callNamed("TestPartialWord", tWord, _me.m_ar_symParseOptions);
  if ((lingoTruthy(t_tst) ? 0 : 1)) {
  setThePropOf(_me, "m_ar_cWords", new LingoList([]));
  for (var i = 1; i <= tMem.word.count; ++i) {
  var t_word = callNamed("propList", symbol("word"), tMem.word[i], symbol("valid"), 1);
  if (lingoBinary("eq", i, tWordIndex)) {
  setThePropOf(t_word, "valid", 0);
  }

  callMethod("append", _me.m_ar_cWords, t_word)
  if (lingoBinary("eq", (lingoTruthy(i) ? 0 : 1), tMem.word.count)) {
  callMethod("append", _me.m_ar_cWords, callNamed("propList", symbol("word"), " ", symbol("valid"), 1))
  }

  }

  setThePropOf(_me, "m_bFlashing", 1);
  }

  return t_tst;
  }

  return 0;
  }

  }

}

