// vmk_tutorial.cct / CAlbumWindow / EventProcAlbum

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProcAlbum(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "button.arrowprev.active":
  if ((lingoTruthy(lingoBinary("eq", meProp(_me, "m_currentView"), "vmk_jc_photos.window")) ? 0 : 1)) {
  callMethod("changeView", _me, "vmk_jc_photos.window")
  } else {
  setMeProp(_me, "m_offset", lingoBinary("sub", meProp(_me, "m_offset"), 4));
  if (lingoBinary("lt", meProp(_me, "m_offset"), 1)) {
  setMeProp(_me, "m_offset", 1);
  }

  setMeProp(_me, "m_page", lingoBinary("sub", meProp(_me, "m_page"), 1));
  }

  callMethod("PopulatePhotos", _me)
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  break;
case "button.arrownext.active":
  if (lingoBinary("lte", lingoBinary("add", meProp(_me, "m_offset"), 4), meProp(_me, "m_ar_photos").count)) {
  setMeProp(_me, "m_offset", lingoBinary("add", meProp(_me, "m_offset"), 4));
  setMeProp(_me, "m_page", lingoBinary("add", meProp(_me, "m_page"), 1));
  callMethod("PopulatePhotos", _me)
  } else {
  callMethod("changeView", _me, "vmk_jc_statistics.window")
  }

  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  break;
case "button.jccancel.active":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", meProp(_me, "m_sWindowTitle"))
  callNamed("executeMessage", symbol("SendMinigameAction"), 6, new LingoList([]))
  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.games.jungle")
  break;
  }

  }

}

