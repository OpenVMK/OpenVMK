// d0e535313898676eb605277339b50f27.cct / CAvatarAnimator / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, a_mp_DataList: LingoValue) {
  callNamed("registerObject", callNamed("getUniqueID"), _me)
  setMeProp(_me, "m_bAllClothesLoaded", 0);
  var t_ar_ClothesToLoad = new LingoPropList([]);
  setMeProp(_me, "m_mp_ParsedData", callMethod("ParseFigure", callNamed("getThread", symbol("AvatarFactory")).component, a_mp_DataList.outlook));
  setMeProp(_me, "m_iTileSize", a_mp_DataList.tilesize);
  setMeProp(_me, "m_ObjRenderer", callNamed("createObject", symbol("temp"), "CAvatarFactor"));
  callMethod("Define", meProp(_me, "m_ObjRenderer"), meProp(_me, "m_mp_ParsedData"))
  callMethod("SetAnimatingState", meProp(_me, "m_ObjRenderer"))
  callMethod("SetTileSize", meProp(_me, "m_ObjRenderer"), meProp(_me, "m_iTileSize"))
  var t_Obj = callMethod("GetClothAssetManager", callNamed("getThread", symbol("AvatarFactory")).component);
  if (callNamed("objectp", t_Obj)) {
  var t_mp_DataList = a_mp_DataList.outlook;
  for (var i = 1; i <= t_mp_DataList.count; ++i) {
  if (lingoBinary("mod", i, 2)) {
  var t_iSetNum = t_mp_DataList[i];
  switch (1) {
case lingoBinary("eq", t_iSetNum, -float(1)):
  var t_sSetName = "ht";
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 20000), lingoBinary("lt", t_iSetNum, 21000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 30000), lingoBinary("lt", t_iSetNum, 31000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 40000), lingoBinary("lt", t_iSetNum, 41000)):
  t_sSetName = "hr";
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 21000), lingoBinary("lt", t_iSetNum, 22000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 31000), lingoBinary("lt", t_iSetNum, 32000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 41000), lingoBinary("lt", t_iSetNum, 42000)):
  t_sSetName = "ht";
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 22000), lingoBinary("lt", t_iSetNum, 24000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 32000), lingoBinary("lt", t_iSetNum, 34000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 42000), lingoBinary("lt", t_iSetNum, 44000)):
  t_sSetName = "hd";
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 24000), lingoBinary("lt", t_iSetNum, 26000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 34000), lingoBinary("lt", t_iSetNum, 36000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 44000), lingoBinary("lt", t_iSetNum, 46000)):
  t_sSetName = "ch";
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 26000), lingoBinary("lt", t_iSetNum, 28000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 36000), lingoBinary("lt", t_iSetNum, 38000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 46000), lingoBinary("lt", t_iSetNum, 48000)):
  t_sSetName = "pn";
  break;
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 28000), lingoBinary("lt", t_iSetNum, 30000)):
case lingoBinary("and", lingoBinary("gte", t_iSetNum, 38000), lingoBinary("lt", t_iSetNum, 40000)):
case lingoBinary("gte", t_iSetNum, 48000):
  t_sSetName = "sh";
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  if (lingoBinary("and", lingoBinary("neq", t_sSetName, "hr"), lingoBinary("neq", t_sSetName, "hd"))) {
  if (lingoBinary("eq", callMethod("findPos", meProp(_me, "m_ar_ClothesToLoad"), t_iSetNum), 0)) {
  if ((lingoTruthy(callMethod("IsClothReady", t_Obj, t_iSetNum)) ? 0 : 1)) {
  callMethod("addProp", t_ar_ClothesToLoad, t_iSetNum, undefined)
  }

  }

  }

  }

  }

  if (lingoBinary("gt", t_ar_ClothesToLoad.count, 0)) {
  var t_mp_Data1 = new LingoPropList([symbol("client"), callMethod("getID", _me), symbol("method"), symbol("ClothesThumbsLoaded")]);
  callNamed("executeMessage", "GetClothThumbnail", t_ar_ClothesToLoad, t_mp_Data1)
  } else {
  setMeProp(_me, "m_bAllClothesLoaded", 1);
  }

  }

  if (lingoBinary("gt", callMethod("findPos", a_mp_DataList, symbol("sprite")), 0)) {
  callMethod("SetSprite", _me, a_mp_DataList.sprite)
  } else {
  callMethod("SetSprite", _me)
  }

}

