// d0e535313898676eb605277339b50f27.cct / CSettingsPage / _ChangeSettings

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ChangeSettings(_me: LingoMe, _this: LingoValue, a_sSetting: LingoValue) {
  switch (a_sSetting) {
case "music":
  setMeProp(_me, "m_bMusic", (lingoTruthy(meProp(_me, "m_bMusic")) ? 0 : 1));
  var t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bMusic")))).image;
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "set.disablemusic"), t_Img)
  setMeProp(_me, "m_bChanges", 1);
  break;
case "fx":
  setMeProp(_me, "m_bFx", (lingoTruthy(meProp(_me, "m_bFx")) ? 0 : 1));
  t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bFx")))).image;
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "set.disableeffects"), t_Img)
  setMeProp(_me, "m_bChanges", 1);
  break;
case "ui":
  setMeProp(_me, "m_bUi", (lingoTruthy(meProp(_me, "m_bUi")) ? 0 : 1));
  t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bUi")))).image;
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "set.disableui"), t_Img)
  setMeProp(_me, "m_bChanges", 1);
  break;
case "traderequests":
  setMeProp(_me, "m_bTradeReq", (lingoTruthy(meProp(_me, "m_bTradeReq")) ? 0 : 1));
  t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bTradeReq")))).image;
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "set.traderequests"), t_Img)
  setMeProp(_me, "m_bChanges", 1);
  break;
case "tutorials":
  setMeProp(_me, "m_bTutorial", (lingoTruthy(meProp(_me, "m_bTutorial")) ? 0 : 1));
  t_Img = callNamed("member", callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bTutorial")))).image;
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "set.tutorials"), t_Img)
  setMeProp(_me, "m_bChanges", 1);
  break;
  }

}

