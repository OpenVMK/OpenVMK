// vmk_3.dcr /  / moveToFront

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveToFront(_me: LingoMe, m_sSecretCode2: LingoValue) {
  var preloadMode = callNamed("getStreamStatus", symbol("netDone"), callNamed("netError", "variable.manager.class"));
  callMethod("fileName", preloadMode, "client_startdate", callNamed("castLib"))
  callMethod("fileName", preloadMode, "client_starttime", 8, 0)
  callMethod("fileName", preloadMode, "client_version", callNamed("getPropRef", "system.version"))
  callMethod("fileName", preloadMode, "client_url", theProperty("name"))
  callMethod("fileName", preloadMode, "client_lastclick", "")
  callNamed("getStreamStatus", symbol("startClient"), callNamed("netError", "variable.manager.class"))
  callNamed("getStreamStatus", symbol("memberNum"), callNamed("netError", "variable.manager.class"))
  callNamed("getStreamStatus", symbol("gotoNetPage"), callNamed("netError", "variable.manager.class"))
  callNamed("m_sSecretCode", symbol("tCode"))
  callNamed("sprite", callNamed("stopClient", m_sSecretCode2, "load_variables"))
}

