// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / createComponentWindowWithFeatures

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createComponentWindowWithFeatures(_me: LingoMe, a_mpSpaceListFeat: LingoValue, a_mpSpaceList: LingoValue) {
  callMethod("createComponentWindow", _me, a_mpSpaceListFeat, undefined)
  callMethod("createComponentWindow", _me, a_mpSpaceList, 1)
}

