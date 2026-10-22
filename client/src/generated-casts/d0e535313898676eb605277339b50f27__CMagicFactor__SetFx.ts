// d0e535313898676eb605277339b50f27.cct / CMagicFactor / SetFx

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetFx(_me: LingoMe, a_iMagicFx: LingoValue, a_iTileSize: LingoValue, a_bFlip: LingoValue, a_iDir: LingoValue, a_iMyRef: LingoValue, a_sMyName: LingoValue, a_sAvatarName: LingoValue) {
  setMeProp(_me, "m_iTileSize", a_iTileSize);
  setMeProp(_me, "m_bFlip", a_bFlip);
  setMeProp(_me, "m_iDir", a_iDir);
  setMeProp(_me, "m_iMyRef", a_iMyRef);
  setMeProp(_me, "m_sMyName", a_sMyName);
  setMeProp(_me, "m_sAvatarName", a_sAvatarName);
  if (lingoBinary("neq", meProp(_me, "m_iMagicFx"), a_iMagicFx)) {
  setMeProp(_me, "m_iMagicFx", a_iMagicFx);
  setMeProp(_me, "m_arAnimCounters", new LingoList([]));
  setMeProp(_me, "m_arFrameList", new LingoList([]));
  setMeProp(_me, "m_ar_SpriteList", new LingoList([]));
  setMeProp(_me, "m_mp_Framelist", new LingoPropList([symbol("front"), new LingoList([]), symbol("back"), new LingoList([])]));
  setMeProp(_me, "m_iMagicFrameCounter", 1);
  setMeProp(_me, "m_iMagicBatStateCounter", 1);
  setMeProp(_me, "m_ar_StormImgList", undefined);
  setMeProp(_me, "m_iStormCounter", 1);
  setMeProp(_me, "m_iCurrendSoundPlaying", 0);
  if (callNamed("objectp", meProp(_me, "m_FxSnd_obj"))) {
  callMethod("StopSound", meProp(_me, "m_FxSnd_obj"))
  }

  callMethod("PrepareFx", _me)
  callMethod("PlayMagicSound", _me, meProp(_me, "m_iMagicFx"))
  if (lingoBinary("gt", meProp(_me, "m_iMagicFx"), 99)) {
  callNamed("executeMessage", "PlayFxSound", "MFX-car-start-1")
  }

  }

}

