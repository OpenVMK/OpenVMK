// vmk_kelloggs_pirate_handler.cct / KelloggsPirateExtensionInterface / CloseKellogs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CloseKellogs(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_sKelloggsWindowTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sKelloggsWindowTitle"))
  }

}

