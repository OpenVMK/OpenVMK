// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryComponent / createRandomAvat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createRandomAvat(_me: LingoMe, a_mp_DataList: LingoValue) {
  if (callNamed("listp", a_mp_DataList)) {
  var t_mp_DataList = new LingoList([]);
  var t_iAct = a_mp_DataList[symbol("input")][1];
  var t_iHdDir = a_mp_DataList[symbol("input")][2];
  var t_ibdDir = a_mp_DataList[symbol("input")][3];
  var t_setList = meProp(_me, "m_mp_AllSets");
  var t_iCount = t_setList.count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_sSet = callMethod("getPropAt", t_setList[i], callNamed("random", t_setList[i].count));
  callMethod("add", t_mp_DataList, callNamed("value", t_sSet))
  var t_arColorList = t_setList[i][t_sSet][2];
  var t_sColor = callNamed("random", t_arColorList.count);
  callMethod("add", t_mp_DataList, t_sColor)
  }

  var t_mp_data = callMethod("ParseFigure", _me, t_mp_DataList);
  var t_ClsPartObj = callNamed("createObject", symbol("temp"), "CAvatarClass");
  callMethod("Define", t_ClsPartObj, t_mp_data)
  var t_arActionList = new LingoList([t_iHdDir, t_ibdDir, 0, 2, 1, 0, 0, t_iAct, 0]);
  callMethod("Action", t_ClsPartObj, t_arActionList)
  var t_Img = undefined;
  while (lingoBinary("eq", t_Img, undefined)) {
  t_Img = callMethod("updatePreviewImage", t_ClsPartObj);
  if ((lingoTruthy(callNamed("voidp", t_Img)) ? 0 : 1)) {
  break;
  }

  }

  a_mp_DataList[symbol("Output")] = t_Img;
  return 1;
  } else {
  return callNamed("error", _me, "Avatar data not defined! ", symbol("createRandomAvat"));
  }

}

