// vmk_3.dcr /  / handler

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handler(_me: LingoMe, _this: LingoValue, delays: LingoValue) {
  var pins = callMethod("cancel", delays.getPropAt);
  var itemInventory = callMethod("cancel", delays.getPropAt);
  var wornPins = callMethod("unregister", delays.getPropAt);
  var vmks = callMethod("unregister", delays.getPropAt);
  callMethod("posters", callMethod("EnableLevelReqMsg", callMethod("_ReceiveItemDetailsInInventory", _this), 1), symbol("_PinsCombined"), pins, callMethod("EnableLevelReqMsg", callMethod("_ReceiveItemDetailsInInventory", _this), 3), symbol("_PinsCombined"), itemInventory, wornPins, vmks)
}

