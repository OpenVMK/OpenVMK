// vmk_monorail_station_handler.cct / CAnimateMonorail / leaveStationFast

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function leaveStationFast(_me: LingoMe) {
  setMeProp(_me, "pOffset", callNamed("point", 0, 0));
  setMeProp(_me, "pIndex", 1);
  setMeProp(_me, "pCurrentAnimation", meProp(_me, "pLeaveStationAnimationFast").pCurvePoints);
  setMeProp(_me, "pAnimating", 1);
}

