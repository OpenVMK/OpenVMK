// vmk_pirates_minigame.cct / CPiratesMessageBar / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  switch (t_dialogName) {
case "pirates_exit":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  callNamed("executeMessage", symbol("SendMinigameAction"), 7, new LingoList([]))
  break;
case symbol("dialogCancel"):
  break;
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown Dialog Window", t_dialogName))
  }

}

