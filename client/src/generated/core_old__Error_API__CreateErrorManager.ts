// core.old.cct / Error API / CreateErrorManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateErrorManager(_me: LingoMe) {
  /* global */ var g_rError = globalVar("g_rError");
  if (callNamed("objectp", globalVar("g_rError"))) {
  return globalVar("g_rError");
  } else {
  var t_sCls = callNamed("value", callMethod("getaProp", callNamed("convertToPropList", callNamed("field", "System Props"), "\r"), "error.manager.class"))[1];
  setGlobal("g_rError", callMethod("new", callNamed("script", t_sCls)));
  callMethod("construct", globalVar("g_rError"))
  callNamed("try")
  callNamed("createObject", symbol("error_manager"), globalVar("g_rError"))
  callNamed("catch")
  return globalVar("g_rError");
  }

}

