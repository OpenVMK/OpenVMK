// item_2355.cct / CCheckersGameInterface / NotifyGameEnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NotifyGameEnd(_me: LingoMe, _this: LingoValue, a_iWinnerRef: LingoValue) {
  var t_rSound = callNamed("getObject", meProp(_me, "m_sSound"));
  if (callNamed("objectp", t_rSound)) {
  callMethod("StopSound", t_rSound)
  }

  callNamed("unregisterMessage", "ResetRoomSound", callMethod("getID", _this))
  var t_iIndex = callMethod("GetPlayerIndexByAvatarRef", meProp(_me, "m_rEngine"), a_iWinnerRef);
  var t = callNamed("createObject", callNamed("getUniqueID"), "CCheckersGameDialog");
  callMethod("delay", t, 5000, symbol("Destroy"))
  switch (t_iIndex) {
case -float(1):
case 0:
  callMethod("open", t, "vmk_checkers_gameover_draw.window")
  break;
case 1:
  callMethod("open", t, "vmk_checkers_gameover_blue.window")
  break;
case 2:
  callMethod("open", t, "vmk_checkers_gameover_red.window")
  break;
  break;
  }

  if (lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iOwnPlayer"), a_iWinnerRef), lingoBinary("eq", meProp(_me, "m_kGameMode"), symbol("watch")))) {
  callNamed("executeMessage", "PlayFxSound", "checkers-win")
  } else {
  callNamed("executeMessage", "PlayFxSound", "checkers-loose")
  }

}

