// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyInterface / showHiddenMickeysInViewFinder

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHiddenMickeysInViewFinder(_me: LingoMe, a_rect: LingoValue) {
  setMeProp(_me, "m_lHiddenMickeysInViewFinder", new LingoList([]));
  for (var i = 1; i <= meProp(_me, "m_mpHiddenMickeysInRoom").count; ++i) {
  var tMickey = meProp(_me, "m_mpHiddenMickeysInRoom")[i];
  var tID = callMethod("getPropAt", meProp(_me, "m_mpHiddenMickeysInRoom"), i);
  var tBlend = callNamed("value", tMickey["BLEND"]);
  var tSprite = tMickey["SPRITE"];
  if (lingoBinary("neq", tSprite, 0)) {
  var t_error = 0;
  var t_corners = new LingoList([callNamed("point", tSprite.rect.left, tSprite.rect.top), callNamed("point", tSprite.rect.right, tSprite.rect.top), callNamed("point", tSprite.rect.right, tSprite.rect.bottom), callNamed("point", tSprite.rect.left, tSprite.rect.bottom)]);
  for (var t_corner of t_corners.toArray()) {
  if ((lingoTruthy(callMethod("inside", t_corner, a_rect)) ? 0 : 1)) {
  t_error = 1;
  break;
  }

  }

  if ((lingoTruthy(t_error) ? 0 : 1)) {
  callMethod("append", meProp(_me, "m_lHiddenMickeysInViewFinder"), tMickey)
  setThePropOf(tSprite, "blend", 100);
  }

  }

  }

  return callMethod("count", meProp(_me, "m_lHiddenMickeysInViewFinder"));
}

