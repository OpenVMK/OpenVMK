// vmk_pirates2_minigame.cct / PiratesInputHandler / PiratesMouseDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PiratesMouseDown(_me: LingoMe) {
  callMethod("mouseDown", callMethod("getInterface", callNamed("getThread", "piratesminigame")), theProperty("mouseLoc"))
  callNamed("pass")
}

