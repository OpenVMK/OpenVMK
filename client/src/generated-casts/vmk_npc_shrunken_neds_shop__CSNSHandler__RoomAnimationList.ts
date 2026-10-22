// vmk_npc_shrunken_neds_shop.cct / CSNSHandler / RoomAnimationList

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
  var tCurrentAnimation = t_ar_animations[tAniC];
  var tAnimationNewState = tCurrentAnimation.state;
  switch (tAnimationNewState) {
case 0:
  break;
case 1:
  callMethod("LookAtCashRegister", callMethod("getComponent", _me), tCurrentAnimation.age)
  break;
case 2:
  callMethod("WiggleAbout", callMethod("getComponent", _me), tCurrentAnimation.age)
  break;
case 3:
  callMethod("speak", callMethod("getComponent", _me), tCurrentAnimation.age)
  break;
case 4:
  callMethod("blink", callMethod("getComponent", _me), tCurrentAnimation.age)
  break;
  }

  }

  }

}

