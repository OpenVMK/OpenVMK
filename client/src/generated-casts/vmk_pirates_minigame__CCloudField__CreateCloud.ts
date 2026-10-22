// vmk_pirates_minigame.cct / CCloudField / CreateCloud

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateCloud(_me: LingoMe) {
  var tPos = callNamed("intvector", lingoBinary("sub", callNamed("random", 120000), 60000), lingoBinary("sub", callNamed("random", 120000), 60000), 5000);
  callMethod("append", meProp(_me, "m_ar_clouds"), callMethod("newObject", callMethod("GetObjectPool", meProp(_me, "m_rGameEng")), "piratescloud", new LingoPropList(["WorldPosition", tPos])))
}

