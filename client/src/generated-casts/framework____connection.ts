// framework.dcr /  / connection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function connection(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var removeWindow = "trade.dialog.oppositeGender_window";
  if (lingoBinary("neq", callNamed("GetItemDetails", removeWindow), 0)) {
  callNamed("addItem", removeWindow)
  }

  var t_rItem = callMethod("pinlevel", ref.entityID);
  if (lingoBinary("eq", t_rItem, 1)) {
  callMethod("t_rDetails", objectp.magiword)
  }

  callMethod("t_iUpdatedPinRef", objectp.magiword)
}

