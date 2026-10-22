// d0e535313898676eb605277339b50f27.cct / CAvatarFactor / Action

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Action(_me: LingoMe, a_Ar_Data: LingoValue) {
  if ((lingoTruthy(meProp(_me, "m_bNeededClothesLoaded")) ? 0 : 1)) {
  setMeProp(_me, "m_ar_ActionData", a_Ar_Data);
  }

  var t_iheadDir = a_Ar_Data[1];
  var t_ibdDir = a_Ar_Data[2];
  var t_iMagic = a_Ar_Data[10];
  var t_iFeet = a_Ar_Data[8];
  var t_iTrade = a_Ar_Data[9];
  if (lingoBinary("gt", a_Ar_Data.count, 10)) {
  var t_iWeapon = a_Ar_Data[11];
  } else {
  t_iWeapon = 0;
  }

  if (lingoBinary("or", lingoBinary("or", lingoBinary("neq", meProp(_me, "m_arFlipList")[lingoBinary("add", t_ibdDir, 1)], t_ibdDir), lingoBinary("and", lingoBinary("eq", t_ibdDir, 4), lingoBinary("eq", t_iheadDir, 5))), lingoBinary("and", lingoBinary("eq", t_ibdDir, 0), lingoBinary("eq", t_iheadDir, 7)))) {
  var t_bFlipped = 1;
  } else {
  t_bFlipped = 0;
  }

  if (lingoBinary("neq", t_iMagic, 0)) {
  if (lingoBinary("neq", meProp(_me, "m_iCurrentMagic"), t_iMagic)) {
  if (callNamed("objectp", meProp(_me, "m_ObjMagicFx"))) {
  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  callMethod("Define", _me, meProp(_me, "m_mp_PartPieces"))
  }

  callNamed("removeObject", callMethod("getID", meProp(_me, "m_ObjMagicFx")))
  setMeProp(_me, "m_ObjMagicFx", undefined);
  }

  }

  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_ObjMagicFx"))) ? 0 : 1)) {
  setMeProp(_me, "m_ObjMagicFx", callNamed("createObject", callNamed("getUniqueID"), "CMagicFactor"));
  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  callMethod("ArrowHide", meProp(_me, "m_ObjRenderer"))
  }

  }

  callMethod("SetFx", meProp(_me, "m_ObjMagicFx"), t_iMagic, meProp(_me, "m_iTileSize"), t_bFlipped, t_ibdDir, meProp(_me, "m_iMyRef"), meProp(_me, "m_sMyName"), meProp(_me, "m_sAvatarName"))
  if (lingoBinary("gt", t_iMagic, 99)) {
  callMethod("SetCarPantAction", meProp(_me, "m_ObjMagicFx"), t_iFeet)
  }

  if (lingoBinary("and", lingoBinary("eq", t_iMagic, 16), lingoBinary("eq", meProp(_me, "m_sMyName"), meProp(_me, "m_sAvatarName")))) {
  callNamed("executeMessage", "DisableDanceButton", 0)
  }

  } else {
  if (callNamed("objectp", meProp(_me, "m_ObjMagicFx"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_ObjMagicFx")))
  setMeProp(_me, "m_ObjMagicFx", undefined);
  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  callMethod("Define", _me, meProp(_me, "m_mp_PartPieces"))
  }

  }

  }

  if (lingoBinary("or", lingoBinary("eq", t_iMagic, 18), lingoBinary("eq", t_iMagic, 20))) {
  callMethod("ShowHideAvatar", _me, 1, 0)
  } else {
  callMethod("ShowHideAvatar", _me, 1, 1)
  }

  if (lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("eq", t_iFeet, 5), lingoBinary("eq", t_iFeet, 6)), lingoBinary("eq", t_iFeet, 7)), lingoBinary("eq", t_iFeet, 8)), lingoBinary("eq", t_iFeet, 9)), lingoBinary("eq", t_iFeet, 10)), lingoBinary("eq", t_iFeet, 11)), lingoBinary("eq", t_iFeet, 12)), lingoBinary("eq", t_iFeet, 13))) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_objVehicle"))) ? 0 : 1)) {
  setMeProp(_me, "m_objVehicle", callNamed("createObject", callNamed("getUniqueID"), "CAvatarVehicle"));
  }

  callMethod("SetVehicle", meProp(_me, "m_objVehicle"), t_iFeet, t_ibdDir, meProp(_me, "m_sMyName"), meProp(_me, "m_sAvatarName"))
  callMethod("ShowHideAvatar", _me, 1, 0)
  if (lingoBinary("or", lingoBinary("eq", t_iFeet, 10), lingoBinary("eq", t_iFeet, 11))) {
  callMethod("ShowHideAvatar", _me, 1, 1)
  }

  } else {
  if (callNamed("objectp", meProp(_me, "m_objVehicle"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_objVehicle")))
  setMeProp(_me, "m_objVehicle", undefined);
  callMethod("ShowHideAvatar", _me, 1, 1)
  }

  }

  setMeProp(_me, "m_mp_AvatarData", new LingoPropList([]));
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("HeadDir"), t_iheadDir)
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("BodyDir"), t_ibdDir)
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("emoticon"), a_Ar_Data[3])
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("Eyes"), a_Ar_Data[4])
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("Mouth"), a_Ar_Data[5])
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("LeftHand"), a_Ar_Data[6])
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("RightHand"), a_Ar_Data[7])
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("Feet"), t_iFeet)
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("magic"), t_iMagic)
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("tilesize"), meProp(_me, "m_iTileSize"))
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("Flipped"), t_bFlipped)
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("objects"), meProp(_me, "m_mp_PartList"))
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("MyRef"), meProp(_me, "m_iMyRef"))
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("MagicObj"), meProp(_me, "m_ObjMagicFx"))
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("VehicleObj"), meProp(_me, "m_objVehicle"))
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("TradeState"), t_iTrade)
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("avatarName"), meProp(_me, "m_sAvatarName"))
  callMethod("addProp", meProp(_me, "m_mp_AvatarData"), symbol("Weapon"), t_iWeapon)
  setMeProp(_me, "m_iCurrentMagic", t_iMagic);
  callMethod("SetAvatarRenderer", _me)
  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  callMethod("Action", meProp(_me, "m_ObjRenderer"), meProp(_me, "m_mp_AvatarData"))
  }

}

