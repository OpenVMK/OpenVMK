// vmk_mystics.cct / CRoomVisualAvatar / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  setThePropOf(_this, "m_rFrame", lingoBinary("add", _this.m_rFrame, 1));
  if (callNamed("objectp", _this.m_rRenderer)) {
  callMethod("update", _this.m_rRenderer, _this.m_rCanvasSpr)
  var t_veScr = callMethod("GetScrPos", callMethod("getObject", _this));
  var t_iFactor = callMethod("GetFactor", callMethod("getObject", _this)).m_iFactor;
  if ((lingoTruthy(callNamed("voidp", t_iFactor)) ? 0 : 1)) {
  setThePropOf(t_veScr, "z", callMethod("get", callMethod("GetFactor", callMethod("getObject", _this)).m_rZTransfer, t_iFactor));
  }

  var t_fXs = t_veScr.x;
  var t_fYs = t_veScr.y;
  var t_fZs = t_veScr.z;
  if (lingoBinary("neq", _this.m_veLastScr, t_veScr)) {
  setThePropOf(_this.m_rShadowSpr, "locH", t_fXs);
  setThePropOf(_this.m_rShadowSpr, "locV", t_fYs);
  setThePropOf(_this.m_rShadowSpr, "locZ", t_fZs);
  setThePropOf(_this.m_rCanvasSpr, "locH", t_fXs);
  setThePropOf(_this.m_rCanvasSpr, "locV", t_fYs);
  setThePropOf(_this.m_rCanvasSpr, "locZ", lingoBinary("add", t_fZs, 1));
  if ((lingoTruthy(callNamed("voidp", _this.m_rCustomSpr)) ? 0 : 1)) {
  setThePropOf(_this.m_rCustomSpr, "locH", t_fXs);
  setThePropOf(_this.m_rCustomSpr, "locV", t_fYs);
  setThePropOf(_this.m_rCustomSpr, "locZ", lingoBinary("add", t_fZs, callMethod("getOffsetZ", _this.m_rCustomRenderer)));
  }

  setMeProp(_me, "m_veLastScr", t_veScr);
  }

  if ((lingoTruthy(callNamed("voidp", _this.m_rCustomRenderer)) ? 0 : 1)) {
  callMethod("update", _this.m_rCustomRenderer)
  }

  } else {
  callNamed("error", _this, "Renderer not defined!", symbol("update"))
  }

}

