// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryHandler / HairListForHats

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HairListForHats(_me: LingoMe, tMsg: LingoValue) {
  var t_iLength = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_iHatList = new LingoList([]);
  for (var i = 1; i <= t_iLength; ++i) {
  callMethod("add", t_ar_iHatList, callMethod("GetIntFrom", tMsg.connection))
  }

  callMethod("SetHatList", callMethod("getComponent", _me), t_ar_iHatList)
  setMeProp(_me, "m_bHatListReady", 1);
  callMethod("getAvailableSets", _me)
  return 1;
}

