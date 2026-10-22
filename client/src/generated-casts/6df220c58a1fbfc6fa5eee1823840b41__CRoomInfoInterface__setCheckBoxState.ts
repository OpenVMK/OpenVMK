// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / setCheckBoxState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setCheckBoxState(_me: LingoMe, t_sElemName: LingoValue, t_bFurnish: LingoValue, i_iBlend: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  if (t_bFurnish) {
  var t_mem = callNamed("getmemnum", "button.checkbox.1");
  } else {
  t_mem = callNamed("getmemnum", "button.checkbox.0");
  }

  var t_Elem = callMethod("getElement", tWndObj, t_sElemName);
  if (lingoBinary("neq", t_Elem, 0)) {
  if (lingoBinary("neq", t_mem, 0)) {
  var t_Img = callMethod("duplicate", callNamed("member", t_mem).image);
  callMethod("feedImage", t_Elem, t_Img)
  if ((lingoTruthy(callNamed("voidp", i_iBlend)) ? 0 : 1)) {
  var tSprite = callMethod("getProperty", t_Elem, symbol("sprite"));
  if (lingoBinary("neq", tSprite, 0)) {
  setThePropOf(tSprite, "blend", i_iBlend);
  }

  }

  }

  }

}

