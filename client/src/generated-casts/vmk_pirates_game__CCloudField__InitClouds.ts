// vmk_pirates_game.cct / CCloudField / InitClouds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitClouds(_me: LingoMe, a_iCount: LingoValue) {
  setMeProp(_me, "m_ar_clouds", new LingoList([]));
  for (var i = 1; i <= a_iCount; ++i) {
  callMethod("CreateCloud", _me)
  }

  callNamed("receiveUpdate", callMethod("getID", _me))
}

