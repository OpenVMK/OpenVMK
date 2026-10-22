// registration.cct / CRegClothesLoader / DefineAvailableSets

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DefineAvailableSets(_me: LingoMe, _this: LingoValue, a_Ar_Data: LingoValue) {
  callMethod("ShowLoginLoadingScreen", _this)
  var t_Obj = callMethod("GetClothAssetManager", callNamed("getThread", symbol("AvatarFactory")).component);
  if (callNamed("objectp", t_Obj)) {
  var t_mp_DataList = a_Ar_Data;
  callMethod("sort", t_mp_DataList)
  for (var i = 1; i <= t_mp_DataList.count; ++i) {
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
  callMethod("add", meProp(_me, "m_ar_ClothesToLoad"), t_iSetNum)
  callMethod("LoadCastLibsForCloth", t_Obj, _this, t_iSetNum)
  }

  }

  }

  }

}

