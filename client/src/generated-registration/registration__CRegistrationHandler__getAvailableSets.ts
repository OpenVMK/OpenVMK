// registration.cct / CRegistrationHandler / getAvailableSets

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAvailableSets(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  if (lingoBinary("and", !lingoTruthy(meProp(_me, "m_bAvailableSetsReady")), !lingoTruthy(callNamed("voidp", tMsg)))) {
  var t_ar_AllAvailableSets = new LingoList([]);
  var t_mp_SetList = new LingoPropList([]);
  var t_arMaleSets = new LingoList([]);
  var t_iMaleSetCount = callMethod("GetIntFrom", tMsg.connection);
  for (var i = 1; i <= t_iMaleSetCount; ++i) {
  var t_sSetId = callNamed("string", callMethod("GetIntFrom", tMsg.connection));
  callMethod("add", t_arMaleSets, t_sSetId)
  callMethod("add", t_ar_AllAvailableSets, t_sSetId)
  }

  callMethod("sort", t_arMaleSets)
  callMethod("addProp", t_mp_SetList, "M", t_arMaleSets)
  var t_arFemaleSets = new LingoList([]);
  var t_iFemaleSetCount = callMethod("GetIntFrom", tMsg.connection);
  for (var e = 1; e <= t_iFemaleSetCount; ++e) {
  t_sSetId = callNamed("string", callMethod("GetIntFrom", tMsg.connection));
  callMethod("add", t_arFemaleSets, t_sSetId)
  callMethod("add", t_ar_AllAvailableSets, t_sSetId)
  }

  callMethod("sort", t_arFemaleSets)
  callMethod("addProp", t_mp_SetList, "F", t_arFemaleSets)
  var t_arDefaultMaleSet = new LingoList([]);
  for (var f = 1; f <= 12; ++f) {
  callMethod("add", t_arDefaultMaleSet, callMethod("GetIntFrom", tMsg.connection))
  }

  callMethod("addProp", t_mp_SetList, "Default_M", t_arDefaultMaleSet)
  var t_arDefaultFemaleSet = new LingoList([]);
  for (var g = 1; g <= 12; ++g) {
  callMethod("add", t_arDefaultFemaleSet, callMethod("GetIntFrom", tMsg.connection))
  }

  callMethod("addProp", t_mp_SetList, "Default_F", t_arDefaultFemaleSet)
  setMeProp(_me, "m_arPArsedAvailbleSets", t_mp_SetList);
  setMeProp(_me, "m_bAvailableSetsReady", 1);
  }

  if (callNamed("listp", t_ar_AllAvailableSets)) {
  if (!lingoTruthy(callNamed("objectExists", "RegistrationClothesLoader"))) {
  var t_Obj = callNamed("createObject", "RegistrationClothesLoader", "CRegClothesLoader");
  callMethod("DefineAvailableSets", t_Obj, t_ar_AllAvailableSets)
  }

  }

}

