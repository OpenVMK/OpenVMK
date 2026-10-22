// d0e535313898676eb605277339b50f27.cct / CAvatarAnimatorRenderer / SetAnimFrames

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetAnimFrames(_me: LingoMe) {
  switch (meProp(_me, "m_sAnimation")) {
case "at1":
  if (lingoBinary("lt", meProp(_me, "m_i_AnimFrame"), 7)) {
  var t_ar_FramesList = new LingoList([new LingoPropList([symbol("act"), "at1_", symbol("frame"), 1]), new LingoPropList([symbol("act"), "at1_", symbol("frame"), 1]), new LingoPropList([symbol("act"), "at1_", symbol("frame"), 0]), new LingoPropList([symbol("act"), "at1_", symbol("frame"), 0]), new LingoPropList([symbol("act"), "wlk_", symbol("frame"), 3]), new LingoPropList([symbol("act"), "wlk_", symbol("frame"), 3])]);
  var t_sFrame = t_ar_FramesList[meProp(_me, "m_i_AnimFrame")];
  callNamed("call", symbol("defineAnimFrame"), meProp(_me, "m_mpSortedParts"), t_sFrame, new LingoList(["rh", "rs"]))
  t_ar_FramesList = new LingoList([new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "at1_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 1)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "at1_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 1)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "at1_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 0)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "at1_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 0)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wlk_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 3)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wlk_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 3)])]);
  t_sFrame = t_ar_FramesList[meProp(_me, "m_i_AnimFrame")];
  callNamed("call", symbol("defineAnimFrame"), meProp(_me, "m_mpSortedParts"), t_sFrame, new LingoList(["ri"]))
  t_ar_FramesList = new LingoList([new LingoPropList([symbol("act"), "std_", symbol("frame"), 0]), new LingoPropList([symbol("act"), "std_", symbol("frame"), 0]), new LingoPropList([symbol("act"), "wlk_", symbol("frame"), 2]), new LingoPropList([symbol("act"), "wlk_", symbol("frame"), 2]), new LingoPropList([symbol("act"), "wlk_", symbol("frame"), 2]), new LingoPropList([symbol("act"), "wlk_", symbol("frame"), 2])]);
  t_sFrame = t_ar_FramesList[meProp(_me, "m_i_AnimFrame")];
  callNamed("call", symbol("defineAnimFrame"), meProp(_me, "m_mpSortedParts"), t_sFrame, new LingoList(["lh", "ls"]))
  } else {
  setMeProp(_me, "m_sAnimation", undefined);
  setMeProp(_me, "m_i_AnimFrame", 0);
  if (callNamed("timeoutExists", "AnimatorBattleTimer")) {
  callNamed("removeTimeout", "AnimatorBattleTimer")
  }

  }

  break;
case "hit":
  if (lingoBinary("lt", meProp(_me, "m_i_AnimFrame"), 5)) {
  t_ar_FramesList = new LingoList([new LingoPropList([symbol("act"), "hit_", symbol("frame"), 0]), new LingoPropList([symbol("act"), "hit_", symbol("frame"), 0]), new LingoPropList([symbol("act"), "hit_", symbol("frame"), 0]), new LingoPropList([symbol("act"), "hit_", symbol("frame"), 0])]);
  t_sFrame = t_ar_FramesList[meProp(_me, "m_i_AnimFrame")];
  callNamed("call", symbol("defineAnimFrame"), meProp(_me, "m_mpSortedParts"), t_sFrame, new LingoList(["rh", "rs", "lh", "ls"]))
  t_ar_FramesList = new LingoList([new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "hit_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 0)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "hit_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 0)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "hit_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 0)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "hit_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 0)])]);
  t_sFrame = t_ar_FramesList[meProp(_me, "m_i_AnimFrame")];
  callNamed("call", symbol("defineAnimFrame"), meProp(_me, "m_mpSortedParts"), t_sFrame, new LingoList(["ri"]))
  t_ar_FramesList = new LingoList([new LingoPropList([symbol("act"), "std_", symbol("frame"), 0, symbol("Dir"), lingoBinary("add", meProp(_me, "m_iHeadDir"), 1)]), new LingoPropList([symbol("act"), "std_", symbol("frame"), 0, symbol("Dir"), lingoBinary("add", meProp(_me, "m_iHeadDir"), 1)]), new LingoPropList([symbol("act"), "std_", symbol("frame"), 0, symbol("Dir"), lingoBinary("add", meProp(_me, "m_iHeadDir"), 1)]), new LingoPropList([symbol("act"), "std_", symbol("frame"), 0, symbol("Dir"), lingoBinary("add", meProp(_me, "m_iHeadDir"), 1)])]);
  t_sFrame = t_ar_FramesList[meProp(_me, "m_i_AnimFrame")];
  callNamed("call", symbol("defineAnimFrame"), meProp(_me, "m_mpSortedParts"), t_sFrame, new LingoList(["hd", "ey", "fc", "hr", "ht"]))
  } else {
  setMeProp(_me, "m_sAnimation", undefined);
  setMeProp(_me, "m_i_AnimFrame", 0);
  if (callNamed("timeoutExists", "AnimatorBattleTimer")) {
  callNamed("removeTimeout", "AnimatorBattleTimer")
  }

  }

  break;
