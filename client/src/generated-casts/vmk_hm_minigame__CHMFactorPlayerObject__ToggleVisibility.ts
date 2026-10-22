// vmk_hm_minigame.cct / CHMFactorPlayerObject / ToggleVisibility

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ToggleVisibility(_me: LingoMe, i_iVisibility: LingoValue) {
  var t_iBitMask = 4;
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rAvatar"))) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("voidp", callMethod("GetVisual", meProp(_me, "m_rAvatar")))) ? 0 : 1)) {
  switch (i_iVisibility) {
case 1:
  if (lingoBinary("eq", callNamed("bitAnd", meProp(_me, "m_i_statebits"), t_iBitMask), 0)) {
  setMeProp(_me, "m_i_statebits", callNamed("bitXor", meProp(_me, "m_i_statebits"), t_iBitMask));
  }

  setThePropOf(callMethod("GetVisual", meProp(_me, "m_rAvatar")).m_rCanvasSpr, "blend", 50);
  break;
  default:
  if (lingoBinary("eq", callNamed("bitAnd", meProp(_me, "m_i_statebits"), t_iBitMask), t_iBitMask)) {
  setMeProp(_me, "m_i_statebits", callNamed("bitXor", meProp(_me, "m_i_statebits"), t_iBitMask));
  }

  setThePropOf(callMethod("GetVisual", meProp(_me, "m_rAvatar")).m_rCanvasSpr, "blend", 100);
  }

  }

  }

  callMethod("SyncGameParameters", _me)
}

