// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryComponent / CreateAvatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateAvatar(_me: LingoMe, a_mp_DataList: LingoValue) {
  var t_mp_data = callMethod("ParseFigure", _me, a_mp_DataList.input);
  var t_Obj = a_mp_DataList.Output;
  var t_rObj = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  if (callNamed("objectp", t_rObj)) {
  var t_iTileSize = callMethod("GetParam", t_rObj, "TILESIZE");
  }

  if (lingoBinary("and", meProp(_me, "m_bMinigameRunning"), lingoBinary("eq", t_iTileSize, 16))) {
  callNamed("createVariable", "avatarHeight", 160)
  callNamed("createVariable", "avatarWidth", 100)
  } else {
  callNamed("createVariable", "avatarHeight", 160)
  callNamed("createVariable", "avatarWidth", 80)
  }

  if (callNamed("objectp", t_Obj)) {
  callMethod("ResetClothesSituation", t_Obj)
  callMethod("Define", t_Obj, t_mp_data)
  } else {
  var t_ObjAvatar = a_mp_DataList.avatar;
  var t_ClsPartObj = callNamed("createObject", symbol("temp"), "CAvatarFactor");
  callMethod("SetMiniGameState", t_ClsPartObj, meProp(_me, "m_bMinigameRunning"), meProp(_me, "m_sMiniGameRunning"))
  callMethod("Define", t_ClsPartObj, t_mp_data)
  callMethod("SetAvatarInfo", t_ClsPartObj, t_ObjAvatar)
  a_mp_DataList[symbol("Output")] = t_ClsPartObj;
  }

}

