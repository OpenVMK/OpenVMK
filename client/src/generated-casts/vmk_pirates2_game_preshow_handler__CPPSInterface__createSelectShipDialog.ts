// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / createSelectShipDialog

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createSelectShipDialog(_me: LingoMe, i_AvatarRef: LingoValue) {
  callNamed("createWindow", meProp(_me, "m_sSelectShipWndTitle"), "vmk_pirates_window.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sSelectShipWndTitle"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  if ((lingoTruthy(callMethod("merge", tWndObj, "vmk_pirates_select_ship.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Unable to merge select ship dialog", symbol("construct"));
  }

  } else {
  return callNamed("error", _me, "Unable to create select ship dialog", symbol("construct"));
  }

  callMethod("setText", callMethod("getElement", tWndObj, "pirates.dialog.hd"), callNamed("getText", "pps_create_new_game"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.shipselector1"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.shipselector2"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.shipselector3"))
  if (lingoBinary("gt", meProp(_me, "m_iShipType"), 0)) {
  var t_iElem = 2;
  switch (meProp(_me, "m_iShipType")) {
case 1:
  t_iElem = 1;
  break;
case 2:
  t_iElem = 2;
  break;
case 3:
  t_iElem = 3;
  break;
  }

  callMethod("show", callMethod("getElement", tWndObj, lingoBinary("join", "pirates.shipselector", t_iElem)))
  }

  setMeProp(_me, "m_iSelectedAvatar", i_AvatarRef);
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("SelectShipDlgEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("center", tWndObj)
  callMethod("show", tWndObj)
}

