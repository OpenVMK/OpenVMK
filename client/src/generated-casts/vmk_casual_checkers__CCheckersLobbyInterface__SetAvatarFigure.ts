// vmk_casual_checkers.cct / CCheckersLobbyInterface / SetAvatarFigure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetAvatarFigure(_me: LingoMe, _this: LingoValue, a_rStruct: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_rStruct = undefined;
  for (var i = 1; i <= meProp(_me, "m_ar_rAvatarQueue").count; ++i) {
  if (lingoBinary("eq", meProp(_me, "m_ar_rAvatarQueue")[i].name, a_rStruct.name)) {
  t_rStruct = meProp(_me, "m_ar_rAvatarQueue")[i];
  break;
  }

  }

  if (lingoBinary("neq", t_rStruct, undefined)) {
  var t_rCanvas = callNamed("image", 200, 200, 32);
  var t_rBlack = callNamed("image", 200, 200, 8, symbol("grayscale"));
  callMethod("fill", t_rBlack, t_rBlack.rect, callNamed("rgb", 0, 0, 0))
  callMethod("setAlpha", t_rCanvas, t_rBlack)
  setThePropOf(t_rCanvas, "useAlpha", 1);
  callMethod("addProp", a_rStruct, symbol("mem"), meProp(_me, "m_rMemHs1"))
  var t_rRenderer = callNamed("createObject", callNamed("getUniqueID"), "CAvatarAnimator");
  callMethod("Define", t_rRenderer, new LingoPropList([symbol("outlook"), a_rStruct.figure, symbol("tilesize"), 32]))
  callMethod("setCallback", t_rRenderer, callMethod("getID", _this), symbol("_AvatarAssetsReady"), a_rStruct)
  callMethod("SetAction", t_rRenderer, new LingoPropList([symbol("head"), 3, symbol("body"), 3, symbol("emoticon"), 0, symbol("LeftHand"), 0, symbol("RightHand"), 0, symbol("legs"), 0, symbol("magic"), 0]))
  }

  }

}

