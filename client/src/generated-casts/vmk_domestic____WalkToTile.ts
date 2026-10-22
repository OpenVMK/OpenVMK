// vmk_domestic.cct /  / WalkToTile

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function WalkToTile(_me: LingoMe, _this: LingoValue, a_rTile: LingoValue, a_iStack: LingoValue) {
  if (_this.m_bWalking) {
  callMethod("SetToTileStack", _this, _this.m_rTarget, _this.m_iTarget)
  }

  setMeProp(_me, "m_rTarget", a_rTile);
  setMeProp(_me, "m_iTarget", a_iStack);
  setMeProp(_me, "m_iWlkStartTime", theProperty("milliSeconds"));
  setMeProp(_me, "m_bWalking", 1);
  var t_rActual = _this.m_rTarget;
  var t_iActual = 0;
  for (var i = 1; i <= _this.m_iTarget; ++i) {
  if (lingoBinary("gt", callMethod("GetCount", t_rActual), 0)) {
  t_rActual = t_rActual[1];
  t_iActual = lingoBinary("add", t_iActual, 1);
  continue;
  }

  break;
  }

  setMeProp(_me, "m_veSource", callMethod("GetAbsPos", callMethod("getObject", _this)));
  setMeProp(_me, "m_veTarget", lingoBinary("add", callMethod("GetAbsPos", t_rActual), callNamed("vector", 0, 0, callNamed("integer", callMethod("GetParam", t_rActual, "HGT")))));
  var t_veDist = lingoBinary("sub", _this.m_veSource, _this.m_veTarget);
  setMeProp(_me, "m_veDistance", callNamed("vector", callNamed("abs", t_veDist.x), callNamed("abs", t_veDist.y), callNamed("abs", t_veDist.z)));
  if (lingoBinary("eq", _this.m_veSource.x, _this.m_veTarget.x)) {
  if (lingoBinary("eq", _this.m_veSource.y, _this.m_veTarget.y)) {
  callMethod("SetToTileStack", _this, a_rTile, a_iStack)
  return;
  }

  }

  var t_rOverTarget = a_rTile;
  for (var i = 1; i <= a_iStack; ++i) {
  if (lingoBinary("gt", callMethod("GetCount", t_rOverTarget), 0)) {
  t_rOverTarget = t_rOverTarget[1];
  continue;
  }

  break;
  }

  var t_rUnderMe = _this.m_rOldTarget;
  if (callNamed("voidp", t_rUnderMe)) {
  t_rUnderMe = callMethod("GetOwner", callMethod("getObject", _this));
  }

  for (var i = 1; i <= _this.m_iOldStack; ++i) {
  if (lingoBinary("gt", callMethod("GetCount", t_rUnderMe), 0)) {
  t_rUnderMe = t_rUnderMe[1];
  continue;
  }

  break;
  }

  if (lingoBinary("or", (lingoTruthy(callNamed("voidp", callMethod("GetParam", t_rOverTarget, "ZTRANS"))) ? 0 : 1), (lingoTruthy(callNamed("voidp", callMethod("GetParam", t_rUnderMe, "ZTRANS"))) ? 0 : 1))) {
  var t_fZSteepness = callNamed("value", callMethod("GetParam", t_rOverTarget, "ZTRANS"));
  if ((lingoTruthy(callNamed("voidp", callMethod("GetParam", t_rUnderMe, "ZTRANS"))) ? 0 : 1)) {
  if (lingoBinary("gt", callNamed("value", callMethod("GetParam", t_rUnderMe, "ZTRANS")), t_fZSteepness)) {
  t_fZSteepness = callNamed("value", callMethod("GetParam", t_rUnderMe, "ZTRANS"));
  }

  }

  } else {
  t_fZSteepness = float(1);
  }

  var t_veOff = callMethod("GetScrPos", callMethod("GetContext", callMethod("getObject", _this)));
  var t_fX = _this.m_veTarget.x;
  var t_fY = _this.m_veTarget.y;
  var t_fZ = _this.m_veTarget.z;
  var t_fTargetZs = lingoBinary("add", lingoBinary("add", lingoBinary("add", lingoBinary("mul", t_fX, 10), lingoBinary("mul", t_fY, 10)), lingoBinary("mul", t_fZ, 5)), t_veOff.z);
  if (lingoBinary("and", lingoBinary("gte", t_veDist.x, 0), lingoBinary("gte", t_veDist.y, 0))) {
  callMethod("Init", _this.m_rZTransfer, callMethod("GetScrPos", callMethod("getObject", _this)).z, t_fTargetZs, float(1), t_fZSteepness, symbol("late"))
  } else {
  if (lingoBinary("and", lingoBinary("lte", t_veDist.x, 0), lingoBinary("lte", t_veDist.y, 0))) {
  callMethod("Init", _this.m_rZTransfer, callMethod("GetScrPos", callMethod("getObject", _this)).z, t_fTargetZs, float(1), t_fZSteepness, symbol("early"))
  } else {
  callMethod("Init", _this.m_rZTransfer, callMethod("GetScrPos", callMethod("getObject", _this)).z, t_fTargetZs, float(1), float(1), symbol("early"))
  }

  }

}

