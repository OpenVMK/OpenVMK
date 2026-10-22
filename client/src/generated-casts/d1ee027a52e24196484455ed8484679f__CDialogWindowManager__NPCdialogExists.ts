// d1ee027a52e24196484455ed8484679f.cct / CDialogWindowManager / NPCdialogExists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NPCdialogExists(_me: LingoMe, t_sTitle: LingoValue) {
  return (lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_pNPCDialogWindows"), t_sTitle))) ? 0 : 1);
}

