// d0e535313898676eb605277339b50f27.cct / CAvatarFactor / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  callMethod("deconstruct", meProp(_me, "m_ObjRenderer"))
  }

  setMeProp(_me, "m_mp_Actions", undefined);
  setMeProp(_me, "m_mp_PartList", undefined);
  setMeProp(_me, "m_veAvatarLoc", undefined);
  setMeProp(_me, "m_rAvatarSpr", undefined);
  setMeProp(_me, "m_ObjRenderer", undefined);
  setMeProp(_me, "m_objMagic", undefined);
  setMeProp(_me, "m_iMyRef", undefined);
  setMeProp(_me, "m_sRenderer", undefined);
  setMeProp(_me, "m_mp_AvatarData", undefined);
  setMeProp(_me, "m_objVehicle", undefined);
  if (callNamed("objectp", meProp(_me, "m_ObjMagicFx"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_ObjMagicFx")))
  setMeProp(_me, "m_ObjMagicFx", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_objVehicle"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_objVehicle")))
  setMeProp(_me, "m_objVehicle", undefined);
  }

}

