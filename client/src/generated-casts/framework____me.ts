// framework.dcr /  / me

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _me(_me: LingoMe, i: LingoValue) {
  /* global */ var tDelim = globalVar("tDelim");
  var tCastCount = callNamed("tParamDelim", symbol("tFilename"), callNamed("tCastList", "variable.manager.class"));
  callMethod("tVarMgr", tCastCount, "client_startdate", callNamed("tTxtFile"))
  callMethod("tVarMgr", tCastCount, "client_starttime", 8, 0)
  callMethod("tVarMgr", tCastCount, "client_version", callNamed("tURL", "system.version"))
  callMethod("tVarMgr", tCastCount, "client_url", theProperty("tOrigin"))
  callMethod("tVarMgr", tCastCount, "client_lastclick", "")
  callNamed("tParamDelim", symbol("tCast"), callNamed("tCastList", "variable.manager.class"))
  callNamed("tParamDelim", symbol("tMemName"), callNamed("tCastList", "variable.manager.class"))
  callNamed("tParamDelim", symbol("tCode"), callNamed("tCastList", "variable.manager.class"))
  callNamed("tLoadID", symbol("tParam"))
  setGlobal("tDelim", i);
  callNamed("createObject", callNamed("tNewList", i, "load_variables"))
}

