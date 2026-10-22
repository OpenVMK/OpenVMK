// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryComponent / getFigureSets

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getFigureSets(_me: LingoMe, a_iPartNum: LingoValue) {
  if (callNamed("listp", meProp(_me, "m_ar_FigureSetNumbers"))) {
  var t_SetName = undefined;
  if (lingoBinary("eq", a_iPartNum, -float(1))) {
  t_SetName = "ht";
  var t_sSex = meProp(_me, "m_sSex");
  }

  var t_iCount = lingoBinary("sub", meProp(_me, "m_ar_FigureSetNumbers").count, 1);
  if (lingoBinary("neq", t_SetName, "ht")) {
  for (var i = 1; i <= t_iCount; ++i) {
  var i_value1 = callMethod("getPropAt", meProp(_me, "m_ar_FigureSetNumbers"), i);
  var i_value2 = callMethod("getPropAt", meProp(_me, "m_ar_FigureSetNumbers"), lingoBinary("add", i, 1));
  i_value1 = callNamed("value", i_value1);
  i_value2 = callNamed("value", i_value2);
  switch (1) {
case lingoBinary("eq", i_value1, a_iPartNum):
  t_SetName = meProp(_me, "m_ar_FigureSetNumbers")[i][1];
  t_sSex = meProp(_me, "m_ar_FigureSetNumbers")[i][2];
  break;
case lingoBinary("eq", i_value2, a_iPartNum):
  t_SetName = meProp(_me, "m_ar_FigureSetNumbers")[lingoBinary("add", i, 1)][1];
  t_sSex = meProp(_me, "m_ar_FigureSetNumbers")[lingoBinary("add", i, 1)][2];
  break;
case lingoBinary("and", lingoBinary("lt", i_value1, a_iPartNum), lingoBinary("lt", a_iPartNum, i_value2)):
  t_SetName = meProp(_me, "m_ar_FigureSetNumbers")[i][1];
  t_sSex = meProp(_me, "m_ar_FigureSetNumbers")[i][2];
  break;
case lingoBinary("gt", a_iPartNum, i_value2):
  t_SetName = meProp(_me, "m_ar_FigureSetNumbers")[lingoBinary("add", i, 1)][1];
  t_sSex = meProp(_me, "m_ar_FigureSetNumbers")[lingoBinary("add", i, 1)][2];
  break;
  }

  }

  }

  if ((lingoTruthy(callNamed("voidp", t_SetName)) ? 0 : 1)) {
  var t_sSetContents = meProp(_me, "m_ar_rSetContents")[t_SetName];
  var t_mp_list = new LingoList([]);
  callMethod("add", t_mp_list, t_SetName)
  callMethod("add", t_mp_list, t_sSetContents)
  callMethod("add", t_mp_list, t_sSex)
  return t_mp_list;
  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "No such figure set available: ", a_iPartNum), symbol("getFigureSets"));
  }

  }

}

