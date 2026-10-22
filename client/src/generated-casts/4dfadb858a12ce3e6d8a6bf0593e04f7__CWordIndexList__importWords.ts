// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CWordIndexList / importWords

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function importWords(_me: LingoMe, i_cMemName: LingoValue) {
  var tt = theProperty("milliSeconds");
  var t_cText = callNamed("member", callNamed("getmemnum", i_cMemName)).text;
  var t_iCount = chunkCount(t_cText, "word");
  for (var i = 1; i <= t_iCount; ++i) {
  callMethod("append", meProp(_me, "m_ar_list"), chunkOf(t_cText, "word", i, 0))
  }

  tt = lingoBinary("sub", theProperty("milliSeconds"), tt);
}

