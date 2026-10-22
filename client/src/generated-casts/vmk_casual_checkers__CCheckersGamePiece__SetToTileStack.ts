// vmk_casual_checkers.cct / CCheckersGamePiece / SetToTileStack

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetToTileStack(_me: LingoMe, _this: LingoValue, a_rTile: LingoValue, a_iStack: LingoValue) {
  if (meProp(_me, "m_bInitialized")) {
  var t_mp_SndObj = new LingoPropList([symbol("obj"), undefined]);
  callNamed("executeMessage", "PlayFxSound", "checkers-movepiece", 1, t_mp_SndObj)
  setMeProp(_me, "m_sndObj", t_mp_SndObj.obj);
  setMeProp(_me, "m_bMoving", 1);
  setMeProp(_me, "m_fMoveTime", float(0));
  var t_veSource = callMethod("GetAbsPos", callMethod("getObject", _this));
  var t_veTarget = callMethod("GetAbsPos", a_rTile);
  var t_veMiddle = lingoBinary("add", lingoBinary("add", t_veSource, lingoBinary("div", lingoBinary("sub", t_veTarget, t_veSource), 2)), callNamed("vector", 0, 0, 20));
  callMethod("clear", meProp(_me, "m_rCurve"))
  callMethod("AddTriple", meProp(_me, "m_rCurve"), t_veSource, t_veMiddle, t_veTarget)
  }

  return callNamed("callAncestor", symbol("SetToTileStack"), _this, a_rTile, a_iStack);
}

