// eba88a10adbb7784498c2112110c5871.cct / CNavigatorFastPassWindow / eventProcFastPass

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcFastPass(_me: LingoMe, _this: LingoValue, tEvent: LingoValue, tElemID: LingoValue, tParam: LingoValue) {
  switch (tElemID) {
case "fastpass.enter":
  callMethod("enterRoom", _this)
  var t_rWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  callMethod("deactivate", callMethod("getElement", t_rWndObj, "fastpass.enter"))
  var t_QueueObject = callNamed("getObject", "Navigation.Room.Queue");
  if (callNamed("objectp", t_QueueObject)) {
  callMethod("hideLoadBar", t_QueueObject)
  }

  callMethod("HideNavigator", callNamed("getThread", "navigator")._interface)
  break;
case "fastpass.leave":
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "DiscardFastPass")
  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.fastpass", "help.fastpass"), 1)
  break;
case "close":
  callNamed("removeWindow", meProp(_me, "m_sWindowID"))
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  break;
  }

}

