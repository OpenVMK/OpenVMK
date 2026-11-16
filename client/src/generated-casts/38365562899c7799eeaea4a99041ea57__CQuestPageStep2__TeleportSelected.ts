// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / TeleportSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TeleportSelected(_me: LingoMe, a_iOtherID: LingoValue) {
  var tHighLightN = undefined;
  if (lingoBinary("eq", meProp(_me, "m_iCurPageName"), symbol("items"))) {
  var t_ar_rItems = callMethod("getaProp", meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("items"));
  var c = 1;
  for (var i = meProp(_me, "m_iFirst"); i <= meProp(_me, "m_iLast"); ++i) {
  var t_rItem = t_ar_rItems[i];
  if ((lingoTruthy(lingoBinary("eq", callMethod("getaProp", t_rItem, symbol("param")), 0)) ? 0 : 1)) {
  if (callNamed("ilk", t_rItem.param, symbol("list"))) {
  if (lingoBinary("eq", t_rItem.param.count, 3)) {
  if (lingoBinary("eq", t_rItem.param[1], 1)) {
  if (lingoBinary("eq", t_rItem.param[3], a_iOtherID)) {
  callMethod("Highlight", meProp(_me, "m_rGridRenderer"), c)
  break;
  }

  }

  }

  }

  }

  c = lingoBinary("add", c, 1);
  }

  }

  callMethod("blinkLayout", meProp(_me, "m_ar_components")["quest.prizes"], a_iOtherID, symbol("teleportpair"))
}

