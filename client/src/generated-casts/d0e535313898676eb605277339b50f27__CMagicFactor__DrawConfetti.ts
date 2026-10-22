// d0e535313898676eb605277339b50f27.cct / CMagicFactor / DrawConfetti
// HAND-CORRECTED: Disney's build has no Confetti (34). Ported from a later build's
// CMagicFactor_new (cast 2230483a, 00010_CMagicFactor_new.ls) in this cast's
// emitter idiom; the art is `confetti_magic_1..10`, two ticks per frame.

import {
  callMethod, callNamed, lingoBinary, lingoTruthy,
  meProp, setMeProp, setThePropOf, LingoList,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawConfetti(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  setMeProp(_me, "m_iMagicFrameCounter", lingoBinary("add", meProp(_me, "m_iMagicFrameCounter"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iMagicFrameCounter"), 20)) {
  setMeProp(_me, "m_iMagicFrameCounter", 1);
  }

  var t_iFrame = Math.floor((Number(meProp(_me, "m_iMagicFrameCounter")) + 1) / 2);
  var t_sMemName = lingoBinary("join", "confetti_magic_", t_iFrame);
  if (lingoTruthy(callNamed("memberExists", t_sMemName))) {
  var t_rMem = callNamed("getMember", t_sMemName);
  var t_Pnt_Orig = t_rMem.regPoint;
  if (lingoTruthy(meProp(_me, "m_bSitting"))) {
  setThePropOf(t_rMem, "regPoint", callNamed("point", t_Pnt_Orig[1], lingoBinary("sub", t_Pnt_Orig[2], 20)));
  }

  var t_ar_MemList = new LingoList([a_Mem_AvatImage, t_rMem]);
  var t_ImgData = callMethod("createUnionImageFromMemberList", _me, t_ar_MemList, callNamed("point", 0, 0));
  if (lingoTruthy(meProp(_me, "m_bSitting"))) {
  setThePropOf(t_rMem, "regPoint", t_Pnt_Orig);
  }

  return t_ImgData;
  }

}
