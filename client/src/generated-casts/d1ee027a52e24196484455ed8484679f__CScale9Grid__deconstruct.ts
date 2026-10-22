// d1ee027a52e24196484455ed8484679f.cct / CScale9Grid / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (meProp(_me, "m_bSearchable")) {
  callNamed("unregisterMessage", symbol("SearchCellContainingData"), callMethod("getID", _me))
  }

  setMeProp(_me, "m_sDefinition", undefined);
  setMeProp(_me, "m_sMemname", undefined);
  setMeProp(_me, "m_rMember", undefined);
  setMeProp(_me, "m_rImg", undefined);
  setMeProp(_me, "m_rColor", undefined);
  setMeProp(_me, "m_rBgColor", undefined);
  setMeProp(_me, "m_rActiveColor", undefined);
  setMeProp(_me, "m_bMask", undefined);
  setMeProp(_me, "m_iBlend", undefined);
  setMeProp(_me, "m_iInk", undefined);
  setMeProp(_me, "m_rGrid", undefined);
  setMeProp(_me, "m_iWidth", undefined);
  setMeProp(_me, "m_iHeight", undefined);
  setMeProp(_me, "m_pPos", undefined);
  setMeProp(_me, "m_sEvent", undefined);
  setMeProp(_me, "m_sTxt", undefined);
  setMeProp(_me, "m_sFont", undefined);
  setMeProp(_me, "m_iFontSize", undefined);
  setMeProp(_me, "m_sTxtAlignH", undefined);
  setMeProp(_me, "m_sTxtAlignV", undefined);
  setMeProp(_me, "m_sIcon", undefined);
  setMeProp(_me, "m_rIcon", undefined);
  setMeProp(_me, "m_sIconAlign", undefined);
  setMeProp(_me, "m_bAntiAlias", undefined);
  setMeProp(_me, "m_rRender", undefined);
  setMeProp(_me, "m_bNeedUpdate", undefined);
  setMeProp(_me, "m_bActive", undefined);
  setMeProp(_me, "m_rNode", undefined);
  setMeProp(_me, "m_bShowAsActive", undefined);
  setMeProp(_me, "m_bShowBorder", undefined);
  setMeProp(_me, "m_rHiliterCol", undefined);
  setMeProp(_me, "m_rBorderCol", undefined);
  setMeProp(_me, "m_bClickable", undefined);
  setMeProp(_me, "m_rTextColor", undefined);
  return 1;
}

