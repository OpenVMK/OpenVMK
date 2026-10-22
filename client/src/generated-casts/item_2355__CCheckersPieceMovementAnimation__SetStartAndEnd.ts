// item_2355.cct / CCheckersPieceMovementAnimation / SetStartAndEnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetStartAndEnd(_me: LingoMe, _this: LingoValue, a_vStart: LingoValue, a_vEnd: LingoValue) {
  setMeProp(_me, "m_bMoving", 1);
  setMeProp(_me, "m_fMoveTime", float(0));
  var t_veSource = a_vStart;
  var t_veTarget = a_vEnd;
  var t_veMiddle = lingoBinary("add", lingoBinary("add", t_veSource, lingoBinary("div", lingoBinary("sub", t_veTarget, t_veSource), 2)), callNamed("vector", 0, 0, 20));
  callMethod("clear", meProp(_me, "m_rCurve"))
  callMethod("AddTriple", meProp(_me, "m_rCurve"), t_veSource, t_veMiddle, t_veTarget)
}

