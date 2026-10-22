// vmk_hm_minigame.cct / CHMGameInterface / HideIdleKickWarning

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideIdleKickWarning(_me: LingoMe) {
  if (callNamed("DialogWindowExists", meProp(_me, "m_sKickWarningDlg"))) {
  callNamed("removeDialogWindow", meProp(_me, "m_sKickWarningDlg"))
  }

}

