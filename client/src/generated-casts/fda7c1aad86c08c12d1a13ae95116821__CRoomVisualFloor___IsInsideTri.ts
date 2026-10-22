// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualFloor / _IsInsideTri

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _IsInsideTri(_me: LingoMe, _this: LingoValue, a_ptTest: LingoValue, a_ptTriA: LingoValue, a_ptTriB: LingoValue, a_ptTriC: LingoValue) {
  var t_ptA = callMethod("_TriArea", _this, a_ptTest, a_ptTriB, a_ptTriC);
  var t_ptB = callMethod("_TriArea", _this, a_ptTest, a_ptTriA, a_ptTriC);
  var t_ptC = callMethod("_TriArea", _this, a_ptTest, a_ptTriA, a_ptTriB);
  var t_ptD = callMethod("_TriArea", _this, a_ptTriA, a_ptTriB, a_ptTriC);
  return (lingoTruthy(lingoBinary("gt", lingoBinary("add", lingoBinary("add", t_ptA, t_ptB), t_ptC), t_ptD)) ? 0 : 1);
}

