// vmk_tutorial.cct / CJungleCruiseInterface / dialogWindowEvent

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
case "junglecruise_exit":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  callMethod("StopMinigameEngine", callMethod("getComponent", callNamed("getThread", "minigame")))
  callNamed("executeMessage", symbol("ui_show"))
  callNamed("executeMessage", symbol("SendMinigameAction"), 8, new LingoList([]))
  break;
case symbol("dialogCancel"):
  callMethod("enableCamera", _me)
  break;
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown Dialog Window", t_dialogName))
  }

}

