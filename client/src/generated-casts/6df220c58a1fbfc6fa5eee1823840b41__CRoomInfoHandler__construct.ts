// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoHandler / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", symbol("GoTrain"), callMethod("getID", _me), symbol("GoToMonorailTrain"))
  callNamed("registerMessage", symbol("GoSulake"), callMethod("getID", _me), symbol("GoToMonorailSulake"))
  callNamed("registerMessage", symbol("GoMusicMixer"), callMethod("getID", _me), symbol("GoToMusicMixerGame"))
  setMeProp(_me, "m_iMonorailStatus", 0);
  callMethod("regMsgList", _me, 1)
  return 1;
}

