// vmk_jungle_cruise.cct / CJungleCruiseComponent / GoToAlbumView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GoToAlbumView(_me: LingoMe) {
  callNamed("executeMessage", symbol("ui_show"))
  callNamed("executeMessage", symbol("SendMinigameAction"), 6, new LingoList([]))
  callNamed("createObject", "JCAlbumView", "CAlbumWindow")
  var tAlbum = callNamed("getObject", "JCAlbumView");
  callMethod("SetPhotos", tAlbum, meProp(_me, "m_ar_photoAlbum"))
  callMethod("PopulatePhotos", tAlbum, 1)
  setMeProp(_me, "m_gameOn", 0);
  if (lingoBinary("neq", meProp(_me, "m_stage"), 0)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_stage")))
  }

  setMeProp(_me, "m_stage", 0);
  callMethod("SetParam", meProp(_me, "m_boat"), "Stage", undefined)
  callMethod("UnprepareRoom", _me)
}

