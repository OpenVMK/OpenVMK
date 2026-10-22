// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualAvatar / AssetsLoaded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AssetsLoaded(_me: LingoMe, _this: LingoValue, a_iCloth: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rRenderer"))) {
  callMethod("ClothingLoaded", meProp(_me, "m_rRenderer").m_ObjRenderer, a_iCloth)
  }

}

