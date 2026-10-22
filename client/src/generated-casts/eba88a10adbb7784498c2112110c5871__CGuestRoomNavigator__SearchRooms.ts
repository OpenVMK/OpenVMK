// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / SearchRooms

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SearchRooms(_me: LingoMe, a_sText: LingoValue) {
  if (lingoBinary("lt", a_sText.length, 3)) {
  return;
  }

  if (callMethod("exists", callNamed("getObject", symbol("session")), "permissions")) {
  var t_iPos = callMethod("findPos", callMethod("get", callNamed("getObject", symbol("session")), "permissions"), "10");
  }

  if (lingoBinary("gt", t_iPos, 0)) {
  setMeProp(_me, "m_sSearchString", a_sText);
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "SearchAllRooms", 2, 1);
  callMethod("show", t)
  callMethod("setText", t, callNamed("getText", "nav.search.all.rooms"), callNamed("getText", "mods.alert"), callNamed("getText", "nav.allrooms.no"), callNamed("getText", "nav.allrooms.yes"))
  } else {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 28, new LingoPropList([symbol("string"), a_sText]))
  }

}

