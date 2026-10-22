// d1ee027a52e24196484455ed8484679f.cct / CDialogWindow / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, t_iClientID: LingoValue, t_sDialogTitle: LingoValue, t_iType: LingoValue, t_bModal: LingoValue) {
  setMeProp(_me, "m_iClientID", t_iClientID);
  setMeProp(_me, "m_sDialogTitle", t_sDialogTitle);
  setMeProp(_me, "m_wWindowTitle", lingoBinary("join", meProp(_me, "m_sDialogTitle"), "_window"));
  if ((lingoTruthy(callNamed("voidp", t_iType)) ? 0 : 1)) {
  setMeProp(_me, "m_iType", callNamed("max", callNamed("min", 3, t_iType), 1));
  }

  if ((lingoTruthy(callNamed("voidp", t_bModal)) ? 0 : 1)) {
  setMeProp(_me, "m_bModal", t_bModal);
  }

  switch (meProp(_me, "m_iType")) {
case 1:
  setMeProp(_me, "m_currentView", "vmk_basic_1.window");
  break;
case 2:
  setMeProp(_me, "m_currentView", "vmk_basic_2.window");
  break;
case 3:
  setMeProp(_me, "m_currentView", "vmk_basic_3.window");
  break;
case 4:
  setMeProp(_me, "m_currentView", "vmk_basic_4.window");
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Dialog Window: unknow type", meProp(_me, "m_iType")))
  }

}

