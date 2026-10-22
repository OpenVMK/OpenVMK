// vmk_jungle_cruise.cct / CAnimalManager / LeaveAnimal

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LeaveAnimal(_me: LingoMe, a_iRef: LingoValue) {
  var tAnimal = callMethod("getaProp", meProp(_me, "m_mp_visibleAnimals"), a_iRef);
  callMethod("SetParam", tAnimal, "State", symbol("leave"))
  callMethod("SetParam", tAnimal, "FrameNum", 1)
  callMethod("SetParam", tAnimal, "Time", 0)
  setMeProp(_me, "m_iNextPuffRef", lingoBinary("add", meProp(_me, "m_iNextPuffRef"), 1));
  callMethod("CreatePuff", _me, callMethod("GetParam", tAnimal, "WorldPosition"), meProp(_me, "m_iNextPuffRef"), callMethod("GetParam", tAnimal, "Scale"))
}

