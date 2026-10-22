// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CTutorialWindow / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_currentView", "vmk_tutorial.window");
  setMeProp(_me, "m_sTutorialTitle", "TutorialWindow");
  setMeProp(_me, "m_sWindowTitle", lingoBinary("join", meProp(_me, "m_sTutorialTitle"), "_window"));
  setMeProp(_me, "m_iType", 2);
  setMeProp(_me, "m_bModal", 0);
  setMeProp(_me, "m_bShowMore", 0);
  setMeProp(_me, "m_sHelpLink", "");
  setMeProp(_me, "m_iClientID", 0);
  setMeProp(_me, "m_pTexts", new LingoPropList([]));
  setMeProp(_me, "m_bTutorialCheckBox", (lingoTruthy(callMethod("get", callNamed("getObject", symbol("session")), "tutorial")) ? 0 : 1));
  return 1;
}

