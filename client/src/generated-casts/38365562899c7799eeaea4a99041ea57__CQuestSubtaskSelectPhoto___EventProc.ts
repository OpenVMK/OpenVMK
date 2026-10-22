// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskSelectPhoto / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, a_kEvent: LingoValue, a_sElemID: LingoValue, a_vParam: LingoValue) {
  var tWndObj = meProp(_me, "m_rWindow");
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (a_sElemID) {
case "fto.thumbs.grid":
  var t_iCurrentID = callMethod("getClickedID", callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))).m_rThumblist, a_vParam);
  if ((lingoTruthy(callNamed("voidp", t_iCurrentID)) ? 0 : 1)) {
  setMeProp(_me, "m_iCurrentID", t_iCurrentID);
  var t_iGridIndex = callNamed("point", 0, 0);
  t_iGridIndex[1] = lingoBinary("div", a_vParam[1], lingoBinary("add", 80, 4));
  t_iGridIndex[2] = lingoBinary("div", a_vParam[2], lingoBinary("add", 53, 4));
  var t_iIndex = lingoBinary("add", t_iGridIndex[1], lingoBinary("mul", t_iGridIndex[2], 3));
  setMeProp(_me, "m_iCurrentSelection", lingoBinary("add", callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))).m_iOffset, t_iIndex));
  callMethod("reDraw", _me)
  }

  break;
case "fto.nextpage.button":
  if (lingoBinary("gt", callMethod("GetPhotos", callMethod("getComponent", callNamed("getThread", symbol("PhotoCatalog")))).count, lingoBinary("add", callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))).m_iOffset, callMethod("getMaxCount", callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))).m_rThumblist)))) {
  setThePropOf(callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))), "m_iOffset", lingoBinary("add", callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))).m_iOffset, callMethod("getMaxCount", callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))).m_rThumblist)));
  callMethod("reDraw", _me)
  }

  break;
case "fto.previouspage.button":
  if (lingoBinary("gte", callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))).m_iOffset, callMethod("getMaxCount", callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))).m_rThumblist))) {
  setThePropOf(callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))), "m_iOffset", lingoBinary("sub", callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))).m_iOffset, callMethod("getMaxCount", callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))).m_rThumblist)));
  callMethod("reDraw", _me)
  }

  break;
case "mes.accept.button":
  var t_ar_results = new LingoPropList([symbol("photoId"), meProp(_me, "m_iCurrentID")]);
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("appendSubResult", t_rManager, t_ar_results)
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  break;
case "close":
case "quest.quit":
case "mes.deny.button":
  t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("cancelSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.photo", callNamed("getText", "help.quest", "help.quest")), 1)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Subtask.SelectPhoto.event:", a_sElemID))
  break;
  break;
  }

  }

}

