// 6df220c58a1fbfc6fa5eee1823840b41.cct / CTicketRadioButton / updateMenu

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateMenu(_me: LingoMe) {
  for (var t_Elem of meProp(_me, "m_ar_Elements").toArray()) {
  if (t_Elem.needupdate) {
  if (lingoBinary("eq", t_Elem._type, symbol("rect"))) {
  var t_iType = symbol("rect");
  } else {
  t_iType = symbol("round");
  }

  if (t_Elem.Active) {
  var t_iMode = symbol("Active");
  } else {
  t_iMode = symbol("passive");
  }

  var t_rImg = meProp(_me, "m_ar_image")[t_iType][t_iMode];
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), t_Elem.element), t_rImg)
  }

  }

}

