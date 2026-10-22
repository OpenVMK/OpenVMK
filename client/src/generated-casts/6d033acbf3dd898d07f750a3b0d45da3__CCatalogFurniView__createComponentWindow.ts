// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogFurniView / createComponentWindow

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

  setMeProp(_me, "m_iShopsFound", 0);
  for (var j = 1; j <= a_mpShopList.count; ++j) {
  var t_sPropName = callMethod("getPropAt", a_mpShopList, j);
  if (lingoBinary("and", (lingoTruthy(lingoBinary("contains", t_sPropName, "clothing")) ? 0 : 1), (lingoTruthy(lingoBinary("contains", t_sPropName, "rooms")) ? 0 : 1))) {
  var t_rComponent = callMethod("addComponent", t_rComponentsPage, t_ar_componentsPage[1][1]);
  callMethod("setText", callMethod("GetLayout", t_rComponent, 1), t_sPropName)
  callMethod("setNode", callMethod("GetLayout", t_rComponent, 1), a_mpShopList[j])
  callMethod("setClickable", t_rComponent, 1)
  var t_bSpecialsFound = 0;
  for (var a = 4; a <= a_mpShopList[j].count; ++a) {
  if (lingoBinary("and", lingoBinary("and", lingoBinary("and", (lingoTruthy(lingoBinary("contains", callMethod("getPropAt", a_mpShopList[j], a), "Furniture")) ? 0 : 1), (lingoTruthy(lingoBinary("contains", callMethod("getPropAt", a_mpShopList[j], a), "Pins")) ? 0 : 1)), (lingoTruthy(lingoBinary("contains", callMethod("getPropAt", a_mpShopList[j], a), "Posters")) ? 0 : 1)), (lingoTruthy(lingoBinary("contains", callMethod("getPropAt", a_mpShopList[j], a), "Specials!")) ? 0 : 1))) {
  var t_rSubComponent = callMethod("addComponent", t_rComponent, t_ar_componentsPage[1][2]);
  callMethod("setText", callMethod("GetLayout", t_rSubComponent, 1), callMethod("getPropAt", a_mpShopList[j], a))
  callMethod("setClickable", callMethod("GetLayout", t_rSubComponent, 1), 1)
  callMethod("setNode", callMethod("GetLayout", t_rSubComponent, 1), a_mpShopList[j][a])
  t_bSpecialsFound = 1;
  }

  }

  if (lingoBinary("and", t_bSpecialsFound, (lingoTruthy(lingoBinary("or", lingoBinary("eq", meProp(_me, "m_sActiveCategory"), "pins"), lingoBinary("eq", meProp(_me, "m_sActiveCategory"), "posters"))) ? 0 : 1))) {
  callMethod("toggleShowChildren", t_rComponent)
  }

  setMeProp(_me, "m_iShopsFound", lingoBinary("add", meProp(_me, "m_iShopsFound"), 1));
  }

  }

  if (lingoBinary("gt", meProp(_me, "m_iShopsFound"), 0)) {
  var t_rImg = callMethod("render", t_rComponentsPage);
  callMethod("feedImage", t_rClientElement, t_rImg)
  }

  meProp(_me, "m_ar_components")[t_sElemName] = t_rComponentsPage;
  }

}

