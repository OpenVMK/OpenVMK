// vmk_hm_lobby_handler.cct / CHMLobbyInterface / DisableStartAndMoreRooms

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DisableStartAndMoreRooms(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sGamelistWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  callMethod("deactivate", callMethod("getElement", tWndObj, "button.newgame"))
  callMethod("deactivate", callMethod("getElement", tWndObj, "button.moregames"))
  }

}

