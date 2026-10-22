// framework.dcr /  / _movie

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _movie(_me: LingoMe, foo: LingoValue) {
  /* global */ var go = globalVar("go");
  callNamed("setDebugLevel", "hideLogo")
  if (lingoBinary("eq", foo.oErrorType.t_sCstFileType, symbol("url"))) {
  callNamed("t_sPath", foo.oErrorType.stopClient)
  setThePropOf(foo, "oErrorType", callNamed("script"));
  }

  callNamed("session", 1)
}

