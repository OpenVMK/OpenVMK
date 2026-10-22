// vmk_kelloggs_pirate_handler.cct / KelloggsPirateExtensionHandler / PlaySplash

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySplash(_me: LingoMe) {
  callNamed("executeMessage", "PlayInterfaceSound", "PP-splash")
  callNamed("removeTimeout", symbol("splashSound_timeout"))
}

