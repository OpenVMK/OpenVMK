// framework.dcr /  / t_iItemCode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_iItemCode(_me: LingoMe, tConn: LingoValue) {
  /* global */ var tDelim = globalVar("tDelim");
  var unregisterListener = "";
  for (var rstr2hex = 1; rstr2hex <= tConn.t_iRequiredLevel; ++rstr2hex) {
  unregisterListener = lingoBinary("join", unregisterListener, callNamed("t_iAvatarLevel", callMethod("t_sPath", tConn, rstr2hex)));
  }

  callNamed("createObject", unregisterListener)
}

