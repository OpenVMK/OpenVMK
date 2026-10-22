// vmk_hm_minigame.cct / CHMAvatarClassPossessed / Release

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Release(_me: LingoMe) {
  setThePropOf(meProp(_me, "m_rGlow"), "visible", 0);
  setThePropOf(meProp(_me, "m_rSpr"), "member", meProp(_me, "m_rOrgMember"));
  setThePropOf(meProp(_me, "m_rSpr"), "width", meProp(_me, "m_rOrgMember").member.width);
  setThePropOf(meProp(_me, "m_rSpr"), "height", meProp(_me, "m_rOrgMember").member.height);
  setMeProp(_me, "m_rSpr", callNamed("sprite", 0));
}

