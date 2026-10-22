// vmk_hm_minigame.cct / CHMWindowUI / dialogWindowEvent

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
case "hauntedmansion_exit":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  callMethod("StopMinigameEngine", callMethod("getComponent", callNamed("getThread", "minigame")))
  callNamed("executeMessage", symbol("SendMinigameAction"), 5, new LingoList([]))
  break;
case symbol("dialogCancel"):
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown event", t_dialogEvent))
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "HM Unknown Dialog Window", t_dialogName))
  }

}

