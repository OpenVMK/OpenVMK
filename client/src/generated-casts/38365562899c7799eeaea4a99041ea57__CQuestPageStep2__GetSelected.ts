// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe, _this: LingoValue) {
  var t_iOffset = 0;
  switch (meProp(_me, "m_iCurPageName")) {
case symbol("items"):
  t_iOffset = meProp(_me, "m_iGridOffsetFurni");
  break;
case symbol("pins"):
  t_iOffset = meProp(_me, "m_iGridOffsetPins");
  break;
case symbol("posters"):
  t_iOffset = meProp(_me, "m_iGridOffsetPosters");
  break;
case symbol("clothes"):
  t_iOffset = meProp(_me, "m_iGridOffsetClothing");
  break;
  }

  if (callNamed("objectp", meProp(_me, "m_rGridRenderer"))) {
  var t_mp_data = meProp(_me, "m_mp_kType_mp_iRef_rItem")[meProp(_me, "m_iCurPageName")];
  var t_iSlot = lingoBinary("add", callMethod("GetSelected", meProp(_me, "m_rGridRenderer")), t_iOffset);
  if (callNamed("listp", t_mp_data)) {
  if (lingoBinary("and", lingoBinary("gt", t_iSlot, 0), lingoBinary("lte", t_iSlot, t_mp_data.count))) {
  var t_mp_DataList = t_mp_data[t_iSlot];
  return t_mp_DataList;
  }

  }

  }

  return new LingoPropList([symbol("ref"), -float(1), symbol("code"), -float(1), symbol("param"), -float(1), symbol("state"), symbol("invalid")]);
}

