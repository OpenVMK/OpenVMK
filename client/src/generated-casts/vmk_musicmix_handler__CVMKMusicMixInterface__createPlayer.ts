// vmk_musicmix_handler.cct / CVMKMusicMixInterface / createPlayer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createPlayer(_me: LingoMe) {
  var t_pPlayerPopup = callNamed("createObject", "Music Player Popup", "CMusicPlayerPopup");
  if (lingoBinary("neq", t_pPlayerPopup, 0)) {
  callMethod("Init", t_pPlayerPopup, callMethod("getID", _me))
  return t_pPlayerPopup;
  }

  return 0;
}

