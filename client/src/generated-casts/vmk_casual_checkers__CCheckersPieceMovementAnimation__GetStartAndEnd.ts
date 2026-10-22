// vmk_casual_checkers.cct / CCheckersPieceMovementAnimation / GetStartAndEnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetStartAndEnd(_me: LingoMe, _this: LingoValue, a_vStart: LingoValue, a_vEnd: LingoValue) {
  var t_vStart = callMethod("GetPointAt", meProp(_me, "m_rCurve"), float(0));
  setThePropOf(a_vStart, "x", t_vStart.x);
  setThePropOf(a_vStart, "y", t_vStart.y);
  setThePropOf(a_vStart, "z", t_vStart.z);
  var t_vEnd = callMethod("GetPointAt", meProp(_me, "m_rCurve"), float(1));
  setThePropOf(a_vEnd, "x", t_vEnd.x);
  setThePropOf(a_vEnd, "y", t_vEnd.y);
  setThePropOf(a_vEnd, "z", t_vEnd.z);
}

