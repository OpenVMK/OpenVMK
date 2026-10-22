// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / _WhoEntersEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _WhoEntersEventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWhoEntersWindow"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "friendsonly.off":
case "friendsonly.checkbox.text":
  setMeProp(_me, "m_iTempEntryState", 1);
  break;
case "everyone.off":
case "everyone.checkbox.text":
  setMeProp(_me, "m_iTempEntryState", 0);
  break;
case "ticketpeople.off":
case "ticketpeople.checkbox.text":
  setMeProp(_me, "m_iTempEntryState", 2);
  break;
case "owner.off":
case "owner.checkbox.text":
  setMeProp(_me, "m_iTempEntryState", 4);
  break;
case "almosteveryone.off":
case "almosteveryone.checkbox.text":
  setMeProp(_me, "m_iTempEntryState", 3);
  break;
case "mes.accept.button":
  callMethod("setFriendsOnly", callMethod("getComponent", _me), meProp(_me, "m_iTempEntryState"))
  callMethod("_CloseWhoEntersWindow", _me)
  break;
case "close":
case "mes.deny.button":
  callMethod("_CloseWhoEntersWindow", _me)
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  callMethod("UpdateChoises", _me, meProp(_me, "m_iTempEntryState"))
  }

}

