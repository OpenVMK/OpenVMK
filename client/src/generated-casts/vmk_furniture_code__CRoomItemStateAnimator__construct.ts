// vmk_furniture_code.cct / CRoomItemStateAnimator / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bInteractive", 0);
  setMeProp(_me, "m_rStructure", undefined);
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_ar_frames", new LingoList([]));
  setMeProp(_me, "m_iState", 0);
  setMeProp(_me, "m_iDir", 0);
  setMeProp(_me, "m_iDelay", 1);
  setMeProp(_me, "m_iMaxDelay", 1);
  setMeProp(_me, "m_sCondition", "");
  setMeProp(_me, "m_sSound", "");
  setMeProp(_me, "m_iLoop", 0);
  setMeProp(_me, "m_rSoundSettingsListener", callNamed("createObject", callNamed("getUniqueID"), "CFurniSoundSettingsListener"));
  callMethod("Init", meProp(_me, "m_rSoundSettingsListener"), _this, symbol("checkSoundSettings"))
  return 1;
}

