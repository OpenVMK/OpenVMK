// vmk_jungle_cruise.cct / CPowerupManager / RemovePowerup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemovePowerup(_me: LingoMe, i_rObj: LingoValue) {
  var ttype = callMethod("GetParam", i_rObj, "type");
  var tSpotIndex = callMethod("GetParam", i_rObj, "SpotIndex");
  switch (ttype) {
case symbol("film"):
  callMethod("deleteOne", meProp(_me, "m_ar_filmoccupied"), tSpotIndex)
  break;
case symbol("fuel"):
  callMethod("deleteOne", meProp(_me, "m_ar_fueloccupied"), tSpotIndex)
  break;
  }

  callMethod("_RemoveIndexed", meProp(_me, "m_roomContext"), callMethod("GetParam", i_rObj, "Reference"), "powerup")
}

