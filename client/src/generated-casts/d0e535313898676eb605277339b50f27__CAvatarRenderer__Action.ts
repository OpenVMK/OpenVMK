// d0e535313898676eb605277339b50f27.cct / CAvatarRenderer / Action

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Action(_me: LingoMe, a_mp_AvatarData: LingoValue) {
  setMeProp(_me, "m_mp_AvatarData", a_mp_AvatarData);
  setMeProp(_me, "m_iPrevEmoticon", meProp(_me, "m_iEmoticon"));
  setMeProp(_me, "m_Obj_Vehicle", meProp(_me, "m_mp_AvatarData").VehicleObj);
  setMeProp(_me, "m_iVehicle", meProp(_me, "m_mp_AvatarData").Feet);
  setMeProp(_me, "m_Obj_Magic", meProp(_me, "m_mp_AvatarData").MagicObj);
  setMeProp(_me, "m_iMagic", meProp(_me, "m_mp_AvatarData").magic);
  setMeProp(_me, "m_objVehicle", meProp(_me, "m_mp_AvatarData").VehicleObj);
  setMeProp(_me, "m_iTradeState", meProp(_me, "m_mp_AvatarData").TradeState);
  setMeProp(_me, "m_iWeapon", meProp(_me, "m_mp_AvatarData").Weapon);
  if (lingoBinary("eq", meProp(_me, "m_iMagic"), 9)) {
  if (lingoBinary("eq", meProp(_me, "m_ar_StormImgList").count, 0)) {
  return callMethod("CacheStormFxImages", _me);
  } else {
  if (callNamed("objectp", meProp(_me, "m_Obj_Magic"))) {
  callMethod("SetStormFximages", meProp(_me, "m_Obj_Magic"), meProp(_me, "m_ar_StormImgList"))
  }

  }

  }

  setMeProp(_me, "m_bFlipped", 0);
  setMeProp(_me, "m_bActMv", 0);
  setMeProp(_me, "m_bActSit", 0);
  setMeProp(_me, "m_bActTlk", 0);
  setMeProp(_me, "m_bActCrr", 0);
  setMeProp(_me, "m_bActDnc", 0);
  setMeProp(_me, "m_bActEat", 0);
  setMeProp(_me, "m_bActWav", 0);
  setMeProp(_me, "m_bAnimating", 0);
  setMeProp(_me, "m_sCurrentAnim", "");
  setMeProp(_me, "m_iHeadDir", meProp(_me, "m_mp_AvatarData").HeadDir);
  setMeProp(_me, "m_iBdDir", meProp(_me, "m_mp_AvatarData").BodyDir);
  callMethod("Refresh", _me, meProp(_me, "m_iBdDir"), meProp(_me, "m_iHeadDir"))
  setMeProp(_me, "m_iSync", 0);
  setMeProp(_me, "m_iEmoticon", meProp(_me, "m_mp_AvatarData").emoticon);
  callMethod("ActEyes", _me, meProp(_me, "m_mp_AvatarData").Eyes)
  callMethod("ActMouth", _me, meProp(_me, "m_mp_AvatarData").Mouth)
  callMethod("ActLeftHand", _me, meProp(_me, "m_mp_AvatarData").LeftHand)
  callMethod("ActRightHand", _me, meProp(_me, "m_mp_AvatarData").RightHand)
  callMethod("ActLeftFoot", _me, meProp(_me, "m_mp_AvatarData").Feet)
  callMethod("ActRightFoot", _me, meProp(_me, "m_mp_AvatarData").Feet)
  setMeProp(_me, "m_bFlipped", meProp(_me, "m_mp_AvatarData").Flipped);
  setMeProp(_me, "m_iCanvasHeight", 160);
  setMeProp(_me, "m_iCanvasWidth", 80);
  if (lingoBinary("eq", meProp(_me, "m_iTradeState"), 1)) {
  setMeProp(_me, "m_iEmoticon", 1000);
  }

  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_iEmoticon"), 0), lingoBinary("neq", meProp(_me, "m_iPrevEmoticon"), 0))) {
  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_iTileSize"), 32), (lingoTruthy(callNamed("voidp", meProp(_me, "m_rAvatarSpr"))) ? 0 : 1))) {
  setThePropOf(meProp(_me, "m_rAvatarSpr").member, "image", callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32));
  }

  }

}

