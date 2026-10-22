// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryHandler / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue, t_rParameter: LingoValue) {
  switch (t_dialogName) {
case "trade.dialog.oppositeGender":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  callMethod("TradeOpen", _me.component, t_rParameter, 1)
  break;
  }

  break;
case "ItemsDeletedFromHk":
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown Dialog Window", t_dialogName))
  }

}

