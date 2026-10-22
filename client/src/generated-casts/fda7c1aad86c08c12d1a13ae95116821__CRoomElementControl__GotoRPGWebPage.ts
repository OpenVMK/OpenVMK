// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomElementControl / GotoRPGWebPage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GotoRPGWebPage(_me: LingoMe, _this: LingoValue) {
  if (callNamed("variableExists", "rpgfurnipopup.url")) {
  var t_sURL = callNamed("getVariable", "rpgfurnipopup.url");
  t_sURL = lingoBinary("join", lingoBinary("join", t_sURL, "="), callMethod("GetParam", meProp(_me, "m_rSelected"), "ENTITYID"));
  if (callNamed("stringp", t_sURL)) {
  callNamed("gotoNetPage", t_sURL, "rpg_link_window")
  }

  }

  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), new LingoPropList([2522, symbol("GotoRPGWebPage")]))
  callMethod("set", callNamed("getObject", symbol("session")), "FetchEntityID", 0)
}

