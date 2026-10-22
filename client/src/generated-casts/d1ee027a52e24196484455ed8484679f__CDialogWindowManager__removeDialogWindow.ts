// d1ee027a52e24196484455ed8484679f.cct / CDialogWindowManager / removeDialogWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeDialogWindow(_me: LingoMe, t_sDialogTitle: LingoValue) {
  var t_uniqID = t_sDialogTitle;
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_pDialogWindows"), t_uniqID))) ? 0 : 1)) {
  callMethod("hide", meProp(_me, "m_pDialogWindows")[t_uniqID])
  callMethod("deleteProp", meProp(_me, "m_pDialogWindows"), t_uniqID)
  if (lingoBinary("neq", callNamed("getObject", t_uniqID), 0)) {
  callNamed("removeObject", t_uniqID)
  }

  return 1;
  }

  return 0;
}

