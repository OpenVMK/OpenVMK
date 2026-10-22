// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorToolHandler / ModerationConfirmation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ModerationConfirmation(_me: LingoMe, _this: LingoValue, a_mpMsg: LingoValue) {
  var tCode = callMethod("GetIntFrom", a_mpMsg.connection);
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "ModerationConfirmationDialog", 1, 0);
  callMethod("show", t)
  var t_sTxt = callNamed("getText", lingoBinary("join", "mods.confirmationdlg.text.", tCode));
  var t_sTitle = callNamed("getText", "mods.confirmationdlg.title");
  callMethod("setText", t, t_sTxt, t_sTitle, callNamed("getText", "mods.confirmationdlg.btnOK"))
}

