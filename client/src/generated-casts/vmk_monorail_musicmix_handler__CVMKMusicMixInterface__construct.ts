// vmk_monorail_musicmix_handler.cct / CVMKMusicMixInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("enterRoom"))
  callNamed("registerMessage", "TrainStartSong", callMethod("getID", _me), symbol("showScroller"))
  callNamed("registerMessage", "TrainEndSong", callMethod("getID", _me), symbol("hideScroller"))
  setMeProp(_me, "m_pTextScroller", 0);
  setMeProp(_me, "m_pTextScrollerHolder", 0);
  setMeProp(_me, "m_sPopupWndTitle", "VMK Music Mix Player");
  setMeProp(_me, "m_pPlayerPopup", 0);
  return 1;
}

