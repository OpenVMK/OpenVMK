// core.old.cct / CWindowScrollbar / sendAdjustOffsetTo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function sendAdjustOffsetTo(_me: LingoMe, tNewOffset: LingoValue) {
  if (lingoBinary("and", lingoBinary("and", lingoBinary("lt", callNamed("abs", lingoBinary("sub", meProp(_me, "pScrollOffset"), tNewOffset)), meProp(_me, "pScrollStep")), lingoBinary("lt", tNewOffset, meProp(_me, "pMaxOffset"))), lingoBinary("gt", tNewOffset, 0))) {
  return 1;
  }

  if (lingoBinary("lte", tNewOffset, meProp(_me, "pMaxOffset"))) {
  setMeProp(_me, "pScrollOffset", tNewOffset);
  } else {
  setMeProp(_me, "pScrollOffset", meProp(_me, "pMaxOffset"));
  }

  if (lingoBinary("lte", tNewOffset, 0)) {
  setMeProp(_me, "pScrollOffset", 0);
  }

  if (lingoBinary("eq", _me.pType, "scrollbarv")) {
  callNamed("call", symbol("setOffsetY"), new LingoList([callMethod("getElement", callNamed("getWindow", _me.pMotherId), meProp(_me, "pClientID"))]), meProp(_me, "pScrollOffset"))
  } else {
  callNamed("call", symbol("setOffsetX"), new LingoList([callMethod("getElement", callNamed("getWindow", _me.pMotherId), meProp(_me, "pClientID"))]), meProp(_me, "pScrollOffset"))
  }

}

