// 2230483a2e5366aa24e52c1b02d9674c.cct /  / handle_movesprites

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_movesprites(_me: LingoMe, a_rMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_iSpriteCount = callMethod("GetIntFrom", a_rMsg.connection);
  for (var i = 1; i <= t_iSpriteCount; ++i) {
  var t_sSpriteName = callMethod("GetStrFrom", a_rMsg.connection);
  var t_iX = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iY = callMethod("GetIntFrom", a_rMsg.connection);
  for (var a = 1; a <= 1000; ++a) {
  if (lingoBinary("contains", callNamed("sprite", a).member.name, t_sSpriteName)) {
  setThePropOf(callNamed("sprite", a), "loc", callNamed("point", t_iX, t_iY));
  }

  }

  }

}

