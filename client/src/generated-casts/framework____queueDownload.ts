// framework.dcr /  / queueDownload

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function queueDownload(_meReceiver: LingoMe, tPrivateKey: LingoValue, tstate: LingoValue, error: LingoValue, _me: LingoValue) {
  /* global */ var startCastLoad = globalVar("startCastLoad");
  callNamed("executeMessage", new LingoList(["onStreamStatus", tPrivateKey, tstate, error, _me]))
  if (lingoBinary("eq", tstate, "Complete")) {
  callNamed("executeMessage", lingoBinary("joinPad", tPrivateKey, "download finished"))
  }

}

