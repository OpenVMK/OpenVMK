// vmk_hm_minigame.cct / CHMAvatarClassPossessed / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rGlow", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rGlow"), "member", undefined);
  setThePropOf(meProp(_me, "m_rGlow"), "ink", 33);
  setThePropOf(meProp(_me, "m_rGlow"), "locZ", -float(49));
  setMeProp(_me, "m_iCounter", 0);
  setMeProp(_me, "m_iTeam", 1);
  setMeProp(_me, "m_iState", 1);
  setMeProp(_me, "m_iFrame", 0);
  setMeProp(_me, "m_iDir", 4);
  setMeProp(_me, "m_bFlip", 0);
  setMeProp(_me, "m_rSpr", callNamed("sprite", 0));
  setMeProp(_me, "m_sMemname", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "flee_ghst", meProp(_me, "m_iTeam")), "_"), meProp(_me, "m_iDir")), "_"), meProp(_me, "m_iFrame")));
  var m_rMyMbr = callNamed("member", meProp(_me, "m_sMemname"));
  setMeProp(_me, "m_rOrgMember", undefined);
  return 1;
}

