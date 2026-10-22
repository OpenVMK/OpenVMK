// d0e535313898676eb605277339b50f27.cct / CAvatarVehicle / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, a_SprAvatar: LingoValue, a_rShirtColor: LingoValue) {
  var t_Mem_AvatImage = a_SprAvatar.member;
  var t_arFlipList = new LingoList([0, 1, 2, 3, 4, 3, 2, 1]);
  var t_iDir = t_arFlipList[lingoBinary("add", meProp(_me, "m_iDir"), 1)];
  setMeProp(_me, "m_iAnimCounter", lingoBinary("add", meProp(_me, "m_iAnimCounter"), 1));
  var t_ar_DrawList = new LingoList([]);
  var t_mp_ColorizationList = new LingoPropList([]);
  switch (meProp(_me, "m_iVehicle")) {
case 5:
  var t_sMemName = lingoBinary("join", "log_", t_iDir);
  if (callNamed("memberExists", t_sMemName)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  callMethod("add", t_ar_DrawList, t_rMem)
  callMethod("add", t_ar_DrawList, t_Mem_AvatImage)
  }

  break;
case 6:
  t_sMemName = lingoBinary("join", "magic_everestcar_back_", t_iDir);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  callMethod("add", t_ar_DrawList, t_rMem)
  }

  callMethod("add", t_ar_DrawList, t_Mem_AvatImage)
  t_sMemName = lingoBinary("join", "magic_everestcar_front_", t_iDir);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  callMethod("add", t_ar_DrawList, t_rMem)
  }

  break;
case 7:
  t_sMemName = lingoBinary("join", "magic_rocket_back_", t_iDir);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  callMethod("add", t_ar_DrawList, t_rMem)
  }

  var t_Pnt_Orig = t_rMem.regPoint;
  var t_pnt = callNamed("point", t_Pnt_Orig[1], lingoBinary("add", t_Pnt_Orig[2], 5));
  setThePropOf(t_rMem, "regPoint", t_pnt);
  callMethod("add", t_ar_DrawList, t_Mem_AvatImage)
  t_sMemName = lingoBinary("join", "magic_rocket_front_", t_iDir);
  if (callNamed("memberExists", t_sMemName)) {
  var t_rMem1 = callNamed("getMember", t_sMemName);
  callMethod("add", t_ar_DrawList, t_rMem1)
  }

  var t_Pnt_Orig1 = t_rMem1.regPoint;
  var t_Pnt1 = callNamed("point", t_Pnt_Orig1[1], lingoBinary("add", t_Pnt_Orig1[2], 5));
  setThePropOf(t_rMem1, "regPoint", t_Pnt1);
  break;
case 8:
  if (lingoBinary("gt", meProp(_me, "m_iAnimCounter"), 10)) {
  setMeProp(_me, "m_iAnimCounter", 1);
  }

  var t_ar_AnimFrames = new LingoList([0, 0, 1, 1, 2, 2, 3, 3, 4, 4]);
  var t_iAnimFrame = t_ar_AnimFrames[meProp(_me, "m_iAnimCounter")];
  t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "magic_donuttl_back_", t_iDir), "_"), t_iAnimFrame);
  if (callNamed("memberExists", t_sMemName)) {
  var t_rBackMem = callNamed("getMember", t_sMemName);
  }

  t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "magic_donuttl_front_", t_iDir), "_"), t_iAnimFrame);
  if (callNamed("memberExists", t_sMemName)) {
  var t_rFrontMem = callNamed("getMember", t_sMemName);
  }

  if (lingoBinary("and", lingoBinary("and", lingoBinary("neq", undefined, t_rBackMem), lingoBinary("neq", undefined, t_rFrontMem)), lingoBinary("neq", undefined, t_Mem_AvatImage))) {
  if (lingoBinary("eq", t_iDir, 4)) {
  t_ar_DrawList = new LingoList([t_rBackMem, t_rFrontMem, t_Mem_AvatImage]);
  } else {
  t_ar_DrawList = new LingoList([t_rBackMem, t_Mem_AvatImage, t_rFrontMem]);
  }

  }

  break;
case 9:
  if (lingoBinary("gt", meProp(_me, "m_iAnimCounter"), 10)) {
  setMeProp(_me, "m_iAnimCounter", 1);
  }

  t_ar_AnimFrames = new LingoList([0, 0, 1, 1, 2, 2, 3, 3, 4, 4]);
  t_iAnimFrame = t_ar_AnimFrames[meProp(_me, "m_iAnimCounter")];
  t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "magic_donutbb_back_", t_iDir), "_"), t_iAnimFrame);
  if (callNamed("memberExists", t_sMemName)) {
  t_rBackMem = callNamed("getMember", t_sMemName);
  }

  t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "magic_donutbb_front_", t_iDir), "_"), t_iAnimFrame);
  if (callNamed("memberExists", t_sMemName)) {
  t_rFrontMem = callNamed("getMember", t_sMemName);
  }

  if (lingoBinary("and", lingoBinary("and", lingoBinary("neq", undefined, t_rBackMem), lingoBinary("neq", undefined, t_rFrontMem)), lingoBinary("neq", undefined, t_Mem_AvatImage))) {
  if (lingoBinary("eq", t_iDir, 4)) {
  t_ar_DrawList = new LingoList([t_rBackMem, t_rFrontMem, t_Mem_AvatImage]);
  } else {
  t_ar_DrawList = new LingoList([t_rBackMem, t_Mem_AvatImage, t_rFrontMem]);
  }

  }

  break;
