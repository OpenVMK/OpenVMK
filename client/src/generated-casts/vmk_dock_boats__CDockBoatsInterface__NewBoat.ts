// vmk_dock_boats.cct / CDockBoatsInterface / NewBoat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NewBoat(_me: LingoMe, a_iBoatColor: LingoValue, a_ar_iAvatarFigure: LingoValue, a_iAnimationAge: LingoValue) {
  var t_objAnimator = callNamed("createObject", symbol("temp"), "CAvatarAnimator");
  callMethod("setCallback", t_objAnimator, callMethod("getID", _me), symbol("ImageDone"), new LingoList([a_iBoatColor, a_ar_iAvatarFigure, a_iAnimationAge]))
  var t_mp_data = new LingoPropList([symbol("outlook"), a_ar_iAvatarFigure, symbol("tilesize"), 32]);
  callMethod("Define", t_objAnimator, t_mp_data)
  var t_mp_data2 = new LingoPropList([symbol("head"), 1, symbol("body"), 1, symbol("emoticon"), 0, symbol("LeftHand"), 100, symbol("RightHand"), 100, symbol("legs"), 0, symbol("magic"), 0]);
  callMethod("SetAction", t_objAnimator, t_mp_data2)
}

