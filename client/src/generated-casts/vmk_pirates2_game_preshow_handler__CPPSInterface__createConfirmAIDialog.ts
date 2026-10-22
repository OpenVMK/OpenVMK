// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / createConfirmAIDialog

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createConfirmAIDialog(_me: LingoMe, i_iGameID: LingoValue, i_iTeamID: LingoValue, i_iCost: LingoValue) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "pirates_confirm_ai_player", 2);
  callMethod("show", t)
  var t_ar_btnShip1 = new LingoPropList([symbol("text"), "OK", symbol("eventID"), symbol("Ok"), symbol("data"), new LingoList([i_iGameID, i_iTeamID, i_iCost])]);
  var t_ar_btnShip2 = new LingoPropList([symbol("text"), "CANCEL", symbol("eventID"), symbol("cancel"), symbol("data"), undefined]);
  var t_txt = callNamed("getText", "pirates.create.aiplayer");
  callMethod("setText", t, t_txt, callNamed("getText", "pirates.game.name"), t_ar_btnShip2, t_ar_btnShip1)
}

