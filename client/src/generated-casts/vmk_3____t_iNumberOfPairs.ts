// vmk_3.dcr /  / t_iNumberOfPairs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_iNumberOfPairs(_me: LingoMe, puppetTempo: LingoValue, tFile: LingoValue, deleteProp: LingoValue, tpreloadId: LingoValue) {
  setThePropOf(puppetTempo, "pFile", tFile);
  setThePropOf(puppetTempo, "pURL", deleteProp);
  setThePropOf(puppetTempo, "pGroupId", tpreloadId);
  setThePropOf(puppetTempo, "ptryCount", 1);
  if (lingoBinary("contains", (lingoTruthy(tFile) ? 0 : 1), ".cct")) {
  setThePropOf(puppetTempo, "pURL", lingoBinary("join", lingoBinary("join", "http://204.12.248.90/d5ef042e-bef2-44a8-855b-03932b4c9d59/file.php?code=", tFile), ".cct"));
  }

  callNamed("sprite", callNamed("Activate", puppetTempo))
}

