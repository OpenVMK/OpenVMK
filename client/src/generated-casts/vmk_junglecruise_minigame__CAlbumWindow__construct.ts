// vmk_junglecruise_minigame.cct / CAlbumWindow / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_page", 1);
  setMeProp(_me, "m_offset", 1);
  setMeProp(_me, "m_ar_photos", new LingoList([]));
  setMeProp(_me, "m_mp_stats", new LingoPropList([symbol("shots"), 0, symbol("accuracy"), 0, symbol("fuel"), 0, symbol("bumps"), 0]));
  setMeProp(_me, "m_sWindowTitle", "JungleCruisePhotoAlbum");
  setMeProp(_me, "m_currentView", "vmk_jc_photos.window");
  callMethod("changeView", _me, "vmk_jc_photos.window")
  setMeProp(_me, "m_iTotalScore", 0);
  callMethod("updateTotalScore", _me)
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("hideJCAlbum"))
  return 1;
}