case "victory":
  if (lingoBinary("lt", meProp(_me, "m_i_AnimFrame"), 7)) {
  t_ar_FramesList = new LingoList([new LingoPropList([symbol("act"), "wav_", symbol("frame"), 0]), new LingoPropList([symbol("act"), "wav_", symbol("frame"), 0]), new LingoPropList([symbol("act"), "wav_", symbol("frame"), 1]), new LingoPropList([symbol("act"), "wav_", symbol("frame"), 1]), new LingoPropList([symbol("act"), "wav_", symbol("frame"), 1]), new LingoPropList([symbol("act"), "wav_", symbol("frame"), 1])]);
  t_sFrame = t_ar_FramesList[meProp(_me, "m_i_AnimFrame")];
  callNamed("call", symbol("defineAnimFrame"), meProp(_me, "m_mpSortedParts"), t_sFrame, new LingoList(["rh", "rs", "lh", "ls"]))
  t_ar_FramesList = new LingoList([new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wav_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 0)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wav_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 0)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wav_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 1)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wav_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 1)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wav_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 1)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "wav_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 1)])]);
  t_sFrame = t_ar_FramesList[meProp(_me, "m_i_AnimFrame")];
  callNamed("call", symbol("defineAnimFrame"), meProp(_me, "m_mpSortedParts"), t_sFrame, new LingoList(["ri"]))
  } else {
  setMeProp(_me, "m_sAnimation", undefined);
  setMeProp(_me, "m_i_AnimFrame", 0);
  if (callNamed("timeoutExists", "AnimatorBattleTimer")) {
  callNamed("removeTimeout", "AnimatorBattleTimer")
  }

  }

  break;
case "defense":
  if (lingoBinary("lt", meProp(_me, "m_i_AnimFrame"), 5)) {
  t_ar_FramesList = new LingoList([new LingoPropList([symbol("act"), "def_", symbol("frame"), 0]), new LingoPropList([symbol("act"), "def_", symbol("frame"), 0]), new LingoPropList([symbol("act"), "def_", symbol("frame"), 0]), new LingoPropList([symbol("act"), "def_", symbol("frame"), 0])]);
  t_sFrame = t_ar_FramesList[meProp(_me, "m_i_AnimFrame")];
  callNamed("call", symbol("defineAnimFrame"), meProp(_me, "m_mpSortedParts"), t_sFrame, new LingoList(["rh", "rs", "lh", "ls"]))
  t_ar_FramesList = new LingoList([new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "def_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 0)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "def_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 0)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "def_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 0)]), new LingoPropList([symbol("whole"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "def_weapon_", meProp(_me, "m_iWeapon")), "_"), meProp(_me, "m_iBdDir")), "_"), 0)])]);
  t_sFrame = t_ar_FramesList[meProp(_me, "m_i_AnimFrame")];
  callNamed("call", symbol("defineAnimFrame"), meProp(_me, "m_mpSortedParts"), t_sFrame, new LingoList(["ri"]))
  } else {
  setMeProp(_me, "m_sAnimation", undefined);
  setMeProp(_me, "m_i_AnimFrame", 0);
  if (callNamed("timeoutExists", "AnimatorBattleTimer")) {
  callNamed("removeTimeout", "AnimatorBattleTimer")
  }

  }

  break;
  }

}

