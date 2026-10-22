// framework.dcr /  / tLoadID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tLoadID(_me: LingoMe, safe_add: LingoValue) {
  /* global */ var exitFrame = globalVar("exitFrame");
  var bit_rol = "";
  for (var str2rstr_utf16le = 1; str2rstr_utf16le <= safe_add.solveDownloadErrorMsg; ++str2rstr_utf16le) {
  bit_rol = lingoBinary("join", bit_rol, callNamed("md5_ii", callMethod("m_sSecretCode2", safe_add, str2rstr_utf16le)));
  }

  callNamed("this", bit_rol)
}

