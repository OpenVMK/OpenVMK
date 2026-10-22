// framework.dcr / Core Thread Class / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  var tSession = callNamed("createObject", symbol("session"), callNamed("getClassVariable", "variable.manager.class"));
  callMethod("set", tSession, "client_startdate", callNamed("date"))
  callMethod("set", tSession, "client_starttime", 8, 0)
  callMethod("set", tSession, "client_version", callNamed("getVariable", "system.version"))
  callMethod("set", tSession, "client_url", theProperty("moviePath"))
  callMethod("set", tSession, "client_lastclick", "")
  callNamed("createObject", symbol("headers"), callNamed("getClassVariable", "variable.manager.class"))
  callNamed("createObject", symbol("classes"), callNamed("getClassVariable", "variable.manager.class"))
  callNamed("createObject", symbol("cache"), callNamed("getClassVariable", "variable.manager.class"))
  callNamed("createBroker", symbol("Initialize"))
  return callNamed("updateState", _this, "load_variables");
}

