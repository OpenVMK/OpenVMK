// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemSound / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callMethod("StopSound", _this)
  var t_ar_check = new LingoList([]);
  callNamed("executeMessage", "countSoundItems", t_ar_check)
  if (lingoBinary("eq", t_ar_check.count, 1)) {
  callNamed("executeMessage", "ControlRoomMusic", 1)
  }

  callNamed("unregisterObject", callMethod("getID", _this))
  callNamed("callAncestor", symbol("deconstruct"), _this)
  return 1;
}

