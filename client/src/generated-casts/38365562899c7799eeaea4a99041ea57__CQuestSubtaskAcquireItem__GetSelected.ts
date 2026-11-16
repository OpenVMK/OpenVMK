// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskAcquireItem / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rGridRenderer"))) {
  var t_mp_data = meProp(_me, "m_mp_kType_mp_iRef_rItem")[meProp(_me, "m_iCurPageName")];
  var t_iSlot = callMethod("GetSelected", meProp(_me, "m_rGridRenderer"));
  if (callNamed("listp", t_mp_data)) {
  if (lingoBinary("and", lingoBinary("gt", t_iSlot, 0), lingoBinary("lte", t_iSlot, t_mp_data.count))) {
  var t_mp_DataList = t_mp_data[t_iSlot];
  return t_mp_DataList;
  }

  }

  }

  return new LingoPropList([symbol("ref"), -float(1), symbol("code"), -float(1), symbol("param"), -float(1), symbol("state"), symbol("invalid")]);
}

