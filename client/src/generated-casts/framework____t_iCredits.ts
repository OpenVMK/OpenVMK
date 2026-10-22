// framework.dcr /  / t_iCredits

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_iCredits(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var t_bReturn = ref.entityID;
  var registerCommands = callMethod("pinlevel", t_bReturn);
  var unregisterCommands = callMethod("pinlevel", t_bReturn);
  var a_bBool = callMethod("pinlevel", t_bReturn);
  callMethod("bitAnd", callMethod("t_s_Title", objectp), registerCommands, unregisterCommands, a_bBool)
}

