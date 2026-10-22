// eba88a10adbb7784498c2112110c5871.cct / Navigator Component Class / RequestNavigationNodes

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RequestNavigationNodes(_me: LingoMe, a_land: LingoValue) {
  var t_navNode = undefined;
  switch (a_land) {
case symbol("parkmap"):
  t_navNode = 7;
  break;
case symbol("adventureland"):
  t_navNode = 3;
  break;
case symbol("frontierland"):
  t_navNode = 5;
  break;
case symbol("fantasyland"):
  t_navNode = 4;
  break;
case symbol("tomorrowland"):
  t_navNode = 6;
  break;
case symbol("mainstreet"):
  t_navNode = 2;
  break;
case symbol("whatsnew"):
  t_navNode = 8;
  break;
case symbol("neworleans"):
  t_navNode = 9;
  break;
  }

  if ((lingoTruthy(callNamed("voidp", t_navNode)) ? 0 : 1)) {
  if (callMethod("get", callNamed("getObject", symbol("session")), "AdvNavigation")) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 26, new LingoPropList([symbol("integer"), t_navNode]))
  } else {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 22, new LingoPropList([symbol("integer"), t_navNode]))
  }

  }

}

