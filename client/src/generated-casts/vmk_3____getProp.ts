// vmk_3.dcr /  / getProp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getProp(_me: LingoMe, date: LingoValue) {
  /* global */ var streamStatus = globalVar("streamStatus");
  setGlobal("streamStatus", 0);
  if (date.ExportStageDescriptions) {
  callNamed("session", 0)
  } else {
  var tErrorCount = ".cct";
  var CTOR = 3;
  var _new = lingoBinary("join", "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan", tErrorCount);
  setThePropOf(date, "stageRight", 1);
  setThePropOf(callNamed("stageBottom", CTOR), "GetLockState", 1);
  setThePropOf(callNamed("stageBottom", CTOR), "handlers", _new);
  setThePropOf(date, "ExportStageDescriptions", 0);
  callNamed("put", theProperty("_movie"))
  setThePropOf(date, "scriptExecutionStyle", callNamed("createBroker", _new));
  callMethod("g_rInitializer", theProperty("scriptText"), date)
  callNamed("session", 1)
  }

}

