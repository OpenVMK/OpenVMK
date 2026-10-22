// d0e535313898676eb605277339b50f27.cct / CAvatarFactor / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_mp_PartPieces", undefined);
  setMeProp(_me, "m_mp_Actions", undefined);
  setMeProp(_me, "m_veAvatarLoc", undefined);
  setMeProp(_me, "m_rAvatarSpr", undefined);
  setMeProp(_me, "m_ObjRenderer", undefined);
  setMeProp(_me, "m_objMagic", undefined);
  setMeProp(_me, "m_iMyRef", undefined);
  setMeProp(_me, "m_sRenderer", undefined);
  setMeProp(_me, "m_ObjMagicFx", undefined);
  setMeProp(_me, "m_mp_AvatarData", undefined);
  setMeProp(_me, "m_objVehicle", undefined);
  setMeProp(_me, "m_mp_PartList", undefined);
  setMeProp(_me, "m_arClothesSets", undefined);
  setMeProp(_me, "m_ar_ActionData", undefined);
  setMeProp(_me, "m_arFlipList", new LingoList([0, 1, 2, 3, 4, 3, 2, 1]));
  setMeProp(_me, "m_iCurrentMagic", 0);
  setMeProp(_me, "m_bMinigameRunning", 0);
  setMeProp(_me, "m_sMiniGameRunning", "");
  setMeProp(_me, "m_bNeededClothesLoaded", 0);
  setMeProp(_me, "m_bAnimating", 0);
  setMeProp(_me, "m_iResetCounter", 0);
  setMeProp(_me, "m_bAvatarReseted", 0);
  var t_rObj = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  if (callNamed("objectp", t_rObj)) {
  setMeProp(_me, "m_iTileSize", callMethod("GetParam", t_rObj, "TILESIZE"));
  } else {
  return 0;
  }

}

