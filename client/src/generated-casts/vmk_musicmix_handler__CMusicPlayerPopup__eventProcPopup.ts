// vmk_musicmix_handler.cct / CMusicPlayerPopup / eventProcPopup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcPopup(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  var receiverEvent = symbol("popupWindowEvent");
  var passEvent = 1;
  var tObject = callMethod("get", callNamed("getObjectManager"), meProp(_me, "m_iClientID"));
  if (lingoBinary("eq", tObject, 0)) {
  passEvent = 0;
  } else {
  if (lingoBinary("eq", callMethod("getOne", callMethod("handlers", tObject), receiverEvent), 0)) {
  passEvent = 0;
  }

  }

  switch (tElemID) {
case "close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("hide", _me)
  break;
case "musicmix.dontperform.button":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("CancelPlaySong"))
  callMethod("hide", _me)
  break;
case "musicmix.playsong.button":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  var t_Song = callMethod("getSelectedSong", meProp(_me, "m_pSongList"));
  if (lingoBinary("neq", t_Song, 0)) {
  var t_ID = callMethod("getID", t_Song);
  callNamed("executeMessage", symbol("RequestPlaySong"), t_ID)
  }

  callMethod("hide", _me)
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("executeMessage", symbol("ui_help"))
  break;
  }

  }

}

