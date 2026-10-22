// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogFurniView / UpdateIndex

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateIndex(_me: LingoMe, _this: LingoValue, a_mpItemList: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_ar_components").count, 0)) {
  callMethod("createComponentWindow", _this, a_mpItemList)
  }

  if (callNamed("listp", a_mpItemList)) {
  if (lingoBinary("neq", meProp(_me, "m_iDefinedPageToShow"), undefined)) {
  setMeProp(_me, "m_iLand", meProp(_me, "m_iDefinedPageToShow"));
  var t_rComponent = callMethod("FindComponentWithId", _this, meProp(_me, "m_iLand"));
  if ((lingoTruthy(callNamed("voidp", t_rComponent)) ? 0 : 1)) {
  callMethod("setActiveComponent", meProp(_me, "m_ar_components")["cat.list"], t_rComponent)
  callMethod("showAsActive", t_rComponent, 1)
  }

  } else {
  var t_stateOn = 0;
  for (var h = 1; h <= a_mpItemList.count; ++h) {
  if (a_mpItemList[h].state) {
  setMeProp(_me, "m_iLand", a_mpItemList[h].id);
  t_rComponent = callMethod("FindComponentWithId", _this, meProp(_me, "m_iLand"));
  if ((lingoTruthy(callNamed("voidp", t_rComponent)) ? 0 : 1)) {
  callMethod("setActiveComponent", meProp(_me, "m_ar_components")["cat.list"], t_rComponent)
  callMethod("showAsActive", t_rComponent, 1)
  }

  t_stateOn = 1;
  } else {
  t_rComponent = callMethod("FindComponentWithId", _this, a_mpItemList[h].id);
  if ((lingoTruthy(callNamed("voidp", t_rComponent)) ? 0 : 1)) {
  callMethod("showAsActive", t_rComponent, 0)
  }

  }

  for (var t = 4; t <= a_mpItemList[h].count; ++t) {
  if (lingoBinary("or", a_mpItemList[h][t].special, lingoBinary("contains", callMethod("getPropAt", a_mpItemList[h], t), "Camera"))) {
  t_rComponent = callMethod("FindComponentWithId", _this, a_mpItemList[h][t].id);
  if (lingoBinary("eq", callMethod("getPropAt", a_mpItemList[h], t), meProp(_me, "m_sSpecialCategory"))) {
  callMethod("showAsActive", t_rComponent, 1)
  t_stateOn = 1;
  continue;
  }

  if ((lingoTruthy(callNamed("voidp", t_rComponent)) ? 0 : 1)) {
  callMethod("showAsActive", t_rComponent, 0)
  }

  }

  }

  }

  if ((lingoTruthy(t_stateOn) ? 0 : 1)) {
  for (var i = 1; i <= a_mpItemList.count; ++i) {
  if ((lingoTruthy(lingoBinary("or", lingoBinary("contains", callMethod("getPropAt", a_mpItemList, i), "clothing"), lingoBinary("contains", callMethod("getPropAt", a_mpItemList, i), "rooms"))) ? 0 : 1)) {
  setMeProp(_me, "m_iLand", a_mpItemList[i][symbol("id")]);
  break;
  }

  }

  }

  }

  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.list");
  if (lingoBinary("gt", meProp(_me, "m_iShopsFound"), 0)) {
  var t_rImg = callMethod("render", meProp(_me, "m_ar_components")["cat.list"]);
  callMethod("feedImage", t_rClientElement, t_rImg)
  callMethod("ShowPageInterFace", _this)
  } else {
  callMethod("FeedShopsMissingTextImage", callMethod("getInterface", callNamed("getThread", "Catalog")), t_rClientElement)
  callMethod("HidePageInterface", _this)
  }

  callMethod("FindSubPageAndRequest", _this, meProp(_me, "m_iLand"), a_mpItemList, meProp(_me, "m_sSpecialCategory"))
  if (lingoBinary("gt", meProp(_me, "m_iShopsFound"), 0)) {
  callMethod("ShowLandLogo", _this)
  }

  }

  if (callMethod("elementExists", meProp(_me, "m_rWndObj"), "cat.items.preview")) {
  if (lingoBinary("gt", meProp(_me, "m_iShopsFound"), 0)) {
  var t_rBack = callMethod("duplicate", callNamed("getMember", "previewbox.b").image);
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.items.preview"), t_rBack)
  }

  }

}

