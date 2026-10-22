// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep1 / saveCurrentDataToOwner

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function saveCurrentDataToOwner(_me: LingoMe) {
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  var t_rOwner = callMethod("GetOwner", t_rManager);
  }

  if (callNamed("objectp", t_rOwner)) {
  }

}

