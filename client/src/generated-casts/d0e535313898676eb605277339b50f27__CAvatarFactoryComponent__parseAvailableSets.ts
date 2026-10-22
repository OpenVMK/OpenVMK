// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryComponent / parseAvailableSets

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseAvailableSets(_me: LingoMe, ar_data: LingoValue) {
  if (callNamed("listp", ar_data)) {
  var t_ar_availableSets1 = ar_data;
  callMethod("add", t_ar_availableSets1, "-1")
  var t_ar_availableSets = new LingoPropList([]);
  for (var i = 1; i <= t_ar_availableSets1.count; ++i) {
  var t_iSetNum = callNamed("string", t_ar_availableSets1[i]);
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

  if (lingoBinary("gt", callMethod("findPos", t_ar_availableSets, t_sSetName), 0)) {
  var t_mp_SetContent = meProp(_me, "m_mp_AllSets")[t_sSetName][t_iSetNum];
  callMethod("addProp", t_ar_availableSets[t_sSetName], t_iSetNum, t_mp_SetContent)
  continue;
  }

  callMethod("addProp", t_ar_availableSets, t_sSetName, new LingoPropList([]))
  t_mp_SetContent = meProp(_me, "m_mp_AllSets")[t_sSetName][t_iSetNum];
  callMethod("addProp", t_ar_availableSets[t_sSetName], t_iSetNum, t_mp_SetContent)
  }

  if (callMethod("findPos", meProp(_me, "m_mp_AvatarBuilderData"), "AvailableSets")) {
  meProp(_me, "m_mp_AvatarBuilderData")["AvailableSets"] = t_ar_availableSets;
  } else {
  callMethod("addProp", meProp(_me, "m_mp_AvatarBuilderData"), "AvailableSets", t_ar_availableSets)
  }

  callMethod("AvailableSetsReceived", _me._interface, meProp(_me, "m_mp_AvatarBuilderData"))
  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "Available set list is corrupted: ", ar_data), symbol("parseAvailableSets"));
  }

}

