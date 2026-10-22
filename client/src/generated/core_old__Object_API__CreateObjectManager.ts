// core.old.cct / Object API / CreateObjectManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateObjectManager(_me: LingoMe) {
  /* global */ var g_rCore = globalVar("g_rCore");
  if (callNamed("objectp", globalVar("g_rCore"))) {
  return globalVar("g_rCore");
  } else {
  var t_sCls = callNamed("value", callMethod("getaProp", callNamed("convertToPropList", callNamed("field", "System Props"), "\r"), "object.manager.class"))[1];
  setGlobal("g_rCore", callMethod("new", callNamed("script", t_sCls)));
  callMethod("construct", globalVar("g_rCore"))
  return globalVar("g_rCore");
  }

}

