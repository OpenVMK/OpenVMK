// vmk_kelloggs_pirate_handler.cct / KelloggsPirateExtensionInterface / EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  switch (tElemID) {
case "treasure_chest":
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  if (theProperty("doubleClick")) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var tItem = callMethod("Search", tRoomContext, "TYPE", "254");
  if ((lingoTruthy(callNamed("voidp", tItem)) ? 0 : 1)) {
  callMethod("TreasureChestClicked", callMethod("getHandler", _me), callNamed("integer", callMethod("GetParam", tItem, "REF")))
  } else {
  callNamed("put", "The Kelloggs Treasure Chest Item wasn not found")
  }

  }

  }

  break;
case "kelloggs_promo":
  callMethod("showKelloggsWindow", _me, 1)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Treasure Island is listening on something strange:", tElemID))
  }

}

