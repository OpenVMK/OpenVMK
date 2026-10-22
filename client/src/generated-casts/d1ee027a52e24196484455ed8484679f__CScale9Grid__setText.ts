// d1ee027a52e24196484455ed8484679f.cct / CScale9Grid / setText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setText(_me: LingoMe, t_sTxt: LingoValue) {
  if (callNamed("voidp", t_sTxt)) {
  setMeProp(_me, "m_sTxt", "");
  } else {
  setMeProp(_me, "m_sTxt", t_sTxt);
  }

  setMeProp(_me, "m_bNeedUpdate", 1);
}

