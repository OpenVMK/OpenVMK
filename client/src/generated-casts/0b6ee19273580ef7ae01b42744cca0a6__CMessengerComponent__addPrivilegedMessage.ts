// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / addPrivilegedMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addPrivilegedMessage(_me: LingoMe, a_ar_msg: LingoValue) {
  if (lingoBinary("neq", a_ar_msg.flash, 0)) {
  callMethod("addAt", meProp(_me, "m_ar_inbox"), 1, a_ar_msg)
  } else {
  var i = 1;
  for (var t_ar_Msg of meProp(_me, "m_ar_inbox").toArray()) {
  if (callNamed("compareDates", a_ar_msg.date, t_ar_Msg.date)) {
  break;
  }

  if (lingoBinary("neq", t_ar_Msg.senderID, 0)) {
  break;
  }

  i = lingoBinary("add", i, 1);
  }

  callMethod("addAt", meProp(_me, "m_ar_inbox"), i, a_ar_msg)
  }

}

