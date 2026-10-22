// core.old.cct / Variable API / CreateVariableManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateVariableManager(_me: LingoMe) {
  return callNamed("createManager", symbol("variable_manager"), callNamed("value", callNamed("convertToPropList", callNamed("field", "System Props"), "\r")["variable.manager.class"]));
}

