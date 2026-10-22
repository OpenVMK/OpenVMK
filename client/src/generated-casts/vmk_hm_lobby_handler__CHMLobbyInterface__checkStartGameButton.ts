// vmk_hm_lobby_handler.cct / CHMLobbyInterface / checkStartGameButton

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkStartGameButton(_me: LingoMe) {
  var t_bStartOK = 0;
  var tCountLeft = 0;
  var tCountRight = 0;
  var tMyGame = callMethod("GetMyGame", meProp(_me, "m_rLobby"));
  if (callNamed("objectp", tMyGame)) {
  for (var tParticipant of callMethod("GetParticipants", tMyGame).toArray()) {
  switch (callMethod("GetParameterValue", tParticipant, "Team")) {
case 1:
  tCountLeft = lingoBinary("add", tCountLeft, 1);
  break;
case 2:
  tCountRight = lingoBinary("add", tCountRight, 1);
  break;
  }

  }

  }

  if (lingoBinary("and", lingoBinary("gt", tCountLeft, 0), lingoBinary("gt", tCountRight, 0))) {
  t_bStartOK = 1;
  }

  if (lingoBinary("eq", theProperty("runMode"), "Author")) {
  t_bStartOK = 1;
  }

  callMethod("setButtonState", _me, meProp(_me, "m_sGamePrestartDlgWndTitle"), "button.hm.startnow", t_bStartOK)
}

