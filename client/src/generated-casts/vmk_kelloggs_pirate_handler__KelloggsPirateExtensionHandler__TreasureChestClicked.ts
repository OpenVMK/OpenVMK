// vmk_kelloggs_pirate_handler.cct / KelloggsPirateExtensionHandler / TreasureChestClicked

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TreasureChestClicked(_me: LingoMe, itemRef: LingoValue) {
  var tMsg = new LingoPropList([symbol("int"), itemRef, symbol("int"), 0]);
  callMethod("send", callNamed("getConnection", "VMK"), 584, tMsg)
}

