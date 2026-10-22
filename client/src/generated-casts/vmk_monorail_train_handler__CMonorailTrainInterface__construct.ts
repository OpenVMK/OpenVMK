// vmk_monorail_train_handler.cct / CMonorailTrainInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("enterRoom"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("leaveRoom"))
  callNamed("registerMessage", "TrainStartSong", callMethod("getID", _me), symbol("TrainStartSong"))
  callNamed("registerMessage", "TrainEndSong", callMethod("getID", _me), symbol("trainEndSong"))
  setMeProp(_me, "m_rSndFX", callNamed("createObject", symbol("random"), "CSoundObject"));
  callMethod("SetSoundType", meProp(_me, "m_rSndFX"), "fx")
  setMeProp(_me, "m_pTrainMusic", callNamed("createObject", symbol("random"), "CSoundObject"));
  callMethod("SetSoundType", meProp(_me, "m_pTrainMusic"), "music")
  setMeProp(_me, "m_rOscillator", callNamed("createObject", symbol("random"), "COscillatorLCD"));
  callMethod("SetPics", meProp(_me, "m_rOscillator"), new LingoList([callNamed("member", "oscillator_01"), callNamed("member", "oscillator_02"), callNamed("member", "oscillator_03"), callNamed("member", "oscillator_04"), callNamed("member", "oscillator_05")]))
  callMethod("SetFps", meProp(_me, "m_rOscillator"), 10)
  setMeProp(_me, "m_pTextScroller", 0);
  setMeProp(_me, "m_pTextScrollerHolder", 0);
  setMeProp(_me, "m_pStarField", 0);
  setMeProp(_me, "m_animIDs", new LingoList([]));
  setMeProp(_me, "m_pExits", new LingoList([]));
  setMeProp(_me, "m_pTileExits", new LingoList([]));
  setMeProp(_me, "m_bInited", 0);
  setMeProp(_me, "m_bAllowMusic", 1);
  return 1;
}

