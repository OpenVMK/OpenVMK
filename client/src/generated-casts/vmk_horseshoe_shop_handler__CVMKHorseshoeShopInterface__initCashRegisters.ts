// vmk_horseshoe_shop_handler.cct / CVMKHorseshoeShopInterface / initCashRegisters

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
  var tSpriteNames = new LingoList(["shop_cash", "shop_cloth"]);
  for (var tSprite of tSpriteNames.toArray()) {
  callMethod("createProcedure", _me, tSprite, symbol("eventProcCashRegister"))
  }

}

