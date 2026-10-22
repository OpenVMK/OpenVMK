// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePins / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_kActive"), symbol("pins"))) {
  if (callNamed("objectp", meProp(_me, "m_rGridRenderer"))) {
  var t_iSlot = lingoBinary("add", callMethod("GetSelected", meProp(_me, "m_rGridRenderer")), lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")));
  if (lingoBinary("and", lingoBinary("gt", t_iSlot, 0), lingoBinary("lte", t_iSlot, callMethod("getaProp", meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("pins")).count))) {
  return callMethod("getaProp", meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("pins"))[t_iSlot];
  }

  }

  } else {
  if (callNamed("objectp", meProp(_me, "m_rWornRenderer"))) {
  t_iSlot = callMethod("GetSelected", meProp(_me, "m_rWornRenderer"));
  var t_mp_wornPins = callMethod("GetItemListByCategory", callMethod("GetInventory", callNamed("getThread", "inventory").component, 3), symbol("pins"));
  if (lingoBinary("and", lingoBinary("gt", t_iSlot, 0), lingoBinary("lte", t_iSlot, t_mp_wornPins.count))) {
  return t_mp_wornPins[t_iSlot];
  }

  }

  }

  return new LingoPropList([symbol("ref"), -float(1), symbol("code"), -float(1), symbol("param"), -float(1), symbol("state"), symbol("invalid")]);
}

