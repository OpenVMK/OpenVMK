// vmk_monorail_train_handler.cct / CMonorailTrainHandler / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_mp_PossibleStops", new LingoPropList([20, "Main Street", 21, "Adventureland", 22, "Frontierland", 23, "Fantasyland", 24, "Tomorrowland", 92, "New Orleans Square"]));
  setMeProp(_me, "m_currentStop", "");
  callMethod("regMsgList", _me, 1)
  if ((lingoTruthy(callNamed("variableExists", "MonorailState")) ? 0 : 1)) {
  callNamed("createVariable", "MonorailState", 1)
  }

  return 1;
}

