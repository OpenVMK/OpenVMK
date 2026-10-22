// vmk_monorail_musicmix_handler.cct / CVMKMusicMixInterface / openMusicPlayer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function openMusicPlayer(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "m_pPlayerPopup"), 0)) {
  setMeProp(_me, "m_pPlayerPopup", callMethod("createPlayer", _me));
  }

  if (lingoBinary("neq", meProp(_me, "m_pPlayerPopup"), 0)) {
  if (callMethod("getPlayerState", callMethod("getComponent", _me))) {
  if ((lingoTruthy(meProp(_me, "m_pPlayerPopup").m_bVisible) ? 0 : 1)) {
  callMethod("show", meProp(_me, "m_pPlayerPopup"))
  }

  }

  }

}

