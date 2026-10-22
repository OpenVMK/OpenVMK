// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / ShowBeam

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowBeam(_me: LingoMe, a_iAnimcounter: LingoValue) {
  setMeProp(_me, "m_iBeamCounter", a_iAnimcounter);
  if (callNamed("integerp", meProp(_me, "m_iBeamCounter"))) {
  if (callNamed("voidp", meProp(_me, "m_rBeamSpr"))) {
  setMeProp(_me, "m_rBeamSpr", callNamed("sprite", callNamed("reserveSprite")));
  }

  var t_iLoc = meProp(_me, "m_iLoc");
  var t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "cth_beam_100_", meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iBdDir"), 1)]), "_"), meProp(_me, "m_iBeamCounter"));
  if (callNamed("memberExists", t_sMemName)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  setThePropOf(meProp(_me, "m_rBeamSpr"), "member", t_rMem);
  setThePropOf(meProp(_me, "m_rBeamSpr"), "ink", 33);
  setThePropOf(meProp(_me, "m_rBeamSpr"), "blend", 100);
  setThePropOf(meProp(_me, "m_rBeamSpr"), "locV", t_iLoc.y);
  setThePropOf(meProp(_me, "m_rBeamSpr"), "locZ", lingoBinary("add", t_iLoc.z, 500));
  setThePropOf(meProp(_me, "m_rBeamSpr"), "flipH", lingoBinary("neq", meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iBdDir"), 1)], meProp(_me, "m_iBdDir")));
  switch (meProp(_me, "m_iBdDir")) {
case 1:
  setThePropOf(meProp(_me, "m_rBeamSpr"), "locH", lingoBinary("sub", t_iLoc.x, 5));
  break;
case 2:
case 4:
  setThePropOf(meProp(_me, "m_rBeamSpr"), "locH", lingoBinary("sub", t_iLoc.x, 5));
  break;
case 3:
  setThePropOf(meProp(_me, "m_rBeamSpr"), "locH", lingoBinary("sub", t_iLoc.x, 5));
  break;
case 5:
  setThePropOf(meProp(_me, "m_rBeamSpr"), "locH", lingoBinary("add", t_iLoc.x, 10));
  setThePropOf(meProp(_me, "m_rBeamSpr"), "locV", lingoBinary("sub", t_iLoc.y, 2));
  break;
case 6:
  setThePropOf(meProp(_me, "m_rBeamSpr"), "locH", lingoBinary("add", t_iLoc.x, 5));
  break;
case 7:
  setThePropOf(meProp(_me, "m_rBeamSpr"), "locH", lingoBinary("add", t_iLoc.x, 5));
  break;
case 0:
  setThePropOf(meProp(_me, "m_rBeamSpr"), "locH", lingoBinary("sub", t_iLoc.x, 5));
  break;
  break;
  }

  var t_Img = t_rMem.image;
  var t_iWidth = lingoBinary("div", t_Img.width, 2);
  var t_iHeight = lingoBinary("div", t_Img.height, 2);
  setThePropOf(meProp(_me, "m_rBeamSpr"), "width", t_iWidth);
  setThePropOf(meProp(_me, "m_rBeamSpr"), "height", t_iHeight);
  }

  } else {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rBeamSpr"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_rBeamSpr").spriteNum)
  setMeProp(_me, "m_rBeamSpr", undefined);
  setMeProp(_me, "m_iBeamCounter", undefined);
  var t_mpDelays = new LingoPropList([]);
  t_mpDelays = _me.delays;
  for (var g = 1; g <= t_mpDelays.count; ++g) {
  callMethod("cancel", _me, callMethod("getPropAt", t_mpDelays, g))
  }

  }

  }

}

