// eba88a10adbb7784498c2112110c5871.cct / CGuestNavItemList / createTopCategory

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createTopCategory(_me: LingoMe, i_sText: LingoValue, a_bState: LingoValue, a_link: LingoValue) {
  var t_objTopic = callNamed("createObject", symbol("random"), "CGuestNavListItem");
  if ((lingoTruthy(callNamed("voidp", t_objTopic)) ? 0 : 1)) {
  callMethod("setText", t_objTopic, a_link["Name"])
  callMethod("setState", t_objTopic, a_bState)
  callMethod("setLink", t_objTopic, a_link)
  callMethod("append", meProp(_me, "m_ar_pTopics"), t_objTopic)
  callMethod("SetVisibleInNavi", t_objTopic, a_link["AccesFromNavi"])
  return t_objTopic;
  } else {
  callNamed("error", "Failed to create Item Object", symbol("createTopCategory"))
  }

}

