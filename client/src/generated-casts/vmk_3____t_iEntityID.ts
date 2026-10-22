// vmk_3.dcr /  / t_iEntityID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_iEntityID(_me: LingoMe, date: LingoValue, t_iRequiredLevel: LingoValue, t_iItemCode: LingoValue, t_iAvatarLevel: LingoValue) {
  if (lingoBinary("eq", t_iRequiredLevel, "trade.dialog.oppositeGender")) {
  if (lingoBinary("eq", t_iItemCode, symbol("_AvatarChat"))) {
  callMethod("t_iUpdatedPinRef", date.t_mp_sGroup_rItem, t_iAvatarLevel, 1)
  }

  } else {
  if (lingoBinary("eq", t_iItemCode, "ItemsDeletedFromHk")) {
  }

  }

  callNamed("stage", lingoBinary("join", "Unknown Dialog Window", t_iRequiredLevel))
}

