// d1ee027a52e24196484455ed8484679f.cct / CScale9Grid / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bShowAsActive", 0);
  setMeProp(_me, "m_bNeedUpdate", 1);
  setMeProp(_me, "m_bActive", 0);
  setMeProp(_me, "m_bShowBorder", 0);
  setMeProp(_me, "m_sIcon", "");
  setMeProp(_me, "m_sIconAlign", "");
  setMeProp(_me, "m_sEvent", "");
  setMeProp(_me, "m_sTxt", "");
  setMeProp(_me, "m_sFont", "");
  setMeProp(_me, "m_sTxtAlignH", "");
  setMeProp(_me, "m_sTxtAlignV", "");
  setMeProp(_me, "m_sIcon", "");
  setMeProp(_me, "m_sIconAlign", "");
  setMeProp(_me, "m_rHiliterCol", callNamed("rgb", 255, 204, 0));
  setMeProp(_me, "m_rBorderCol", callNamed("rgb", 80, 160, 216));
  setMeProp(_me, "m_bClickable", 1);
  setMeProp(_me, "m_bSearchable", 0);
  setMeProp(_me, "m_rBlinker", undefined);
  setMeProp(_me, "m_rTextColor", undefined);
  setMeProp(_me, "m_rParentComponent", undefined);
  return 1;
}

