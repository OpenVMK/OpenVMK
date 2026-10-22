// vmk_3.dcr / CCastLoadInstance333 / define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function define(_me: LingoMe, tFile: LingoValue, tURL: LingoValue, tpreloadId: LingoValue) {
  setThePropOf(_me, "pFile", tFile);
  setThePropOf(_me, "pURL", tURL);
  setThePropOf(_me, "pGroupId", tpreloadId);
  setThePropOf(_me, "ptryCount", 1);
  if (lingoBinary("contains", (lingoTruthy(tFile) ? 0 : 1), ".cct")) {
  setThePropOf(_me, "pURL", lingoBinary("join", lingoBinary("join", "http://204.12.248.90/d5ef042e-bef2-44a8-855b-03932b4c9d59/file.php?code=", tFile), ".cct"));
  }

  return callNamed("Activate", _me);
}

