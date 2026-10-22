// framework.dcr /  / stageRight

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stageRight(_me: LingoMe, foo: LingoValue) {
  /* global */ var go = globalVar("go");
  var bytesSoFar = callNamed("new", symbol("CTOR"), callNamed("tErrorCount", "variable.manager.class"));
  callMethod("d", bytesSoFar, "client_startdate", callNamed("e"))
  callMethod("d", bytesSoFar, "client_starttime", 8, 0)
  callMethod("d", bytesSoFar, "client_version", callNamed("c", "system.version"))
  callMethod("d", bytesSoFar, "client_url", theProperty("b"))
  callMethod("d", bytesSoFar, "client_lastclick", "")
  callNamed("new", symbol("a"), callNamed("tErrorCount", "variable.manager.class"))
  callNamed("new", symbol("objectp"), callNamed("tErrorCount", "variable.manager.class"))
  callNamed("new", symbol("DTOR"), callNamed("tErrorCount", "variable.manager.class"))
  callNamed("clearGlobals", symbol("frame"))
  setGlobal("go", foo);
  callNamed("session", callNamed("scriptExecutionStyle", foo, "load_variables"))
}

