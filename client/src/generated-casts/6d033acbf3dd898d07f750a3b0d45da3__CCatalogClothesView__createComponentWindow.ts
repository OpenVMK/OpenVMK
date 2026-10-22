// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / createComponentWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createComponentWindow(_me: LingoMe, a_mpShopList: LingoValue, a_bAppend: LingoValue) {
  var tWndObj = meProp(_me, "m_rWndObj");
  if (callNamed("objectp", meProp(_me, "m_rWndObj"))) {
  var t_ar_componentsPage = new LingoPropList(["cat.list", new LingoList(["component.CatalogShops.roomlist.xml", "component.CatalogShops.special.xml"])]);
  var i = 1;
  var t_sElemName = callMethod("getPropAt", t_ar_componentsPage, i);
  var t_ar_components = t_ar_componentsPage[i];
  var t_rClientElement = callMethod("getElement", tWndObj, t_sElemName);
  if ((lingoTruthy(a_bAppend) ? 0 : 1)) {
  var t_rComponentsPage = callNamed("createObject", callNamed("getUniqueID"), "CUIComponentPage");
  callMethod("setSize", t_rComponentsPage, t_rClientElement.pOwnW, t_rClientElement.pOwnH)
  callMethod("setColor", t_rComponentsPage, callNamed("rgb", "#001F56"))
  } else {
  t_rComponentsPage = t_ar_componentsPage[t_sElemName];
  }

  for (var j = 1; j <= a_mpShopList.count; ++j) {
  var t_sPropName = callMethod("getPropAt", a_mpShopList, j);
  if (lingoBinary("contains", t_sPropName, "clothing")) {
  for (var a = 4; a <= a_mpShopList[j].count; ++a) {
  var t_rComponent = callMethod("addComponent", t_rComponentsPage, t_ar_componentsPage[1][1]);
  callMethod("setText", callMethod("GetLayout", t_rComponent, 1), callMethod("getPropAt", a_mpShopList[j], a))
  callMethod("setNode", callMethod("GetLayout", t_rComponent, 1), a_mpShopList[j][a])
  callMethod("setClickable", t_rComponent, 1)
  }

  }

  }

  var t_rImg = callMethod("render", t_rComponentsPage);
  callMethod("feedImage", t_rClientElement, t_rImg)
  meProp(_me, "m_ar_components")[t_sElemName] = t_rComponentsPage;
  }

}

