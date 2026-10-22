// fda7c1aad86c08c12d1a13ae95116821.cct / RoomMath / _TriArea

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TriArea(_me: LingoMe, a_ptA: LingoValue, a_ptB: LingoValue, a_ptC: LingoValue) {
  var t_iA = lingoBinary("sub", a_ptA.locH, a_ptC.locH);
  var t_iB = lingoBinary("sub", a_ptA.locV, a_ptC.locV);
  var t_iC = lingoBinary("sub", a_ptB.locH, a_ptC.locH);
  var t_ID = lingoBinary("sub", a_ptB.locV, a_ptC.locV);
  return lingoBinary("mul", 0.5, callNamed("abs", lingoBinary("sub", lingoBinary("mul", t_iA, t_ID), lingoBinary("mul", t_iB, t_iC))));
}

