// core.old.cct / CCastLoadTask / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, tdata: LingoValue) {
  setMeProp(_me, "pGroupId", tdata[symbol("id")]);
  setMeProp(_me, "pStatus", tdata[symbol("status")]);
  setMeProp(_me, "pLoadedSoFar", tdata[symbol("sofar")]);
  setMeProp(_me, "pCastcount", tdata[symbol("casts")].count);
  setMeProp(_me, "pCallBack", tdata[symbol("callback")]);
  setMeProp(_me, "pCurrPercent", tdata[symbol("Percent")]);
  setMeProp(_me, "pTempPercent", 0);
  setMeProp(_me, "pLastPercent", 0);
  setMeProp(_me, "pCurLoadCount", 0);
  setMeProp(_me, "pTmpLoadCount", 0);
  setMeProp(_me, "pCastList", new LingoPropList([]));
  for (var tCast of tdata[symbol("casts")].toArray()) {
  meProp(_me, "pCastList")[tCast] = 0;
  }

  if (lingoBinary("eq", meProp(_me, "pCastList").count, 0)) {
  setMeProp(_me, "pStatus", symbol("ready"));
  }

  return 1;
}

