// d0e535313898676eb605277339b50f27.cct / HMMickeyDetailsListItem / setState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setState(_me: LingoMe, a_bState: LingoValue) {
  if (lingoBinary("or", meProp(_me, "m_bState"), a_bState)) {
  setMeProp(_me, "m_bNeedUpdate", 1);
  } else {
  setMeProp(_me, "m_bNeedUpdate", 0);
  }

  if (callNamed("voidp", a_bState)) {
  setMeProp(_me, "m_bState", (lingoTruthy(meProp(_me, "m_bState")) ? 0 : 1));
  } else {
  setMeProp(_me, "m_bState", a_bState);
  }

  callMethod("ResolveImage", _me)
  return 1;
}

