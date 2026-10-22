// core.old.cct / CEventBroker / setcursor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setcursor(_me: LingoMe, _this: LingoValue, ttype: LingoValue) {
  if (callNamed("symbolp", ttype)) {
  switch (ttype) {
case symbol("arrow"):
  ttype = -float(1);
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
  }

  } else {
  if (callNamed("stringp", ttype)) {
  ttype = new LingoList([callNamed("getmemnum", ttype), callNamed("getmemnum", lingoBinary("join", ttype, ".mask"))]);
  } else {
  if (callNamed("listp", ttype)) {
  ttype = new LingoList([callNamed("getmemnum", ttype[1]), callNamed("getmemnum", ttype[2])]);
  } else {
  if (callNamed("voidp", ttype)) {
  ttype = 0;
  }

  }

  }

  }

  setThePropOf(meProp(_me, "pSprite"), "cursor", ttype);
  return 1;
}

