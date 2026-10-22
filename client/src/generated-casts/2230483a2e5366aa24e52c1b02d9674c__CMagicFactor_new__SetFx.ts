// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / SetFx

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetFx(_me: LingoMe, a_iMagicFx: LingoValue, a_iTileSize: LingoValue, a_bFlip: LingoValue, a_iDir: LingoValue, a_iMyRef: LingoValue, a_sMyName: LingoValue, a_sAvatarName: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  setThePropOf(_me, "m_iTileSize", a_iTileSize);
  setThePropOf(_me, "m_bFlip", a_bFlip);
  setThePropOf(_me, "m_iDir", a_iDir);
  setThePropOf(_me, "m_iMyRef", a_iMyRef);
  setThePropOf(_me, "m_sMyName", a_sMyName);
  setThePropOf(_me, "m_sAvatarName", a_sAvatarName);
  if (lingoBinary("neq", _me.m_iMagicFx, a_iMagicFx)) {
  setThePropOf(_me, "m_iMagicFx", a_iMagicFx);
  setThePropOf(_me, "m_arAnimCounters", new LingoList([]));
  setThePropOf(_me, "m_arFrameList", new LingoList([]));
  setThePropOf(_me, "m_ar_SpriteList", new LingoList([]));
  setThePropOf(_me, "m_mp_Framelist", callNamed("propList", symbol("front"), new LingoList([]), symbol("back"), new LingoList([])));
  setThePropOf(_me, "m_iMagicFrameCounter", 1);
  setThePropOf(_me, "m_iMagicBatStateCounter", 1);
  setThePropOf(_me, "m_ar_StormImgList", undefined);
  setThePropOf(_me, "m_iStormCounter", 1);
  setThePropOf(_me, "m_iCurrendSoundPlaying", 0);
  if (callNamed("objectp", _me.m_FxSnd_obj)) {
  callNamed("StopSound", _me.m_FxSnd_obj)
  }

  callNamed("PrepareFx", _me)
  callNamed("PlayMagicSound", _me, _me.m_iMagicFx)
  if (lingoBinary("gt", _me.m_iMagicFx, 99)) {
  callNamed("executeMessage", "PlayFxSound", "MFX-car-start-1")
  }

  }

}

