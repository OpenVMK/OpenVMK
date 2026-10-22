// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / status

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function status(_me: LingoMe, _this: LingoValue, a_rOwnSet: LingoValue, a_rHerSet: LingoValue) {
  setMeProp(_me, "m_bOwnConfirm", a_rOwnSet.confirm);
  setMeProp(_me, "m_bHerConfirm", a_rHerSet.confirm);
  var t_rChkBox = callNamed("getMember", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bOwnConfirm")));
  if (callNamed("ilk", t_rChkBox, symbol("member"))) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.youaccept"), t_rChkBox.image)
  }

  t_rChkBox = callNamed("getMember", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bHerConfirm")));
  if (callNamed("ilk", t_rChkBox, symbol("member"))) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.heaccepts"), t_rChkBox.image)
  }

  setMeProp(_me, "m_mp_iRef_rOwnItems", a_rOwnSet.items);
  setMeProp(_me, "m_mp_iRef_rHerItems", a_rHerSet.items);
  callMethod("Unselect", meProp(_me, "m_rGridOwnItems"))
  callMethod("Unselect", meProp(_me, "m_rGridHerItems"))
  setMeProp(_me, "m_bLoadingOwnThumbs", 1);
  callMethod("SetBufferElement", meProp(_me, "m_rOwnGridLoadAnim"), callMethod("getElement", meProp(_me, "m_rWindow"), "tra.mystuff"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rOwnGridLoadAnim")))
  var t_mp_iType_rThumb = new LingoPropList([]);
  var t_iCount = meProp(_me, "m_mp_iRef_rOwnItems").count;
  for (var i = 1; i <= t_iCount; ++i) {
  callMethod("addProp", t_mp_iType_rThumb, meProp(_me, "m_mp_iRef_rOwnItems")[i].code, undefined)
  }

  setMeProp(_me, "m_iOwnGridRequest", lingoBinary("add", meProp(_me, "m_iOwnGridRequest"), 1));
  callNamed("executeMessage", "GetMixedThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_RenderOwnItems"), symbol("param"), callMethod("getElement", meProp(_me, "m_rWindow"), "tra.mystuff"), symbol("request"), meProp(_me, "m_iOwnGridRequest")]))
  t_mp_iType_rThumb = new LingoPropList([]);
  t_iCount = meProp(_me, "m_mp_iRef_rHerItems").count;
  for (var i = 1; i <= t_iCount; ++i) {
  callMethod("addProp", t_mp_iType_rThumb, meProp(_me, "m_mp_iRef_rHerItems")[i].code, undefined)
  }

  setMeProp(_me, "m_bLoadingHerThumbs", 1);
  callMethod("SetBufferElement", meProp(_me, "m_rHerGridLoadAnim"), callMethod("getElement", meProp(_me, "m_rWindow"), "tra.herstuff"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rHerGridLoadAnim")))
  setMeProp(_me, "m_iHerGridRequest", lingoBinary("add", meProp(_me, "m_iHerGridRequest"), 1));
  callNamed("executeMessage", "GetMixedThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_RenderHerItems"), symbol("param"), callMethod("getElement", meProp(_me, "m_rWindow"), "tra.herstuff"), symbol("request"), meProp(_me, "m_iHerGridRequest")]))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_iRefJustPlaced"))) ? 0 : 1)) {
  for (var j = 1; j <= meProp(_me, "m_mp_iRef_rOwnItems").count; ++j) {
  if (lingoBinary("eq", callMethod("getPropAt", meProp(_me, "m_mp_iRef_rOwnItems"), j), meProp(_me, "m_iRefJustPlaced"))) {
  callMethod("select", meProp(_me, "m_rGridOwnItems"), j)
  setMeProp(_me, "m_iRefJustPlaced", undefined);
  break;
  }

  }

  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_iRefJustPlaced"))) ? 0 : 1)) {
  callNamed("nothing")
  }

  setMeProp(_me, "m_mp_ItemsInTrade", new LingoPropList([symbol("items"), new LingoPropList([]), symbol("pins"), new LingoPropList([]), symbol("posters"), new LingoPropList([]), symbol("clothes"), new LingoPropList([])]));
  for (var t_rItem of meProp(_me, "m_mp_iRef_rOwnItems").toArray()) {
  var t_iRef = t_rItem.ref;
  var t_iCat = t_rItem.cat;
  var t_iCode = t_rItem.code;
  switch (t_iCat) {
case 1:
  var t_kType = symbol("items");
  break;
case 2:
  t_kType = symbol("clothes");
  break;
case 3:
  t_kType = symbol("posters");
  break;
case 4:
  t_kType = symbol("pins");
  break;
  // HAND-CORRECTED: the Lingo's `next repeat` belongs to the implicit
  // `otherwise` only (bytecode 00068_CInvTrade.lsasm [0645]/[0647]); the
  // transpiler emitted it unconditionally after the switch, so no offered item
  // was ever recorded as in trade.
  default:
  continue;
  }

  callMethod("addProp", t_rItem, symbol("state"), symbol("normal"))
  callMethod("addProp", meProp(_me, "m_mp_ItemsInTrade")[t_kType], t_iRef, t_rItem)
  // HAND-CORRECTED: the original's `deleteProp(t_rItemsByType, t_iRef)` is
  // dropped. That list is keyed by GROUP string ("w12"), so an integer row id
  // matches nothing in Director — but our engine may take an integer as a
  // POSITION and delete an unrelated group from the live inventory list. The
  // list is reloaded from `GetAllItemLists` just below regardless.
  }

  for (var t_rItem of meProp(_me, "m_mp_iRef_rHerItems").toArray()) {
  callMethod("addProp", t_rItem, symbol("state"), symbol("normal"))
  }

  setMeProp(_me, "m_mp_kType_mp_iRef_rItem", callMethod("GetAllItemLists", callMethod("GetInventory", callNamed("getThread", "inventory").component, 1)));
  setMeProp(_me, "m_mp_iRef_rInvItems", callMethod("getaProp", meProp(_me, "m_mp_kType_mp_iRef_rItem"), meProp(_me, "m_kCategory")));
  setMeProp(_me, "m_bLoadingInvThumbs", 1);
  callMethod("SetBufferElement", meProp(_me, "m_rInvGridLoadAnim"), callMethod("getElement", meProp(_me, "m_rWindow"), "tra.objects"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rInvGridLoadAnim")))
  t_mp_iType_rThumb = new LingoPropList([]);
  t_iCount = callMethod("getaProp", meProp(_me, "m_mp_kType_mp_iRef_rItem"), meProp(_me, "m_kCategory")).count;
  if (lingoBinary("gt", meProp(_me, "m_iCurrentPage"), 1)) {
  if (lingoBinary("gt", lingoBinary("add", lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")), 1), t_iCount)) {
  setMeProp(_me, "m_iCurrentPage", 1);
  }

  } else {
  if (lingoBinary("lt", meProp(_me, "m_iCurrentPage"), 1)) {
  setMeProp(_me, "m_iCurrentPage", 1);
  }

  }

  var t_iFirst = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")), 1);
  var t_iLast = callNamed("min", lingoBinary("mul", meProp(_me, "m_iCurrentPage"), meProp(_me, "m_iItemsPerPage")), t_iCount);
  for (var i = t_iFirst; i <= t_iLast; ++i) {
  callMethod("addProp", t_mp_iType_rThumb, callMethod("getaProp", meProp(_me, "m_mp_kType_mp_iRef_rItem"), meProp(_me, "m_kCategory"))[i].code, undefined)
  }

  setMeProp(_me, "m_iInvGridRequest", lingoBinary("add", meProp(_me, "m_iInvGridRequest"), 1));
  callNamed("executeMessage", "GetMixedThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_RenderInvItems"), symbol("category"), meProp(_me, "m_kCategory"), symbol("request"), meProp(_me, "m_iInvGridRequest")]))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.page.number"), lingoBinary("join", lingoBinary("join", meProp(_me, "m_iCurrentPage"), "/"), callNamed("max", lingoBinary("add", lingoBinary("div", t_iCount, meProp(_me, "m_iItemsPerPage")), lingoBinary("gt", lingoBinary("mod", t_iCount, meProp(_me, "m_iItemsPerPage")), 0)), 1)))
  callMethod("checkTeleporterSelection", _this, meProp(_me, "m_rGridOwnItems"), meProp(_me, "m_mp_iRef_rOwnItems"), 0)
  callMethod("checkTeleporterSelection", _this, meProp(_me, "m_rGridHerItems"), meProp(_me, "m_mp_iRef_rHerItems"), 0)
  callMethod("checkTeleporterSelection", _this, meProp(_me, "m_rGridInvItems"), meProp(_me, "m_mp_iRef_rInvItems"), lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")))
  if (lingoBinary("and", meProp(_me, "m_bOwnConfirm"), meProp(_me, "m_bHerConfirm"))) {
  var t_ImgMine = callMethod("getProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.mystuff"), symbol("image"));
  var t_ImgHers = callMethod("getProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.herstuff"), symbol("image"));
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rObjTradConf"))) ? 0 : 1)) {
  callMethod("Define", meProp(_me, "m_rObjTradConf"), meProp(_me, "m_sPartner"))
  callMethod("Feedimages", meProp(_me, "m_rObjTradConf"), t_ImgMine, t_ImgHers)
  }

  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rObjTradConf"))) ? 0 : 1)) {
  callMethod("UpdateStates", meProp(_me, "m_rObjTradConf"), meProp(_me, "m_bOwnConfirm"), meProp(_me, "m_bHerConfirm"))
  }

}

