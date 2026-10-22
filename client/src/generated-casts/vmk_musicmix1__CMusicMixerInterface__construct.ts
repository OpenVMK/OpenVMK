// vmk_musicmix1.cct / CMusicMixerInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sWindowID", "MusicMixer");
  var m_i_DataDone = 0;
  var pPropsToServer = new LingoPropList([]);
  var pPartChangeButtons = new LingoPropList([]);
  setMeProp(_me, "m_arMuteStates", new LingoList([0, 0, 0, 0]));
  var m_ar_BodyPartList = new LingoList([]);
  var m_ar_BodyPartObjects = new LingoPropList([]);
  var m_TmrPointer = "MixerPointer";
  setMeProp(_me, "m_iListCount", 17);
  setMeProp(_me, "m_iPointerLoc", 57);
  setMeProp(_me, "m_ar_trackClickBuffer", new LingoList([]));
  setMeProp(_me, "m_iDoubleClickDelta", 250);
  callNamed("registerMessage", "ui_MusicMixer", callMethod("getID", _me), symbol("showHideMusicMixer"))
  setMeProp(_me, "m_pPopup", 0);
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("all"), 0]))
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("navigator"), 1]))
  callNamed("executeMessage", symbol("MinigameState"), symbol("running"))
  return 1;
}

