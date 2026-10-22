// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialComponent / openTutorialDialogWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function openTutorialDialogWindow(_me: LingoMe, t_mp_DialogWindow: LingoValue) {
  if (callNamed("objectp", t_mp_DialogWindow)) {
  if (lingoBinary("neq", callMethod("getOne", callMethod("handlers", t_mp_DialogWindow), symbol("show")), 0)) {
  callMethod("show", t_mp_DialogWindow)
  } else {
  callNamed("put", "Could not open Tutorial Dialog")
  }

  }

}

