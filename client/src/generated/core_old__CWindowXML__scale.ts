// core.old.cct / CWindowXML / scale

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function scale(_me: LingoMe, _this: LingoValue, a_bScaleH: LingoValue, a_bScaleV: LingoValue) {
  if (callNamed("voidp", a_bScaleV)) {
  a_bScaleH = 1;
  }

  if (lingoBinary("and", lingoBinary("or", lingoBinary("eq", a_bScaleH, 1), lingoBinary("eq", a_bScaleV, 1)), lingoBinary("or", lingoBinary("eq", meProp(_me, "pScaleFlagH"), 0), lingoBinary("eq", meProp(_me, "pScaleFlagV"), 0)))) {
  setMeProp(_me, "pScaleOffset", theProperty("mouseLoc"));
  callNamed("receivePrepare", callMethod("getID", _this))
  setMeProp(_me, "pScaleFlagH", a_bScaleH);
  setMeProp(_me, "pScaleFlagV", a_bScaleV);
  } else {
  if (lingoBinary("and", lingoBinary("and", lingoBinary("eq", a_bScaleH, 0), lingoBinary("eq", a_bScaleV, 0)), lingoBinary("or", lingoBinary("eq", meProp(_me, "pScaleFlagH"), 1), lingoBinary("eq", meProp(_me, "pScaleFlagV"), 1)))) {
  callNamed("removePrepare", callMethod("getID", _this))
  setMeProp(_me, "pScaleFlagH", a_bScaleH);
  setMeProp(_me, "pScaleFlagV", a_bScaleV);
  }

  }

  return 1;
}

