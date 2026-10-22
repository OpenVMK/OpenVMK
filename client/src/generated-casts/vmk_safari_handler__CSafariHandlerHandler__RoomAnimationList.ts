// vmk_safari_handler.cct / CSafariHandlerHandler / RoomAnimationList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RoomAnimationList(_me: LingoMe, tMsg: LingoValue) {
  var t_iAnimationsCount = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_animations = new LingoList([]);
  for (var i = 1; i <= t_iAnimationsCount; ++i) {
  var t_animation = new LingoPropList([]);
  t_animation[symbol("ref")] = callMethod("GetIntFrom", tMsg.connection);
  t_animation[symbol("type")] = callMethod("GetIntFrom", tMsg.connection);
  t_animation[symbol("state")] = callMethod("GetIntFrom", tMsg.connection);
  t_animation[symbol("age")] = callMethod("GetIntFrom", tMsg.connection);
  t_animation[symbol("param1")] = new LingoList([]);
  t_animation[symbol("param2")] = new LingoList([]);
  var t_paramCount1 = callMethod("GetIntFrom", tMsg.connection);
  for (var i2 = 1; i2 <= t_paramCount1; ++i2) {
  callMethod("append", t_animation[symbol("param1")], callMethod("GetIntFrom", tMsg.connection))
  }

  var t_paramCount2 = callMethod("GetIntFrom", tMsg.connection);
  for (var i3 = 1; i3 <= t_paramCount2; ++i3) {
  callMethod("append", t_animation[symbol("param2")], callMethod("GetStrFrom", tMsg.connection))
  }

  callMethod("append", t_ar_animations, t_animation)
  }

  if (lingoBinary("gt", t_ar_animations.count, 0)) {
  for (var tAniC = 1; tAniC <= t_ar_animations.count; ++tAniC) {
  var tBoat = t_ar_animations[tAniC];
  if (lingoBinary("gt", tBoat.param1.count, 1)) {
  var tColor = tBoat.param1[1];
  var t_ar_Params = new LingoList([]);
  for (var i = 2; i <= tBoat.param1.count; ++i) {
  callMethod("append", t_ar_Params, tBoat.param1[i])
  }

  callMethod("NewBoat", callMethod("getInterface", _me), tColor, t_ar_Params, tBoat.age)
  }

  }

  }

}

