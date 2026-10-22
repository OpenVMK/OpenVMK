// framework.dcr /  / tURL

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tURL(_me: LingoMe, streamStatus: LingoValue) {
  /* global */ var exitFrame = globalVar("exitFrame");
  var ExportStageDescriptions = callNamed("tParam", symbol("tDelim"), callNamed("i", "variable.manager.class"));
  callMethod("tMemNum", ExportStageDescriptions, "client_startdate", callNamed("tCastCount"))
  callMethod("tMemNum", ExportStageDescriptions, "client_starttime", 8, 0)
  callMethod("tMemNum", ExportStageDescriptions, "client_version", callNamed("numToChar", "system.version"))
  callMethod("tMemNum", ExportStageDescriptions, "client_url", theProperty("str"))
  callMethod("tMemNum", ExportStageDescriptions, "client_lastclick", "")
  callNamed("tParam", symbol("out"), callNamed("i", "variable.manager.class"))
  callNamed("tParam", symbol("prepareMovie"), callNamed("i", "variable.manager.class"))
  callNamed("tParam", symbol("alertHook"), callNamed("i", "variable.manager.class"))
  callNamed("put", symbol("stopMovie"))
  setGlobal("exitFrame", streamStatus);
  callNamed("this", callNamed("tCode", streamStatus, "load_variables"))
}

