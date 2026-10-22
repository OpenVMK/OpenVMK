// core.old.cct / Special Services Class / getMachineID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getMachineID(_me: LingoMe) {
  var tMachineID = callNamed("getPref", callNamed("getVariable", "pref.value.id"));
  if (callNamed("voidp", tMachineID)) {
  tMachineID = callMethod("Encipher", meProp(_me, "pDecoder"), callNamed("string", theProperty("milliSeconds")));
  callNamed("setPref", callNamed("getVariable", "pref.value.id"), tMachineID)
  }

  if (lingoBinary("eq", tMachineID.char.range(1, 4), "uid:")) {
  tMachineID = callMethod("Encipher", meProp(_me, "pDecoder"), callNamed("string", theProperty("milliSeconds")));
  callNamed("setPref", callNamed("getVariable", "pref.value.id"), tMachineID)
  }

  return tMachineID;
}

