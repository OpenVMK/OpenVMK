// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CTutorialWindow / eventProcMessenger

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcMessenger(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  var passEvent = 1;
  var tObject = callMethod("get", callNamed("getObjectManager"), meProp(_me, "m_iClientID"));
  if (lingoBinary("eq", tObject, 0)) {
  passEvent = 0;
  } else {
  if (lingoBinary("eq", callMethod("getOne", callMethod("handlers", tObject), symbol("tutorialWindowEvent")), 0)) {
  passEvent = 0;
  }

  }

  switch (tElemID) {
case "close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  if (passEvent) {
  callNamed("call", symbol("dialogWindowEvent"), tObject, meProp(_me, "m_sTutorialTitle"), "close")
  }

  callNamed("removeTutorialWindow", meProp(_me, "m_sTutorialTitle"))
  break;
case "tutorial.more":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  if (passEvent) {
  callNamed("call", symbol("tutorialWindowEvent"), tObject, meProp(_me, "m_sTutorialTitle"), symbol("tutorialMore"), meProp(_me, "m_sHelpLink"))
  }

  callNamed("removeTutorialWindow", meProp(_me, "m_sTutorialTitle"))
  break;
case "tutorial.ok":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  if (passEvent) {
  callNamed("call", symbol("tutorialWindowEvent"), tObject, meProp(_me, "m_sTutorialTitle"), symbol("tutorialOK"), (lingoTruthy(meProp(_me, "m_bTutorialCheckBox")) ? 0 : 1))
  }

  callNamed("removeTutorialWindow", meProp(_me, "m_sTutorialTitle"))
  break;
case "tutorial.off":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  setMeProp(_me, "m_bTutorialCheckBox", (lingoTruthy(meProp(_me, "m_bTutorialCheckBox")) ? 0 : 1));
  if (passEvent) {
  }

  callMethod("setCheckBoxState", _me)
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  if (passEvent) {
  callNamed("call", symbol("dialogWindowEvent"), tObject, meProp(_me, "m_sTutorialTitle"), "help")
  }

  callNamed("executeMessage", symbol("ui_help"))
  break;
case "selector.jc":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  if (passEvent) {
  callNamed("call", symbol("tutorialWindowEvent"), tObject, meProp(_me, "m_sTutorialTitle"), symbol("link1"))
  }

  callNamed("removeTutorialWindow", meProp(_me, "m_sTutorialTitle"))
  break;
case "selector.fw":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  if (passEvent) {
  callNamed("call", symbol("tutorialWindowEvent"), tObject, meProp(_me, "m_sTutorialTitle"), symbol("link2"))
  }

  callNamed("removeTutorialWindow", meProp(_me, "m_sTutorialTitle"))
  break;
case "selector.potc":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  if (passEvent) {
  callNamed("call", symbol("tutorialWindowEvent"), tObject, meProp(_me, "m_sTutorialTitle"), symbol("link3"))
  }

  callNamed("removeTutorialWindow", meProp(_me, "m_sTutorialTitle"))
  break;
case "selector.hm":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  if (passEvent) {
  callNamed("call", symbol("tutorialWindowEvent"), tObject, meProp(_me, "m_sTutorialTitle"), symbol("link4"))
  }

  callNamed("removeTutorialWindow", meProp(_me, "m_sTutorialTitle"))
  break;
  }

  }

  if (lingoBinary("and", lingoBinary("eq", tEvent, symbol("mouseEnter")), lingoBinary("contains", tElemID, "shortcut."))) {
  tElemID = lingoBinary("join", "selector", callNamed("chars", tElemID, "shortcut.".length, tElemID.length));
  var tHighLighter = callMethod("getElement", tWndObj, tElemID);
  if (callNamed("objectp", tHighLighter)) {
  callMethod("show", tHighLighter)
  }

  }

  if (lingoBinary("and", lingoBinary("eq", tEvent, symbol("mouseLeave")), lingoBinary("contains", tElemID, "selector."))) {
  tHighLighter = callMethod("getElement", tWndObj, tElemID);
  if (callNamed("objectp", tHighLighter)) {
  callMethod("hide", tHighLighter)
  }

  }

}

