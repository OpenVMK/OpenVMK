// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualAvatar / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rRenderer"))) {
  callMethod("update", meProp(_me, "m_rRenderer"), meProp(_me, "m_rCanvasSpr"))
  var t_veScr = callMethod("GetScrPos", callMethod("getObject", _this));
  var t_iFactor = callMethod("GetFactor", callMethod("getObject", _this)).m_iFactor;
  if ((lingoTruthy(callNamed("voidp", t_iFactor)) ? 0 : 1)) {
  setThePropOf(t_veScr, "z", callMethod("get", callMethod("GetFactor", callMethod("getObject", _this)).m_rZTransfer, t_iFactor));
  }

  if (lingoBinary("neq", meProp(_me, "m_veLastScr"), t_veScr)) {
  var t_fXs = t_veScr.x;
  var t_fYs = t_veScr.y;
  var t_fZs = t_veScr.z;
  setThePropOf(meProp(_me, "m_rShadowSpr"), "locH", t_fXs);
  setThePropOf(meProp(_me, "m_rShadowSpr"), "locV", t_fYs);
  setThePropOf(meProp(_me, "m_rShadowSpr"), "locZ", t_fZs);
  setThePropOf(meProp(_me, "m_rCanvasSpr"), "locH", t_fXs);
  setThePropOf(meProp(_me, "m_rCanvasSpr"), "locV", t_fYs);
  setThePropOf(meProp(_me, "m_rCanvasSpr"), "locZ", lingoBinary("add", t_fZs, 1));
  setMeProp(_me, "m_veLastScr", t_veScr);
  }

  } else {
  callNamed("error", _this, "Renderer not defined!", symbol("update"))
  }

}

