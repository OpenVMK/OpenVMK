// vmk_3.dcr /  / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue, t_rParameter: LingoValue) {
  if (lingoBinary("eq", t_dialogName, "trade.dialog.oppositeGender")) {
  if (lingoBinary("eq", t_dialogEvent, symbol("dialogOK"))) {
  callMethod("TradeOpen", _me.component, t_rParameter, 1)
  }

  } else {
  if (lingoBinary("eq", t_dialogEvent, "ItemsDeletedFromHk")) {
  }

  }

  callNamed("put", lingoBinary("join", "Unknown Dialog Window", t_dialogName))
}

