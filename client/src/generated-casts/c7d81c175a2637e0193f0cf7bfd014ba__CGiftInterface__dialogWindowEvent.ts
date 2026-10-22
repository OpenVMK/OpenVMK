// c7d81c175a2637e0193f0cf7bfd014ba.cct / CGiftInterface / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, a_sDialogName: LingoValue, a_sDialogEvent: LingoValue) {
  switch (a_sDialogEvent) {
case symbol("dialogOK"):
case symbol("dialogOK"):
case symbol("dialogOK"):
  callMethod("SendData", _me)
  break;
case symbol("dialogCancel"):
  break;
  break;
  break;
  }

}

