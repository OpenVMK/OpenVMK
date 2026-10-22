// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, a_mp_AvatarData: LingoValue) {
  setMeProp(_me, "m_arPartList", a_mp_AvatarData.objects);
  setMeProp(_me, "m_iBdDir", a_mp_AvatarData.BodyDir);
  setMeProp(_me, "m_iHeadDir", a_mp_AvatarData.HeadDir);
  setMeProp(_me, "m_iMyRef", a_mp_AvatarData.MyRef);
  setMeProp(_me, "m_bFlipped", a_mp_AvatarData.Flipped);
  setMeProp(_me, "m_iTileSize", a_mp_AvatarData.tilesize);
  setMeProp(_me, "m_iLastDir", 3);
  callMethod("arrangeParts", _me)
  callMethod("Refresh", _me, meProp(_me, "m_iBdDir"), meProp(_me, "m_iHeadDir"))
  setMeProp(_me, "m_iSync", 0);
  callMethod("RenderFaces", _me)
}

