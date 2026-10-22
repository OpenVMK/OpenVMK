// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewFriendRequest / updateContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateContent(_me: LingoMe) {
  setMeProp(_me, "m_ar_Requests", callMethod("GetRequests", callMethod("getComponent", _me)));
  if (lingoBinary("gt", meProp(_me, "m_ar_Requests").count, 0)) {
  setMeProp(_me, "m_rRequest", meProp(_me, "m_ar_Requests")[1]);
  var t_sName = meProp(_me, "m_rRequest").requester_name;
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "mes.friends.requestwho"), t_sName)
  var t_txt = callNamed("replaceChunks", callNamed("getText", "mes.friends.requestwhoinfo"), "%senderName%", t_sName);
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "mes.friends.requestwhoinfo"), t_txt)
  }

  callMethod("updateRequestField", _me)
}

