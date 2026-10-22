// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorAvatar / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bWalking")) {
  var t_iFactor = lingoBinary("div", callNamed("float", lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "m_iWlkStartTime"))), meProp(_me, "m_iStatusDelay"));
  if (lingoBinary("gt", t_iFactor, float(1))) {
  t_iFactor = float(1);
  }

  setMeProp(_me, "m_iFactor", t_iFactor);
  var t_rObj = callMethod("getObject", _this);
  var t_bWarp = 0;
  var t_rActual = meProp(_me, "m_rTarget");
  for (var i = 1; i <= meProp(_me, "m_iTarget"); ++i) {
  if (lingoBinary("gt", callMethod("GetCount", t_rActual), 0)) {
  t_rActual = t_rActual[1];
  continue;
  }

  break;
  }

  var t_veOffset = lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_veTarget"), meProp(_me, "m_veSource")), t_iFactor);
  var t_veCurrent = lingoBinary("add", meProp(_me, "m_veSource"), t_veOffset);
  callMethod("SetAbsPos", t_rObj, t_veCurrent)
  if (lingoBinary("eq", meProp(_me, "m_veTarget"), t_veCurrent)) {
  t_bWarp = 1;
  } else {
  if (lingoBinary("lt", lingoBinary("sub", meProp(_me, "m_veDistance").x, callNamed("abs", t_veOffset.x)), 1)) {
  if (lingoBinary("lt", lingoBinary("sub", meProp(_me, "m_veDistance").y, callNamed("abs", t_veOffset.y)), 1)) {
  if (lingoBinary("lt", lingoBinary("sub", meProp(_me, "m_veDistance").z, callNamed("abs", t_veOffset.z)), 1)) {
  t_bWarp = 1;
  }

  }

  }

  }

  if (t_bWarp) {
  callMethod("SetToTileStack", _this, meProp(_me, "m_rTarget"), meProp(_me, "m_iTarget"))
  }

  } else {
  setMeProp(_me, "m_iFactor", undefined);
  }

}

