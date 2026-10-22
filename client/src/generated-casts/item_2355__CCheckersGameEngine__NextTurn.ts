// item_2355.cct / CCheckersGameEngine / NextTurn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NextTurn(_me: LingoMe, _this: LingoValue, a_iAvatarRef: LingoValue, a_rMsg: LingoValue) {
  callMethod("HideAllowedMoves", _this)
  callMethod("ClearAllowedMoves", _this)
  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  callMethod("ShowTurn", meProp(_me, "m_rInterface"), a_iAvatarRef)
  var t_iWhosTurn = callMethod("GetPlayerIndexByAvatarRef", _this, a_iAvatarRef);
  if (lingoBinary("eq", meProp(_me, "m_iOwnPlayer"), t_iWhosTurn)) {
  if (lingoBinary("eq", meProp(_me, "m_iWhosTurn"), t_iWhosTurn)) {
  callMethod("showmessage", meProp(_me, "m_rInterface"), callNamed("getText", "checkers.your.turn.again"))
  } else {
  callMethod("showmessage", meProp(_me, "m_rInterface"), callNamed("getText", "checkers.your.turn"))
  }

  } else {
  callMethod("showmessage", meProp(_me, "m_rInterface"), callNamed("getText", "checkers.others.turn"))
  }

  }

  setMeProp(_me, "m_iWhosTurn", t_iWhosTurn);
}