case 10:
  t_sMemName = lingoBinary("join", "alicecar_back_0_", t_iDir);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  callMethod("add", t_ar_DrawList, t_rMem)
  callMethod("addProp", t_mp_ColorizationList, t_rMem, callNamed("rgb", meProp(_me, "m_ar_ALiceColors")[2]))
  }

  t_sMemName = lingoBinary("join", "alicecar_back_1_", t_iDir);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  callMethod("add", t_ar_DrawList, t_rMem)
  callMethod("addProp", t_mp_ColorizationList, t_rMem, callNamed("rgb", meProp(_me, "m_ar_ALiceColors")[1]))
  }

  callMethod("add", t_ar_DrawList, t_Mem_AvatImage)
  t_sMemName = lingoBinary("join", "alicecar_front_0_", t_iDir);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  callMethod("add", t_ar_DrawList, t_rMem)
  callMethod("addProp", t_mp_ColorizationList, t_rMem, callNamed("rgb", meProp(_me, "m_ar_ALiceColors")[2]))
  }

  t_sMemName = lingoBinary("join", "alicecar_front_1_", t_iDir);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  callMethod("add", t_ar_DrawList, t_rMem)
  callMethod("addProp", t_mp_ColorizationList, t_rMem, callNamed("rgb", meProp(_me, "m_ar_ALiceColors")[1]))
  }

  break;
case 11:
  if (lingoBinary("eq", a_rShirtColor, callNamed("rgb", 238, 238, 238))) {
  a_rShirtColor = meProp(_me, "m_ar_PeterPanColor");
  }

  t_sMemName = lingoBinary("join", "ppship_back_0_", t_iDir);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  callMethod("add", t_ar_DrawList, t_rMem)
  }

  t_sMemName = lingoBinary("join", "ppship_back_1_", t_iDir);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  callMethod("add", t_ar_DrawList, t_rMem)
  callMethod("addProp", t_mp_ColorizationList, t_rMem, a_rShirtColor)
  }

  callMethod("add", t_ar_DrawList, t_Mem_AvatImage)
  t_sMemName = lingoBinary("join", "ppship_front_0_", t_iDir);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  callMethod("add", t_ar_DrawList, t_rMem)
  }

  t_sMemName = lingoBinary("join", "ppship_front_1_", t_iDir);
  if (callNamed("memberExists", t_sMemName)) {
  t_rMem = callNamed("getMember", t_sMemName);
  callMethod("add", t_ar_DrawList, t_rMem)
  callMethod("addProp", t_mp_ColorizationList, t_rMem, a_rShirtColor)
  }

  break;
case 12:
  if (lingoBinary("gt", meProp(_me, "m_iAnimCounter"), 6)) {
  setMeProp(_me, "m_iAnimCounter", 1);
  }

  t_ar_AnimFrames = new LingoList([0, 0, 0, 1, 1, 1]);
  t_iAnimFrame = t_ar_AnimFrames[meProp(_me, "m_iAnimCounter")];
  t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "magic_raftbb_back_", t_iDir), "_"), t_iAnimFrame);
  if (callNamed("memberExists", t_sMemName)) {
  t_rBackMem = callNamed("getMember", t_sMemName);
  }

  t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "magic_raftbb_front_", t_iDir), "_"), t_iAnimFrame);
  if (callNamed("memberExists", t_sMemName)) {
  t_rFrontMem = callNamed("getMember", t_sMemName);
  }

  if (lingoBinary("and", lingoBinary("and", lingoBinary("neq", undefined, t_rBackMem), lingoBinary("neq", undefined, t_rFrontMem)), lingoBinary("neq", undefined, t_Mem_AvatImage))) {
  if (lingoBinary("eq", t_iDir, 4)) {
  t_ar_DrawList = new LingoList([t_rBackMem, t_rFrontMem, t_Mem_AvatImage]);
  } else {
  t_ar_DrawList = new LingoList([t_rBackMem, t_Mem_AvatImage, t_rFrontMem]);
  }

  }

  break;
case 13:
  if (lingoBinary("gt", meProp(_me, "m_iAnimCounter"), 6)) {
  setMeProp(_me, "m_iAnimCounter", 1);
  }

  t_ar_AnimFrames = new LingoList([0, 0, 0, 1, 1, 1]);
  t_iAnimFrame = t_ar_AnimFrames[meProp(_me, "m_iAnimCounter")];
  t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "magic_rafttl_back_", t_iDir), "_"), t_iAnimFrame);
  if (callNamed("memberExists", t_sMemName)) {
  t_rBackMem = callNamed("getMember", t_sMemName);
  }

  t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "magic_rafttl_front_", t_iDir), "_"), t_iAnimFrame);
  if (callNamed("memberExists", t_sMemName)) {
  t_rFrontMem = callNamed("getMember", t_sMemName);
  }

  if (lingoBinary("and", lingoBinary("and", lingoBinary("neq", undefined, t_rBackMem), lingoBinary("neq", undefined, t_rFrontMem)), lingoBinary("neq", undefined, t_Mem_AvatImage))) {
  if (lingoBinary("eq", t_iDir, 4)) {
  t_ar_DrawList = new LingoList([t_rBackMem, t_rFrontMem, t_Mem_AvatImage]);
  } else {
  t_ar_DrawList = new LingoList([t_rBackMem, t_Mem_AvatImage, t_rFrontMem]);
  }

  }

  break;
  }

  if (lingoBinary("gt", t_ar_DrawList.count, 1)) {
  var t_ar_AvatarData = callMethod("createUnionImageFromMemberList", _me, t_ar_DrawList, callNamed("point", 0, 0), t_mp_ColorizationList);
  if (lingoBinary("eq", meProp(_me, "m_iVehicle"), 7)) {
  setThePropOf(t_rMem, "regPoint", t_Pnt_Orig);
  setThePropOf(t_rMem1, "regPoint", t_Pnt_Orig1);
  }

  return t_ar_AvatarData;
  }

}

