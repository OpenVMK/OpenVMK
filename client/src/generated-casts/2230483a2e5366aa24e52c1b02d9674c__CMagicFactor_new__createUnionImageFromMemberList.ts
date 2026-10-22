// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / createUnionImageFromMemberList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createUnionImageFromMemberList(_me: LingoMe, a: LingoValue, a1: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  if (callNamed("voidp", globalVar("pTemp"))) {
  setGlobal("pTemp", callMethod("new", callNamed("script", "CMagicFactor_old")));
  }

  setThePropOf(globalVar("pTemp"), "m_bTalk", _me.m_bTalk);
  setThePropOf(globalVar("pTemp"), "m_bFlip", _me.m_bFlip);
  setThePropOf(globalVar("pTemp"), "m_veAvatarLoc", _me.m_veAvatarLoc);
  setThePropOf(globalVar("pTemp"), "m_iMyRef", _me.m_iMyRef);
  setThePropOf(globalVar("pTemp"), "m_sCarPantAction", _me.m_sCarPantAction);
  setThePropOf(globalVar("pTemp"), "m_ar_StormImgList", _me.m_ar_StormImgList);
  setThePropOf(globalVar("pTemp"), "m_arFlipList", _me.m_arFlipList);
  setThePropOf(globalVar("pTemp"), "m_iTileSize", _me.m_iTileSize);
  setThePropOf(globalVar("pTemp"), "m_arAnimCounters", _me.m_arAnimCounters);
  setThePropOf(globalVar("pTemp"), "m_arFrameList", _me.m_arFrameList);
  setThePropOf(globalVar("pTemp"), "m_ar_SpriteList", _me.m_ar_SpriteList);
  setThePropOf(globalVar("pTemp"), "m_mp_Framelist", _me.m_mp_Framelist);
  setThePropOf(globalVar("pTemp"), "m_iMagicFx", _me.m_iMagicFx);
  setThePropOf(globalVar("pTemp"), "m_iDir", _me.m_iDir);
  setThePropOf(globalVar("pTemp"), "m_arCarpetFrameList", _me.m_arCarpetFrameList);
  setThePropOf(globalVar("pTemp"), "m_arLightningFrameList", _me.m_arLightningFrameList);
  setThePropOf(globalVar("pTemp"), "m_iMagicFrameCounter", _me.m_iMagicFrameCounter);
  setThePropOf(globalVar("pTemp"), "m_iMagicBatStateCounter", _me.m_iMagicBatStateCounter);
  setThePropOf(globalVar("pTemp"), "m_arBatFrameList", _me.m_arBatFrameList);
  setThePropOf(globalVar("pTemp"), "m_ar_SharkTalkFrames", _me.m_ar_SharkTalkFrames);
  setThePropOf(globalVar("pTemp"), "m_iStormCounter", _me.m_iStormCounter);
  setThePropOf(globalVar("pTemp"), "m_FxSnd_obj", _me.m_FxSnd_obj);
  setThePropOf(globalVar("pTemp"), "m_iCurrendSoundPlaying", _me.m_iCurrendSoundPlaying);
  setThePropOf(globalVar("pTemp"), "m_i_CarPantCounter", _me.m_i_CarPantCounter);
  setThePropOf(globalVar("pTemp"), "m_iFireworksCounter", _me.m_iFireworksCounter);
  setThePropOf(globalVar("pTemp"), "m_SprFuel1", _me.m_SprFuel1);
  setThePropOf(globalVar("pTemp"), "m_SprFuel2", _me.m_SprFuel2);
  setThePropOf(globalVar("pTemp"), "m_iFuelPercent", _me.m_iFuelPercent);
  setThePropOf(globalVar("pTemp"), "m_bTrashCanTalkState", _me.m_bTrashCanTalkState);
  setThePropOf(globalVar("pTemp"), "m_sMyName", _me.m_sMyName);
  setThePropOf(globalVar("pTemp"), "m_sAvatarName", _me.m_sAvatarName);
  setThePropOf(globalVar("pTemp"), "m_bSitting", _me.m_bSitting);
  return callMethod("createUnionImageFromMemberList", globalVar("pTemp"), a, a1);
}

