// vmk_domestic.cct / CRoomFactorDomestic / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (_this.m_bWalking) {
  if (lingoBinary("neq", callMethod("GetVisual", callMethod("getObject", _this)).m_rRenderer.m_rAction, "wlk")) {
  callMethod("setAction", callMethod("GetVisual", callMethod("getObject", _this)).m_rRenderer, "wlk")
  setThePropOf(callMethod("GetVisual", callMethod("getObject", _this)).m_rRenderer, "m_bDirty", 1);
  }

  var t_iFactor = lingoBinary("div", callNamed("float", lingoBinary("sub", theProperty("milliSeconds"), _this.m_iWlkStartTime)), _this.m_iStatusDelay);
  if (lingoBinary("gt", t_iFactor, float(1))) {
  t_iFactor = float(1);
  }

  setMeProp(_me, "m_iFactor", t_iFactor);
  var t_rObj = callMethod("getObject", _this);
  var t_bWarp = 0;
  var t_rActual = _this.m_rTarget;
  for (var i = 1; i <= _this.m_iTarget; ++i) {
  if (lingoBinary("gt", callMethod("GetCount", t_rActual), 0)) {
  t_rActual = t_rActual[1];
  continue;
  }

  break;
  }

  var t_veOffset = lingoBinary("mul", lingoBinary("sub", _this.m_veTarget, _this.m_veSource), t_iFactor);
  var t_veCurrent = lingoBinary("add", _this.m_veSource, t_veOffset);
  callMethod("SetAbsPos", t_rObj, t_veCurrent)
  if (lingoBinary("eq", _this.m_veTarget, t_veCurrent)) {
  t_bWarp = 1;
  } else {
  if (lingoBinary("lt", lingoBinary("sub", _this.m_veDistance.x, callNamed("abs", t_veOffset.x)), 1)) {
  if (lingoBinary("lt", lingoBinary("sub", _this.m_veDistance.y, callNamed("abs", t_veOffset.y)), 1)) {
  if (lingoBinary("lt", lingoBinary("sub", _this.m_veDistance.z, callNamed("abs", t_veOffset.z)), 1)) {
  t_bWarp = 1;
  }

  }

  }

  }

  if (t_bWarp) {
  callMethod("SetToTileStack", _this, _this.m_rTarget, _this.m_iTarget)
  }

  } else {
  if (lingoBinary("and", lingoBinary("neq", callMethod("GetVisual", callMethod("getObject", _this)).m_rRenderer.m_rAction, "std"), lingoBinary("eq", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "ACT")), 0))) {
  callMethod("setAction", callMethod("GetVisual", callMethod("getObject", _this)).m_rRenderer, "std")
  setThePropOf(callMethod("GetVisual", callMethod("getObject", _this)).m_rRenderer, "m_bDirty", 1);
  } else {
  if (lingoBinary("and", lingoBinary("eq", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 13), lingoBinary("eq", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "ACT")), 2))) {
  callMethod("setAction", callMethod("GetVisual", callMethod("getObject", _this)).m_rRenderer, "pck")
  setThePropOf(callMethod("GetVisual", callMethod("getObject", _this)).m_rRenderer, "m_bDirty", 1);
  }

  }

  setMeProp(_me, "m_iFactor", undefined);
  }

}

