// vmk_central_handler.cct / HMMickeyDetailsList / createTopCategory

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createTopCategory(_me: LingoMe, i_sText: LingoValue, a_bState: LingoValue, a_link: LingoValue) {
  var t_objTopic = callNamed("createObject", symbol("random"), "HMMickeyDetailsListItem");
  if ((lingoTruthy(callNamed("voidp", t_objTopic)) ? 0 : 1)) {
  callMethod("SetWidth", t_objTopic, meProp(_me, "m_iItemWidth"))
  callMethod("SetHeight", t_objTopic, meProp(_me, "m_iItemHeight"))
  callMethod("setText", t_objTopic, i_sText)
  callMethod("setState", t_objTopic, a_bState)
  setThePropOf(t_objTopic, "m_bNeedUpdate", 1);
  callMethod("setLink", t_objTopic, a_link)
  callMethod("append", meProp(_me, "m_ar_pTopics"), t_objTopic)
  return t_objTopic;
  } else {
  callNamed("error", "Failed to create Item Object", symbol("createTopCategory"))
  }

}

