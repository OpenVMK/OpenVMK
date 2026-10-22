// core.old.cct / CDownload / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, tMemName: LingoValue, tdata: LingoValue) {
  setMeProp(_me, "pStatus", symbol("initializing"));
  setMeProp(_me, "pMemName", tMemName);
  setMeProp(_me, "pMemNum", tdata[symbol("memNum")]);
  setMeProp(_me, "pURL", tdata[symbol("url")]);
  setMeProp(_me, "pType", tdata[symbol("type")]);
  setMeProp(_me, "pCallBack", tdata[symbol("callback")]);
  setMeProp(_me, "pPercent", float(0));
  return callMethod("Activate", _me);
}

