// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CDialogWindow / NPCDialogWindowExists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NPCDialogWindowExists(_me: LingoMe, t_sTitle: LingoValue) {
  return callMethod("NPCdialogExists", callMethod("getComponent", callNamed("getThread", "DialogWindow")), t_sTitle);
}

