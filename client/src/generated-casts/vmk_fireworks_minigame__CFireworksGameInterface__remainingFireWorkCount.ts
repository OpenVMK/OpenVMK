// vmk_fireworks_minigame.cct / CFireworksGameInterface / remainingFireWorkCount

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function remainingFireWorkCount(_me: LingoMe, a_iFireworksLeft: LingoValue) {
  for (var i = 0; i <= 1; ++i) {
  var t_iPos = callNamed("integer", callNamed("power", 10, i));
  var t_iInt = callNamed("integer", lingoBinary("sub", lingoBinary("div", lingoBinary("mod", a_iFireworksLeft, callNamed("power", 10, lingoBinary("add", i, 1))), callNamed("power", 10, i)), 0.5));
  var t_rSprite = meProp(_me, "m_ar_fwAmountDisplay")[lingoBinary("add", i, 1)];
  var t_rMember = callMethod("getNumberImg", _me, t_iInt);
  setThePropOf(t_rSprite, "member", t_rMember);
  setThePropOf(t_rSprite, "width", t_rMember.width);
  setThePropOf(t_rSprite, "height", t_rMember.height);
  }

  callMethod("displayNextFireworks", _me, a_iFireworksLeft)
}

