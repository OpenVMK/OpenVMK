// vmk_monorail_station_handler.cct / CAnimateMonorail / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "pIndex", 1);
  setMeProp(_me, "pLeaveStationAnimation", callMethod("new", callNamed("script", "CBezierAnimator"), 2600, 206.7, 200));
  setThePropOf(meProp(_me, "pLeaveStationAnimation"), "p2", callNamed("point", -float(10), 0));
  setThePropOf(meProp(_me, "pLeaveStationAnimation"), "p3", callNamed("point", 0, 0));
  callMethod("createCurvePoints", meProp(_me, "pLeaveStationAnimation"))
  setMeProp(_me, "pLeaveStationAnimationFast", callMethod("new", callNamed("script", "CBezierAnimator"), 2600, 206.7, 100));
  setThePropOf(meProp(_me, "pLeaveStationAnimationFast"), "p2", callNamed("point", -float(10), 0));
  setThePropOf(meProp(_me, "pLeaveStationAnimationFast"), "p3", callNamed("point", 0, 0));
  callMethod("createCurvePoints", meProp(_me, "pLeaveStationAnimationFast"))
  setMeProp(_me, "pArriveAtStationAnimation", callMethod("new", callNamed("script", "CBezierAnimator"), 1000, 206.7, 100));
  setThePropOf(meProp(_me, "pArriveAtStationAnimation"), "p2", callNamed("point", 1000, 0));
  setThePropOf(meProp(_me, "pArriveAtStationAnimation"), "p3", callNamed("point", 1000, 0));
  callMethod("createCurvePoints", meProp(_me, "pArriveAtStationAnimation"))
  setMeProp(_me, "mAnimationMembers", new LingoList([]));
  setMeProp(_me, "pAnimating", 0);
  setMeProp(_me, "pCurrentAnimation", new LingoPropList([]));
  callNamed("receiveUpdate", callMethod("getID", _me))
  setMeProp(_me, "pOffset", callNamed("point", 0, 0));
  return 1;
}

