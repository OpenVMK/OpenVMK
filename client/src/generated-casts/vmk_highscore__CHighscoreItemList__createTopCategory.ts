// vmk_highscore.cct / CHighscoreItemList / createTopCategory

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createTopCategory(_me: LingoMe, i_sText: LingoValue, a_bState: LingoValue, a_link: LingoValue, a_width: LingoValue) {
  var t_objTopic = callNamed("createObject", symbol("random"), "CHighscoreListItem");
  if ((lingoTruthy(callNamed("voidp", t_objTopic)) ? 0 : 1)) {
  callMethod("setColor", t_objTopic, meProp(_me, "m_textColor"))
  callMethod("setText", t_objTopic, i_sText)
  callMethod("setState", t_objTopic, a_bState)
  callMethod("setLink", t_objTopic, a_link)
  callMethod("SetWidth", t_objTopic, a_width)
  callMethod("append", meProp(_me, "m_ar_pTopics"), t_objTopic)
  return t_objTopic;
  } else {
  callNamed("error", "Failed to create Item Object", symbol("createTopCategory"))
  }

}

