// vmk_domestic.cct /  / CreateSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateSprite(_me: LingoMe, _this: LingoValue, height: LingoValue, t_rRenderMember: LingoValue) {
  var t_iDirection = callNamed("sprite", callNamed("t_rSprite"));
  if (t_rRenderMember) {
  setThePropOf(t_iDirection, "member", new LingoList([callNamed("createObject", symbol("flipH"), "CRoomMouseEventAgent")]));
  callMethod("width", t_iDirection, height, _this)
  }

  return t_iDirection;
}

