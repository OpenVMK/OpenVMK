// d1ee027a52e24196484455ed8484679f.cct / CDialogWindowManager / createNPCDialogWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createNPCDialogWindow(_me: LingoMe, t_clientID: LingoValue, t_sDialogTitle: LingoValue, t_dialogType: LingoValue, t_modal: LingoValue) {
  var t_dialogWindow = callNamed("createObject", t_sDialogTitle, "CNPCDialogWindow");
  if (lingoBinary("neq", t_dialogWindow, 0)) {
  callMethod("Init", t_dialogWindow, t_clientID, t_sDialogTitle, t_dialogType, t_modal)
  meProp(_me, "m_pNPCDialogWindows")[t_sDialogTitle] = t_dialogWindow;
  }

  return t_dialogWindow;
}

