// 42c66f7b170484e24189f467fe87b08d.cct / Sound Manager Class / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "pMuted", 0);
  setMeProp(_me, "pChannelCount", 4);
  setMeProp(_me, "pChannelList", new LingoList([]));
  for (var i = 1; i <= meProp(_me, "pChannelCount"); ++i) {
  var tObject = callNamed("createObject", symbol("temp"), "Sound Channel Class");
  if (callMethod("Define", tObject, i)) {
  callMethod("add", meProp(_me, "pChannelList"), tObject)
  }

  }

  callNamed("registerMessage", symbol("set_all_sounds"), callMethod("getID", _me), symbol("setAllSounds"))
}

