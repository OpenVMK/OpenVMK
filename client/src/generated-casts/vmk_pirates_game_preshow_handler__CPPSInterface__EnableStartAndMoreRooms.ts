// vmk_pirates_game_preshow_handler.cct / CPPSInterface / EnableStartAndMoreRooms

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EnableStartAndMoreRooms(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sGamelistWndTitle"));
  callMethod("Activate", callMethod("getElement", tWndObj, "button.newgame"))
  callMethod("Activate", callMethod("getElement", tWndObj, "button.moregames"))
}

