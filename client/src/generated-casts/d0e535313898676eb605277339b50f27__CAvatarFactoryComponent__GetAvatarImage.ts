// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryComponent / GetAvatarImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetAvatarImage(_me: LingoMe, a_mp_DataList: LingoValue) {
  if (lingoBinary("and", callNamed("objectp", meProp(_me, "m_objAnimator")), callNamed("listp", a_mp_DataList))) {
  setMeProp(_me, "m_bAvatarImageClothesReady", 0);
  var t_Img = undefined;
  var t_ar_DataList = a_mp_DataList[symbol("figure")];
  var t_ar_Dirs = a_mp_DataList[symbol("Dir")];
  var t_iHandAction = a_mp_DataList[symbol("act")][1];
  var t_iFeetAction = a_mp_DataList[symbol("act")][2];
  var t_mp_data = callMethod("ParseFigure", _me, t_ar_DataList);
  var t_mp_LoadableClothes = new LingoPropList([]);
  for (var i = 1; i <= t_ar_DataList.count; ++i) {
  var t_iID = t_ar_DataList[i];
  if (lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("lt", t_iID, 21000), lingoBinary("and", lingoBinary("gt", t_iID, 21999), lingoBinary("lt", t_iID, 24000))), lingoBinary("and", lingoBinary("gt", t_iID, 29999), lingoBinary("lt", t_iID, 31000))), lingoBinary("and", lingoBinary("gt", t_iID, 31999), lingoBinary("lt", t_iID, 34000))), lingoBinary("and", lingoBinary("gt", t_iID, 39999), lingoBinary("lt", t_iID, 41000))), lingoBinary("and", lingoBinary("gt", t_iID, 41999), lingoBinary("lt", t_iID, 44000)))) {
  continue;
  }

  callMethod("addProp", t_mp_LoadableClothes, t_iID, undefined)
  }

  var t_mp_Data1 = new LingoPropList([symbol("client"), callMethod("getID", _me), symbol("method"), symbol("AvatarImageClothesDone")]);
  callNamed("executeMessage", "GetClothThumbnail", t_mp_LoadableClothes, t_mp_Data1)
  }

  if (meProp(_me, "m_bAvatarImageClothesReady")) {
  t_mp_data = new LingoPropList([symbol("outlook"), t_ar_DataList, symbol("tilesize"), 32]);
  callMethod("Define", meProp(_me, "m_objAnimator"), t_mp_data)
  var t_mp_data2 = new LingoPropList([symbol("head"), t_ar_Dirs[1], symbol("body"), t_ar_Dirs[2], symbol("emoticon"), 0, symbol("LeftHand"), t_iHandAction, symbol("RightHand"), t_iHandAction, symbol("legs"), t_iFeetAction, symbol("magic"), 0]);
  t_Img = callMethod("SetAction", meProp(_me, "m_objAnimator"), t_mp_data2);
  a_mp_DataList[symbol("Output")] = t_Img;
  return 1;
  } else {
  callMethod("delay", _me, 200, symbol("GetAvatarImage"))
  }

}

