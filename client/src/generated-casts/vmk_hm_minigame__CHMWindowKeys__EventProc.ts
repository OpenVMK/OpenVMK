// vmk_hm_minigame.cct / CHMWindowKeys / EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowName"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "hm.help":
  callNamed("executeMessage", symbol("open_help_page"), "help.games.hauntedmansion")
  callNamed("removeWindow", meProp(_me, "m_sWindowName"))
  break;
case "hm.close":
case "cancel.button":
  callNamed("removeWindow", meProp(_me, "m_sWindowName"))
  break;
case "hm.defaultkeys":
  var t_ar_directions = new LingoList([0, 1, 2, 3, 4, 5, 6, 7]);
  callMethod("SetMoveDirections", meProp(_me, "m_rClient"), t_ar_directions)
  callMethod("setClientKeyConfiguration", meProp(_me, "m_rClient"), 1)
  callNamed("removeWindow", meProp(_me, "m_sWindowName"))
  break;
case "hm.alternativekeys":
  t_ar_directions = new LingoList([7, 0, 1, 2, 3, 4, 5, 6, 7]);
  callMethod("SetMoveDirections", meProp(_me, "m_rClient"), t_ar_directions)
  callMethod("setClientKeyConfiguration", meProp(_me, "m_rClient"), 2)
  callNamed("removeWindow", meProp(_me, "m_sWindowName"))
  break;
  break;
  }

  }

}

