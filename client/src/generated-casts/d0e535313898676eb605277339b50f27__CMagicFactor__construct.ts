// d0e535313898676eb605277339b50f27.cct / CMagicFactor / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_arAnimCounters", new LingoList([]));
  setMeProp(_me, "m_arFrameList", new LingoList([]));
  setMeProp(_me, "m_ar_SpriteList", new LingoList([]));
  setMeProp(_me, "m_mp_Framelist", new LingoPropList([symbol("front"), new LingoList([]), symbol("back"), new LingoList([])]));
  setMeProp(_me, "m_arFlipList", new LingoList([0, 1, 2, 3, 4, 3, 2, 1]));
  setMeProp(_me, "m_iMagicFx", 0);
  setMeProp(_me, "m_iDir", 0);
  setMeProp(_me, "m_arCarpetFrameList", new LingoList([0, 1, 2, 3, 4, 5, 6, 7, 8]));
  setMeProp(_me, "m_arLightningFrameList", new LingoList([1, 2, 3, 4]));
  setMeProp(_me, "m_iMagicFrameCounter", 1);
  setMeProp(_me, "m_iMagicBatStateCounter", 1);
  setMeProp(_me, "m_arBatFrameList", new LingoList([0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3]));
  setMeProp(_me, "m_ar_SharkTalkFrames", new LingoList(["Magic_shark_talk_", "Magic_shark_swim_"]));
  setMeProp(_me, "m_ar_StormImgList", undefined);
  setMeProp(_me, "m_iStormCounter", 1);
  setMeProp(_me, "m_FxSnd_obj", undefined);
  setMeProp(_me, "m_iCurrendSoundPlaying", 0);
  setMeProp(_me, "m_i_CarPantCounter", 0);
  setMeProp(_me, "m_iFireworksCounter", 0);
  setMeProp(_me, "m_SprFuel1", undefined);
  setMeProp(_me, "m_SprFuel2", undefined);
  setMeProp(_me, "m_iFuelPercent", undefined);
  setMeProp(_me, "m_bTrashCanTalkState", 0);
  setMeProp(_me, "m_bSitting", 0);
  setMeProp(_me, "m_bTalk", 0);
  callMethod("regMsgList", _this, 1)
  return 1;
}

