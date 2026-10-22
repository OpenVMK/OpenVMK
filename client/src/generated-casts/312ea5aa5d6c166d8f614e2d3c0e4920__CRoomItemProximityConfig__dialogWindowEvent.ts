// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemProximityConfig / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue, t_rdata: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Dialog used", t_dialogName))
  switch (t_dialogName) {
case "current_item_configuration":
  switch (t_dialogEvent) {
case symbol("Ok"):
  break;
case symbol("cancel"):
  break;
case "help":
  break;
  }

  break;
case "Item Configuration":
  switch (t_dialogEvent) {
case symbol("Ok"):
  break;
case symbol("cancel"):
  break;
case "help":
  break;
  }

  break;
case "item_configuration_used":
  switch (t_dialogEvent) {
case symbol("Ok"):
  break;
case symbol("cancel"):
  break;
case "help":
  break;
  }

  break;
  }

  callNamed("removeDialogWindow", t_dialogName)
}

