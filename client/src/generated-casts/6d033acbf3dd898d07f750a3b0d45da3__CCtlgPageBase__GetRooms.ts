// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCtlgPageBase / GetRooms

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetRooms(_me: LingoMe, _this: LingoValue, a_mpItemList: LingoValue) {
  if (callNamed("listp", a_mpItemList)) {
  if (lingoBinary("gt", callMethod("findPos", a_mpItemList, "index"), 0)) {
  for (var i = 1; i <= a_mpItemList["index"].count; ++i) {
  if (lingoBinary("eq", a_mpItemList["index"][i].id, 10)) {
  var t_mpRoomList = a_mpItemList["index"][i].Guestrooms;
  break;
  }

  }

  }

  }

  if ((lingoTruthy(callNamed("voidp", t_mpRoomList)) ? 0 : 1)) {
  var t_ID = t_mpRoomList.id;
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 16, new LingoPropList([symbol("int"), t_ID]))
  }

}

