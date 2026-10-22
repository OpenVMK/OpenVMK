// vmk_monorail_station_handler.cct / CAnimateMonorail / approachStation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function approachStation(_me: LingoMe) {
  setMeProp(_me, "pIndex", 1);
  setMeProp(_me, "pCurrentAnimation", meProp(_me, "pArriveAtStationAnimation").pCurvePoints);
  var tX = meProp(_me, "pCurrentAnimation").x[meProp(_me, "pCurrentAnimation").vertexCount];
  var tY = meProp(_me, "pCurrentAnimation").y[meProp(_me, "pCurrentAnimation").vertexCount];
  setMeProp(_me, "pOffset", callNamed("point", tX, tY));
  setMeProp(_me, "pAnimating", 1);
}

