// vmk_jungle_cruise.cct / CAnimalManager / RemoveAnimal

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveAnimal(_me: LingoMe, i_rObj: LingoValue) {
  var tSet = callMethod("GetAnimalSet", meProp(_me, "m_stage"), callMethod("GetParam", i_rObj, "Type"));
  var tSpot = callMethod("GetParam", i_rObj, "Spot");
  callMethod("_RemoveIndexed", meProp(_me, "m_roomContext"), callMethod("GetParam", i_rObj, "Reference"), "animal")
  callMethod("deleteOne", callMethod("getaProp", meProp(_me, "m_mp_ar_spotsTaken"), tSet.name), tSpot)
}

