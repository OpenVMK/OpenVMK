// vmk_monorail_train_handler.cct / CMonorailTrainInterface / displayNextStop

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function displayNextStop(_me: LingoMe, _station: LingoValue) {
  if (meProp(_me, "m_bAllowMusic")) {
  switch (_station) {
case "Main Street":
  callNamed("executeMessage", "PlayInterfaceSound", "MRVO-nextstop-mainstreet")
  break;
case "Adventureland":
  callNamed("executeMessage", "PlayInterfaceSound", "MRVO-nextstop-adventureland")
  break;
case "Frontierland":
  callNamed("executeMessage", "PlayInterfaceSound", "MRVO-nextstop-frontierland")
  break;
case "Fantasyland":
  callNamed("executeMessage", "PlayInterfaceSound", "MRVO-nextstop-fantasyland")
  break;
case "Tomorrowland":
  callNamed("executeMessage", "PlayInterfaceSound", "MRVO-nextstop-tomorroland")
  break;
  }

  }

  var t_sText = lingoBinary("joinPad", "Next stop:", _station);
  callMethod("displayText", _me, t_sText)
}

