// vmk_magic_shop_handler.cct / CVMKMagicShopInterface / initCashRegisters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initCashRegisters(_me: LingoMe) {
  setMeProp(_me, "m_cashRegisterSprites", new LingoList([]));
  var tSpriteNames = new LingoList(["magicshop_1_cl", "magicshop_2_cl", "magicshop_3_cl", "magicshop_4_cl"]);
  for (var tSprite of tSpriteNames.toArray()) {
  callMethod("createProcedure", _me, tSprite, symbol("eventProcCashRegister"))
  }

}

