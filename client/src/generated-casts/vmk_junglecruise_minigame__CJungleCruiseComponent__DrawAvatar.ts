// vmk_junglecruise_minigame.cct / CJungleCruiseComponent / DrawAvatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawAvatar(_me: LingoMe, a_iDir: LingoValue, a_sParam: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_ar_avatarFigure"))) {
  callMethod("delay", _me, 100, symbol("DrawAvatar"), a_iDir, a_sParam)
  } else {
  var tdir = 1;
  if (lingoBinary("eq", callMethod("getDirection", meProp(_me, "m_stage")), "down")) {
  tdir = 3;
  }

  if ((lingoTruthy(meProp(_me, "m_avatarInBoat")) ? 0 : 1)) {
  var t_mp_data2 = new LingoPropList([symbol("head"), 3, symbol("body"), 3, symbol("emoticon"), 0, symbol("LeftHand"), 0, symbol("RightHand"), 0, symbol("legs"), 0, symbol("magic"), 0]);
  } else {
  t_mp_data2 = new LingoPropList([symbol("head"), tdir, symbol("body"), tdir, symbol("emoticon"), 0, symbol("LeftHand"), 100, symbol("RightHand"), 100, symbol("legs"), 0, symbol("magic"), 0]);
  }

  var t_mp_data = new LingoPropList([symbol("outlook"), meProp(_me, "m_ar_avatarFigure"), symbol("tilesize"), 32]);
  callMethod("Define", meProp(_me, "m_objAnimator"), t_mp_data)
  callMethod("SetAction", meProp(_me, "m_objAnimator"), t_mp_data2)
  callMethod("setCallback", meProp(_me, "m_objAnimator"), callMethod("getID", _me), symbol("DrawAvatarToBoat"), new LingoPropList([symbol("Dir"), a_iDir, symbol("param"), a_sParam]))
  }

}

