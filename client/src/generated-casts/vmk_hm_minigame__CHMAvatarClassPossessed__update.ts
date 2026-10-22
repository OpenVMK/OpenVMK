// vmk_hm_minigame.cct / CHMAvatarClassPossessed / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, a_Spr: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_rSpr"), callNamed("sprite", 0))) {
  setMeProp(_me, "m_rOrgMember", a_Spr.member);
  }

  var t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "flee_ghst", meProp(_me, "m_iTeam")), "_"), meProp(_me, "m_iDir")), "_"), meProp(_me, "m_iFrame"));
  if (lingoBinary("neq", t_sMemName, meProp(_me, "m_sMemname"))) {
  setMeProp(_me, "m_sMemname", t_sMemName);
  setMeProp(_me, "m_rSpr", a_Spr);
  setMeProp(_me, "m_rMbr", callNamed("member", meProp(_me, "m_sMemname")));
  setThePropOf(a_Spr, "member", meProp(_me, "m_rMbr"));
  setThePropOf(a_Spr, "width", meProp(_me, "m_rMbr").width);
  setThePropOf(a_Spr, "height", meProp(_me, "m_rMbr").height);
  setThePropOf(a_Spr, "flipH", meProp(_me, "m_bFlip"));
  }

  setMeProp(_me, "m_iCounter", lingoBinary("add", meProp(_me, "m_iCounter"), 1));
  if (lingoBinary("eq", lingoBinary("mod", meProp(_me, "m_iCounter"), 4), 0)) {
  setMeProp(_me, "m_iCounter", 0);
  setMeProp(_me, "m_iFrame", lingoBinary("add", meProp(_me, "m_iFrame"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iFrame"), 3)) {
  setMeProp(_me, "m_iFrame", 0);
  }

  }

  if (lingoBinary("neq", meProp(_me, "m_rSpr"), callNamed("sprite", 0))) {
  if (lingoBinary("eq", meProp(_me, "m_rGlow").visible, 0)) {
  setThePropOf(meProp(_me, "m_rGlow"), "visible", 1);
  }

  setThePropOf(meProp(_me, "m_rGlow"), "loc", meProp(_me, "m_rSpr").loc);
  setThePropOf(meProp(_me, "m_rGlow"), "locZ", lingoBinary("add", meProp(_me, "m_rSpr").locZ, 1));
  }

  return 1;
}

