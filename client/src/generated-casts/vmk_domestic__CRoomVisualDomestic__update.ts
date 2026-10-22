// vmk_domestic.cct / CRoomVisualDomestic / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (callNamed("voidp", _this.m_rSprite)) {
  return;
  }

  var t_iCurrentDir = callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "DIR"));
  if (lingoBinary("neq", t_iCurrentDir, _this.m_iLastDir)) {
  setThePropOf(_this, "m_iLastDir", t_iCurrentDir);
  setThePropOf(_this.m_rRenderer, "m_rDirection", t_iCurrentDir);
  setThePropOf(_this.m_rRenderer, "m_bDirty", 1);
  }

  var t_iCurAct = callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "ACT"));
  if (lingoBinary("neq", t_iCurAct, _this.m_iLastAct)) {
  setThePropOf(_this, "m_iLastAct", t_iCurAct);
  setThePropOf(_this.m_rRenderer, "m_iAction", t_iCurAct);
  setThePropOf(_this.m_rRenderer, "m_bDirty", 1);
  setThePropOf(_this, "m_iFrame", 0);
  }

  var t_veAbs = callMethod("GetAbsPos", callMethod("getObject", _this));
  if (lingoBinary("gt", _this.m_rSprite.spriteNum, 0)) {
  if (lingoBinary("neq", _this.m_veLastAbs, t_veAbs)) {
  var t_veScr = callMethod("GetScrPos", callMethod("getObject", _this));
  setThePropOf(_this.m_rSprite, "locH", t_veScr.x);
  setThePropOf(_this.m_rSprite, "locV", t_veScr.y);
  setThePropOf(_this.m_rSprite, "locZ", t_veScr.z);
  setThePropOf(_this, "m_iOriginalPosY", t_veScr.y);
  if (lingoBinary("lt", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 3)) {
  setThePropOf(_this.m_rSprite, "locV", lingoBinary("sub", t_veScr.y, 42));
  }

  }

  }

  if (lingoBinary("eq", callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")), 6)) {
  setThePropOf(_this.m_rSprite, "locV", lingoBinary("sub", lingoBinary("sub", meProp(_me, "m_iOriginalPosY"), 20), callNamed("abs", lingoBinary("mul", callNamed("sin", lingoBinary("mul", _this.m_iFrame, 0.05)), 15))));
  }

  setMeProp(_me, "m_veLastAbs", t_veAbs);
  if ((lingoTruthy(callNamed("voidp", _this.m_rRenderer)) ? 0 : 1)) {
  callMethod("update", _this.m_rRenderer)
  }

  setThePropOf(_this, "m_iFrame", lingoBinary("add", _this.m_iFrame, 1));
}

