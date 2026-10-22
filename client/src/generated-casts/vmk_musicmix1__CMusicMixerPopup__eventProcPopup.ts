// vmk_musicmix1.cct / CMusicMixerPopup / eventProcPopup

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
case "musicmix.cancel.button":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("hide", _me)
  break;
case "musicmix.returntoroom.button":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  if (passEvent) {
  callNamed("call", receiverEvent, tObject, "exit")
  callMethod("hide", _me)
  }

  break;
case "musicmix.edit.button":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  var t_bCreateNew = 1;
  if (lingoBinary("neq", meProp(_me, "m_pSongList"), 0)) {
  if (lingoBinary("neq", callMethod("GetSelected", meProp(_me, "m_pSongList")), 0)) {
  t_bCreateNew = 0;
  }

  }

  if (t_bCreateNew) {
  if (passEvent) {
  callNamed("call", receiverEvent, tObject, "new")
  callMethod("hide", _me)
  }

  } else {
  if (passEvent) {
  callNamed("call", receiverEvent, tObject, "edit", callMethod("GetSelected", meProp(_me, "m_pSongList")))
  callMethod("reset", meProp(_me, "m_pSongList"))
  callMethod("hide", _me)
  }

  }

  break;
case "musicmix.rename.button":
  var t_sSaveDialogName = "MMRenameDialog";
  if (lingoBinary("neq", callNamed("getObject", t_sSaveDialogName), 0)) {
  callNamed("removeObject", t_sSaveDialogName)
  }

  var t_pPopup = callNamed("createObject", t_sSaveDialogName, "CMusicMixerSaveDialog");
  if (lingoBinary("neq", t_pPopup, 0)) {
  callMethod("Init", t_pPopup, callMethod("getID", _me))
  callMethod("editSelectedSong", t_pPopup, callMethod("GetSelected", meProp(_me, "m_pSongList")))
  }

  break;
case "musicmix.delete.button":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  var t_pHelpDialog = callNamed("createDialogWindow", callMethod("getID", _me), "musicmix.dialog.delete.confirm", 2, 1);
  callMethod("show", t_pHelpDialog)
  callMethod("setText", t_pHelpDialog, callNamed("getText", "musicmix.dialog.delete.confirm.text"), callNamed("getText", "musicmix.dialog.delete.confirm.title"), callNamed("getText", "musicmix.dialog.delete.confirm.btn1"), callNamed("getText", "musicmix.dialog.delete.confirm.btn2"))
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("executeMessage", symbol("ui_help"))
  break;
  break;
  }

  }

}

