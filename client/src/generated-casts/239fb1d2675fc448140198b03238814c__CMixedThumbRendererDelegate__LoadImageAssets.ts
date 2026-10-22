// 239fb1d2675fc448140198b03238814c.cct / CMixedThumbRendererDelegate / LoadImageAssets

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadImageAssets(_me: LingoMe, _this: LingoValue, a_mp_iType_rOutput: LingoValue, a_rCallback: LingoValue, a_sThumbnaimOrPreview: LingoValue) {
  setMeProp(_me, "m_rCallback", a_rCallback);
  setMeProp(_me, "m_mp_iType_rOutput", a_mp_iType_rOutput);
  if (lingoBinary("eq", a_mp_iType_rOutput.count, 0)) {
  callNamed("call", meProp(_me, "m_rCallback")[symbol("method")], new LingoList([callNamed("getObject", meProp(_me, "m_rCallback")[symbol("client")])]), meProp(_me, "m_mp_iType_rOutput"), meProp(_me, "m_rCallback"))
  callNamed("removeObject", callMethod("getID", _this))
  return;
  }

  var t_rPlaceHolder = callNamed("image", 0, 0, 32);
  var t_iCount = a_mp_iType_rOutput.count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iType = callMethod("getPropAt", a_mp_iType_rOutput, i);
  switch (1) {
case lingoBinary("lt", t_iType, 2000):
  var t_kCategory = symbol("item");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 2000), lingoBinary("lt", t_iType, 3001)):
  t_kCategory = symbol("pin");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 3000), lingoBinary("lt", t_iType, 4001)):
  t_kCategory = symbol("poster");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 20000), lingoBinary("lt", t_iType, 50000)):
  t_kCategory = symbol("cloth");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 5000), lingoBinary("lt", t_iType, 6000)):
  t_kCategory = symbol("room");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 6000), lingoBinary("lt", t_iType, 8000)):
  t_kCategory = symbol("pin");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 10000), lingoBinary("lt", t_iType, 12001)):
  t_kCategory = symbol("item");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 12000), lingoBinary("lt", t_iType, 13001)):
  t_kCategory = symbol("pin");
  break;
  default:
  callNamed("error", _this, lingoBinary("join", lingoBinary("joinPad", "Unknow item category for item number", t_iType), "!"), symbol("LoadThumbnailAssets"))
  continue;
  }

  if (lingoBinary("eq", callMethod("getaProp", meProp(_me, "m_mp_kCategory_mp_iType_rImage")[t_kCategory], t_iType), undefined)) {
  callMethod("addProp", meProp(_me, "m_mp_kCategory_mp_iType_rImage")[t_kCategory], t_iType, t_rPlaceHolder)
  }

  }

  if (meProp(_me, "m_mp_kCategory_mp_iType_rImage")[symbol("item")].count) {
  callNamed("executeMessage", lingoBinary("join", "GetFurni", a_sThumbnaimOrPreview), meProp(_me, "m_mp_kCategory_mp_iType_rImage")[symbol("item")], new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_AssetsLoadedCbk")]))
  }

  if ((lingoTruthy(_this.valid) ? 0 : 1)) {
  return;
  }

  if (meProp(_me, "m_mp_kCategory_mp_iType_rImage")[symbol("pin")].count) {
  callNamed("executeMessage", lingoBinary("join", "GetPin", a_sThumbnaimOrPreview), meProp(_me, "m_mp_kCategory_mp_iType_rImage")[symbol("pin")], new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_AssetsLoadedCbk")]))
  }

  if ((lingoTruthy(_this.valid) ? 0 : 1)) {
  return;
  }

  if (meProp(_me, "m_mp_kCategory_mp_iType_rImage")[symbol("poster")].count) {
  callNamed("executeMessage", lingoBinary("join", "GetPoster", a_sThumbnaimOrPreview), meProp(_me, "m_mp_kCategory_mp_iType_rImage")[symbol("poster")], new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_AssetsLoadedCbk")]))
  }

  if ((lingoTruthy(_this.valid) ? 0 : 1)) {
  return;
  }

  if (meProp(_me, "m_mp_kCategory_mp_iType_rImage")[symbol("cloth")].count) {
  callNamed("executeMessage", lingoBinary("join", "GetCloth", a_sThumbnaimOrPreview), meProp(_me, "m_mp_kCategory_mp_iType_rImage")[symbol("cloth")], new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_AssetsLoadedCbk")]))
  }

  if ((lingoTruthy(_this.valid) ? 0 : 1)) {
  return;
  }

  if (meProp(_me, "m_mp_kCategory_mp_iType_rImage")[symbol("room")].count) {
  callNamed("executeMessage", lingoBinary("join", "GetRoom", a_sThumbnaimOrPreview), meProp(_me, "m_mp_kCategory_mp_iType_rImage")[symbol("room")], new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_AssetsLoadedCbk")]))
  }

}

