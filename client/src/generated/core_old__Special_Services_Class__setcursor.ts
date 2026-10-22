// core.old.cct / Special Services Class / setcursor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setcursor(_me: LingoMe, ttype: LingoValue) {
  switch (ttype) {
case undefined:
  ttype = 0;
  break;
case symbol("arrow"):
  ttype = 0;
  break;
case symbol("ibeam"):
  ttype = 1;
  break;
case symbol("crosshair"):
  ttype = 2;
  break;
case symbol("crossbar"):
  ttype = 3;
  break;
case symbol("timer"):
  ttype = 4;
  break;
case symbol("previous"):
  ttype = meProp(_me, "pLastCursor");
  break;
  }

  callNamed("cursor", ttype)
  setMeProp(_me, "pLastCursor", meProp(_me, "pCurrCursor"));
  setMeProp(_me, "pCurrCursor", ttype);
  return 1;
}

