// core.old.cct / Special Services Class / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "pCatchFlag", 0);
  setMeProp(_me, "pSavedHook", 0);
  setMeProp(_me, "pLastErrStr", "");
  setMeProp(_me, "pToolTipAct", callNamed("getIntVariable", "tooltip.active", 0));
  setMeProp(_me, "pToolTipMem", undefined);
  setMeProp(_me, "pToolTipSpr", undefined);
  setMeProp(_me, "pCurrCursor", 0);
  setMeProp(_me, "pLastCursor", 0);
  setMeProp(_me, "pUniqueSeed", 0);
  setMeProp(_me, "pDecoder", callNamed("createObject", symbol("temp"), callNamed("getClassVariable", "general.decoder.class")));
  callMethod("Setkey", meProp(_me, "pDecoder"), "sulake1Unique2Key3Generator")
  return 1;
}

