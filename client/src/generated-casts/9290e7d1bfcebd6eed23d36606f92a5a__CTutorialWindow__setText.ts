// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CTutorialWindow / setText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setText(_me: LingoMe) {
  setMeProp(_me, "m_pTexts", new LingoPropList([]));
  if (lingoBinary("gt", theProperty("paramCount"), 1)) {
  meProp(_me, "m_pTexts")[symbol("desc")] = callNamed("param", 2);
  }

  if (lingoBinary("gt", theProperty("paramCount"), 2)) {
  meProp(_me, "m_pTexts")[symbol("title")] = callNamed("param", 3);
  }

  if (lingoBinary("gt", theProperty("paramCount"), 3)) {
  setMeProp(_me, "m_bShowMore", callNamed("param", 4));
  }

  if (lingoBinary("gt", theProperty("paramCount"), 4)) {
  setMeProp(_me, "m_sHelpLink", callNamed("param", 5));
  }

  callMethod("updateInterface", _me)
}

