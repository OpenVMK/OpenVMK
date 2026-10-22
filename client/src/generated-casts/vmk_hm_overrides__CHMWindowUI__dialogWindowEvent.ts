// vmk_hm_overrides.cct / CHMWindowUI / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  if (lingoBinary("eq", t_dialogName, "hauntedmansion_exit")) {
  if (lingoBinary("eq", t_dialogEvent, symbol("dialogOK"))) {
  callMethod("StopMinigameEngine", callMethod("getComponent", callNamed("getThread", "minigame")))
  callNamed("executeMessage", symbol("SendMinigameAction"), 5, new LingoList([]))
  } else {
  if (lingoBinary("eq", t_dialogEvent, symbol("dialogCancel"))) {
  } else {
  callNamed("put", lingoBinary("joinPad", "Unknown event", t_dialogEvent))
  }

  }

  } else {
  callNamed("put", lingoBinary("joinPad", "HM Unknown Dialog Window", t_dialogName))
  }

}

