// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CNPCDialogWindow / setText

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
  meProp(_me, "m_pTexts")[symbol("NPCName")] = callNamed("param", 4);
  }

  callMethod("updateInterface", _me)
}

