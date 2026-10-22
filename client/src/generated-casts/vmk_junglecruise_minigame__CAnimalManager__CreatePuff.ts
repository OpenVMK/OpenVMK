// vmk_junglecruise_minigame.cct / CAnimalManager / CreatePuff

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreatePuff(_me: LingoMe, i_vPosition: LingoValue, i_iRef: LingoValue, i_fScale: LingoValue) {
  var t_mp_Params = new LingoPropList(["WorldPosition", i_vPosition, "Age", 1, "Reference", i_iRef, "Scale", i_fScale]);
  var tObject = callMethod("CreateRoomObject", _me, "puff", i_iRef, t_mp_Params);
  callMethod("append", meProp(_me, "m_ar_puffs"), tObject)
}

