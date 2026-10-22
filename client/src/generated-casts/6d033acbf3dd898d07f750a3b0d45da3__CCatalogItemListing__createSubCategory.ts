// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogItemListing / createSubCategory

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createSubCategory(_me: LingoMe, i_sText: LingoValue, a_bState: LingoValue, a_iLink: LingoValue, a_sSpecial: LingoValue, a_iLandId: LingoValue) {
  var t_iPos = callMethod("findPos", meProp(_me, "m_mp_List"), i_sText);
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", meProp(_me, "m_mp_List"))) ? 0 : 1), lingoBinary("gt", t_iPos, 0))) {
  var t_objTopic = meProp(_me, "m_mp_List")[t_iPos]["Obj"];
  } else {
  t_objTopic = callNamed("createObject", symbol("temp"), "CCatalogItems");
  }

  if ((lingoTruthy(callNamed("voidp", t_objTopic)) ? 0 : 1)) {
  callMethod("setText", t_objTopic, callNamed("string", i_sText))
  callMethod("setLink", t_objTopic, a_iLink)
  callMethod("setState", t_objTopic, a_bState)
  callMethod("setSpecial", t_objTopic, a_sSpecial)
  callMethod("setLand", t_objTopic, a_iLandId)
  callMethod("append", meProp(_me, "m_ar_pTopics"), t_objTopic)
  return t_objTopic;
  } else {
  callNamed("error", _me, "Failed to create Catalog Sub Object", symbol("addTopic"))
  }

}

