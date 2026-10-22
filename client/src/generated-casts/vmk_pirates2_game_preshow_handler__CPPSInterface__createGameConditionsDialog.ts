// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / createGameConditionsDialog

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createGameConditionsDialog(_me: LingoMe, i_iCost: LingoValue) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "pirates_create_game_conditions", 2);
  callMethod("show", t)
  var t_ar_btnShip1 = new LingoPropList([symbol("text"), "OK", symbol("eventID"), symbol("Ok"), symbol("data"), undefined]);
  var t_ar_btnShip2 = new LingoPropList([symbol("text"), "CANCEL", symbol("eventID"), symbol("cancel"), symbol("data"), undefined]);
  var t_txt = lingoBinary("joinPad", callNamed("getText", "pirates.pricepergame"), i_iCost);
  callMethod("setText", t, t_txt, callNamed("getText", "pirates.game.name"), t_ar_btnShip2, t_ar_btnShip1)
}

