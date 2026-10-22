// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CComposeCannedMessage / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bVisible", 0);
  setMeProp(_me, "m_bValidFlag", 0);
  setMeProp(_me, "m_bFlashing", 0);
  setMeProp(_me, "m_bScrolling", 0);
  setMeProp(_me, "m_bAllowErrors", 0);
  setMeProp(_me, "m_bAllowEmpty", 0);
  setMeProp(_me, "m_ar_symParseOptions", new LingoList([]));
  setMeProp(_me, "m_iLastFrameFlashColor", symbol("red"));
  setMeProp(_me, "m_iFlashCounter", 0);
  setMeProp(_me, "m_iFLASHDELAY", 5);
  setMeProp(_me, "m_ar_cWords", new LingoList([]));
  setMeProp(_me, "m_colorInput", callNamed("rgb", "#000000"));
  setMeProp(_me, "m_colorNonMatch", callNamed("rgb", 255, 0, 0));
  var m_colorBgr = callNamed("rgb", 0, 0, 0);
  setMeProp(_me, "m_bNotified", 0);
  callNamed("receiveUpdate", callMethod("getID", _me))
  return 1;
}

