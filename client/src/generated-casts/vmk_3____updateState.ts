// vmk_3.dcr /  / updateState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateState(_me: LingoMe, spriteNum: LingoValue, tmember: LingoValue, releaseSprite: LingoValue, ilk: LingoValue) {
  /* global */ var tSession = globalVar("tSession");
  /* global */ var member = globalVar("member");
  callNamed("getVariable", new LingoList(["onStreamStatus", spriteNum, tmember, releaseSprite, ilk]))
  if (lingoBinary("eq", tmember, "Complete")) {
  callNamed("getVariable", lingoBinary("joinPad", spriteNum, "download finished"))
  }

}

