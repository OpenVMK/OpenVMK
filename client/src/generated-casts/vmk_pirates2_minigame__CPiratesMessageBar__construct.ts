// vmk_pirates2_minigame.cct / CPiratesMessageBar / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sWndTitle", "PiratesMessageBar");
  setMeProp(_me, "m_bVisible", 0);
  setMeProp(_me, "m_bValidFlag", 0);
  setMeProp(_me, "m_bFlashing", 0);
  setMeProp(_me, "m_iLastFrameFlashColor", symbol("red"));
  setMeProp(_me, "m_iFlashCounter", 0);
  setMeProp(_me, "m_iFLASHDELAY", 4);
  setMeProp(_me, "m_colorInput", callNamed("rgb", "#EFEFEF"));
  setMeProp(_me, "m_colorNonMatch", callNamed("rgb", 255, 0, 0));
  var m_colorBgr = callNamed("rgb", 0, 0, 0);
  setMeProp(_me, "m_bBroadSideOn", 0);
  setMeProp(_me, "m_iLastBS", 1);
  setMeProp(_me, "m_pCannedField", 0);
  setMeProp(_me, "m_iGameMode", 0);
  return callMethod("regMsgList", _me, 1);
}

