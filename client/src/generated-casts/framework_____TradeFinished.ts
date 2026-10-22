// framework.dcr /  / _TradeFinished

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TradeFinished(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var ShowSellRequest = callMethod("pinlevel", ref.entityID);
  var t_iTyp = callMethod("pinlevel", ref.entityID);
  var t_iPrc = callMethod("removeObject", ref.entityID);
  var getText = callMethod("removeObject", ref.entityID);
  if (lingoBinary("eq", t_iTyp, -float(1))) {
  callMethod("t_sTrgGrp", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), 3), symbol("t_rTargetMap"), ShowSellRequest, t_iPrc)
  }

  callMethod("getInterface", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), 3), symbol("t_rTargetMap"), ShowSellRequest, callMethod("t_sItemGroup", callMethod("t_iRef", objectp), 1), symbol("t_rTargetMap"), t_iTyp, t_iPrc, getText)
}

