// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  setThePropOf(_this, "m_arAnimCounters", new LingoList([]));
  setThePropOf(_this, "m_arFrameList", new LingoList([]));
  setThePropOf(_this, "m_ar_SpriteList", new LingoList([]));
  setThePropOf(_this, "m_mp_Framelist", callNamed("propList", symbol("front"), new LingoList([]), symbol("back"), new LingoList([])));
  setThePropOf(_this, "m_arFlipList", new LingoList([0, 1, 2, 3, 4, 3, 2, 1]));
  setThePropOf(_this, "m_iMagicFx", 0);
  setThePropOf(_this, "m_iDir", 0);
  setThePropOf(_this, "m_arCarpetFrameList", new LingoList([0, 1, 2, 3, 4, 5, 6, 7, 8]));
  setThePropOf(_this, "m_arLightningFrameList", new LingoList([1, 2, 3, 4]));
  setThePropOf(_this, "m_iMagicFrameCounter", 1);
  setThePropOf(_this, "m_iMagicBatStateCounter", 1);
  setThePropOf(_this, "m_arBatFrameList", new LingoList([0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3]));
  setThePropOf(_this, "m_ar_SharkTalkFrames", new LingoList(["Magic_shark_talk_", "Magic_shark_swim_"]));
  setThePropOf(_this, "m_ar_StormImgList", undefined);
  setThePropOf(_this, "m_iStormCounter", 1);
  setThePropOf(_this, "m_FxSnd_obj", undefined);
  setThePropOf(_this, "m_iCurrendSoundPlaying", 0);
  setThePropOf(_this, "m_i_CarPantCounter", 0);
  setThePropOf(_this, "m_iFireworksCounter", 0);
  setThePropOf(_this, "m_SprFuel1", undefined);
  setThePropOf(_this, "m_SprFuel2", undefined);
  setThePropOf(_this, "m_iFuelPercent", undefined);
  setThePropOf(_this, "m_bTrashCanTalkState", 0);
  setThePropOf(_this, "m_bSitting", 0);
  setThePropOf(_this, "m_bTalk", 0);
  callMethod("regMsgList", _this, 1)
  return 1;
}

