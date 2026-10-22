// vmk_mystics.cct / CRoomVisualAvatar / SetOutlook

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetOutlook(_me: LingoMe, _this: LingoValue, a_ar_AvatarOutlook: LingoValue) {
  setMeProp(_me, "m_ar_AvatarOutlook", a_ar_AvatarOutlook);
  for (var t_iCloth of _this.m_ar_AvatarOutlook.toArray()) {
  callMethod("LoadCastLibsForCloth", callNamed("getThread", symbol("AvatarFactory")).component.m_rClothAssetManager, _this, t_iCloth)
  }

}

