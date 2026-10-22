// d0e535313898676eb605277339b50f27.cct / CEmoticons / eventProcEmoticons

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcEmoticons(_me: LingoMe, _this: LingoValue, tEvent: LingoValue, tElemID: LingoValue, tParam: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "emoticons.grid":
  if (theProperty("doubleClick")) {
  callMethod("ShowEmotInfo", _this, tParam, 1)
  } else {
  callMethod("ShowEmotInfo", _this, tParam, 0)
  }

  break;
case "emoticons.wave.button":
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "StartAction", new LingoPropList([symbol("int"), 1]))
  callMethod("showHideEmoticons", _this)
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  break;
case "emoticons.dance.button":
  setMeProp(_me, "m_bDanceState", (lingoTruthy(meProp(_me, "m_bDanceState")) ? 0 : 1));
  if (meProp(_me, "m_bDanceBtnState")) {
  if (meProp(_me, "m_bDanceState")) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "StartAction", new LingoPropList([symbol("int"), 0]))
  } else {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "StopAction", new LingoPropList([symbol("int"), 0]))
  }

  }

  callMethod("showHideEmoticons", _this)
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.chat.emotes")
  break;
case "close":
  callMethod("showHideEmoticons", _this)
  break;
  }

  return 1;
  }

}

