// d1ee027a52e24196484455ed8484679f.cct / CDialogWindow / eventProcMessenger

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcMessenger(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_wWindowTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  var passEvent = 1;
  var tObject = callMethod("get", callNamed("getObjectManager"), meProp(_me, "m_iClientID"));
  if (lingoBinary("eq", tObject, 0)) {
  passEvent = 0;
  } else {
  if (lingoBinary("eq", callMethod("getOne", callMethod("handlers", tObject), symbol("dialogWindowEvent")), 0)) {
  callNamed("put", lingoBinary("join", lingoBinary("join", "[DialogWindow Notice] ", tObject), " Missing #dialogWindowEvent-handler"))
  passEvent = 0;
  }

  }

  switch (tElemID) {
case "close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  if (passEvent) {
  callNamed("call", symbol("dialogWindowEvent"), tObject, meProp(_me, "m_sDialogTitle"), "close")
  }

  callNamed("removeDialogWindow", meProp(_me, "m_sDialogTitle"))
  break;
case "basic.dialog.button1":
case "basic.dialog1.button1":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  if (passEvent) {
  if (meProp(_me, "m_bSpecialEvents")) {
  callNamed("call", symbol("dialogWindowEvent"), tObject, meProp(_me, "m_sDialogTitle"), callMethod("getaProp", meProp(_me, "m_pTexts")[symbol("btn1")], symbol("eventID")), callMethod("getaProp", meProp(_me, "m_pTexts")[symbol("btn1")], symbol("data")))
  } else {
  callNamed("call", symbol("dialogWindowEvent"), tObject, meProp(_me, "m_sDialogTitle"), symbol("dialogCancel"))
  }

  }

  callNamed("removeDialogWindow", meProp(_me, "m_sDialogTitle"))
  break;
case "basic.dialog.button2":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  if (passEvent) {
  if (meProp(_me, "m_bSpecialEvents")) {
  callNamed("call", symbol("dialogWindowEvent"), tObject, meProp(_me, "m_sDialogTitle"), callMethod("getaProp", meProp(_me, "m_pTexts")[symbol("btn2")], symbol("eventID")), callMethod("getaProp", meProp(_me, "m_pTexts")[symbol("btn2")], symbol("data")))
  } else {
  callNamed("call", symbol("dialogWindowEvent"), tObject, meProp(_me, "m_sDialogTitle"), symbol("dialogOK"))
  }

  }

  callNamed("removeDialogWindow", meProp(_me, "m_sDialogTitle"))
  break;
case "basic.dialog.button3":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  if (passEvent) {
  if (meProp(_me, "m_bSpecialEvents")) {
  callNamed("call", symbol("dialogWindowEvent"), tObject, meProp(_me, "m_sDialogTitle"), callMethod("getaProp", meProp(_me, "m_pTexts")[symbol("btn3")], symbol("eventID")), callMethod("getaProp", meProp(_me, "m_pTexts")[symbol("btn3")], symbol("data")))
  } else {
  callNamed("call", symbol("dialogWindowEvent"), tObject, meProp(_me, "m_sDialogTitle"), symbol("dialogAlternative"))
  }

  }

  callNamed("removeDialogWindow", meProp(_me, "m_sDialogTitle"))
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("executeMessage", symbol("open_help_page"), "help.dialog.windows")
  if (passEvent) {
  callNamed("call", symbol("dialogWindowEvent"), tObject, meProp(_me, "m_sDialogTitle"), "help")
  }

  break;
  break;
  }

  }

}

