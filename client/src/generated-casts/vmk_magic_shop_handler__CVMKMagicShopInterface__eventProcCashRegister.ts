// vmk_magic_shop_handler.cct / CVMKMagicShopInterface / eventProcCashRegister

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcCashRegister(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  callNamed("put", tEvent, tElemID, tParm)
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  callNamed("put", lingoBinary("joinPad", "Clicked", new LingoList([tEvent, tElemID, tParm])))
  switch (tElemID) {
case "magicshop_1_cl":
  callNamed("executeMessage", "casual_game_interface", 1, symbol("score"))
  break;
case "magicshop_2_cl":
  callNamed("executeMessage", "casual_game_interface", 1, symbol("play"))
  break;
case "magicshop_3_cl":
  callNamed("executeMessage", "casual_game_interface", 1, symbol("watch"))
  break;
case "magicshop_4_cl":
  if (theProperty("doubleClick")) {
  callMethod("cashRegisterClicked", callMethod("getHandler", _me))
  }

  break;
  }

  }

}

