// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogInterface / eventProcPhotoCatalog

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcPhotoCatalog(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.camera")
  break;
  }

  switch (meProp(_me, "m_view")) {
case symbol("thumbs"):
  switch (tElemID) {
case "fto.thumbs.grid":
  setMeProp(_me, "m_iCurrentID", callMethod("getClickedID", meProp(_me, "m_rThumblist"), tParm));
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_iCurrentID"))) ? 0 : 1)) {
  callMethod("changeView", _me, symbol("Full"))
  }

  break;
case "fto.nextpage.button":
  if (lingoBinary("gt", callMethod("GetPhotos", callMethod("getComponent", _me)).count, lingoBinary("add", meProp(_me, "m_iOffset"), callMethod("getMaxCount", meProp(_me, "m_rThumblist"))))) {
  setMeProp(_me, "m_iOffset", lingoBinary("add", meProp(_me, "m_iOffset"), callMethod("getMaxCount", meProp(_me, "m_rThumblist"))));
  callMethod("reDraw", _me)
  }

  break;
case "fto.previouspage.button":
  if (lingoBinary("gte", meProp(_me, "m_iOffset"), callMethod("getMaxCount", meProp(_me, "m_rThumblist")))) {
  setMeProp(_me, "m_iOffset", lingoBinary("sub", meProp(_me, "m_iOffset"), callMethod("getMaxCount", meProp(_me, "m_rThumblist"))));
  callMethod("reDraw", _me)
  }

  break;
case "close":
  callMethod("showHidePhotoCatalog", _me, 0)
  break;
  }

  break;
case symbol("Full"):
  var tWnd = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  switch (tElemID) {
case "fto.save.button":
  setMeProp(_me, "m_mp_lastCaption", callNamed("TransformCannedToMsg", callNamed("ParseCannedField", callMethod("getElement", tWnd, "camera.caption.input")), 1));
  callMethod("ChangeCaption", callMethod("getComponent", _me), meProp(_me, "m_iCurrentID"), meProp(_me, "m_mp_lastCaption"))
  callMethod("ForcePhotoCaption", callMethod("getComponent", _me), meProp(_me, "m_iCurrentID"), callMethod("getText", callMethod("getElement", tWnd, "camera.caption.input")))
  setMeProp(_me, "m_bCaptionEdited", 0);
  callMethod("reDraw", _me)
  break;
case "fto.publishtoalbum.button":
  if ((lingoTruthy(callMethod("IsAlbumFull", callMethod("getComponent", _me))) ? 0 : 1)) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "PublishDialog", 2, 1);
  callMethod("show", t)
  callMethod("setText", t, callNamed("getText", "photocatalog_confirm_publish"), callNamed("getText", "photocatalog_confirm"), "NO", "YES")
  } else {
  t = callNamed("createDialogWindow", callMethod("getID", _me), "ErrorDialog", 1, 0);
  callMethod("show", t)
  callMethod("setText", t, callNamed("getText", "photocatalog_album_size_exceeded"), callNamed("getText", "album_full"), "OK")
  }

  callMethod("TestAlbumState", callMethod("getHandler", _me))
  break;
case "fto.placeonwall.button":
  callNamed("registerMessage", "place_poster_end", callMethod("getID", _me), symbol("placePosterEnd"))
  callNamed("executeMessage", "place_poster_start", 3008)
  callMethod("hide", tWnd)
  break;
case "fto.delete.button":
  t = callNamed("createDialogWindow", callMethod("getID", _me), "DeleteDialog", 2, 1);
  callMethod("show", t)
  callMethod("setText", t, callNamed("getText", "photocatalog_confirm_delete"), callNamed("getText", "photocatalog_confirm"), "NO", "YES")
  break;
case "fto.viewall.button":
  callMethod("changeView", _me, symbol("thumbs"))
  break;
case "camera.caption.input":
  setMeProp(_me, "m_bCaptionEdited", 1);
  break;
case "fto.nextpage.button":
  if (lingoBinary("eq", meProp(_me, "m_iCurrentID"), callMethod("getLastID", meProp(_me, "m_rThumblist")))) {
  if (lingoBinary("gt", callMethod("GetPhotos", callMethod("getComponent", _me)).count, lingoBinary("add", meProp(_me, "m_iOffset"), callMethod("getMaxCount", meProp(_me, "m_rThumblist"))))) {
  setMeProp(_me, "m_iOffset", lingoBinary("add", meProp(_me, "m_iOffset"), callMethod("getMaxCount", meProp(_me, "m_rThumblist"))));
  callMethod("readthumbs", _me)
  setMeProp(_me, "m_iCurrentID", callMethod("getFirstID", meProp(_me, "m_rThumblist")));
  }

  } else {
  setMeProp(_me, "m_iCurrentID", callMethod("getNextID", meProp(_me, "m_rThumblist"), meProp(_me, "m_iCurrentID")));
  }

  callMethod("changeView", _me, symbol("Full"))
  break;
case "fto.previouspage.button":
  if (lingoBinary("eq", meProp(_me, "m_iCurrentID"), callMethod("getFirstID", meProp(_me, "m_rThumblist")))) {
  if (lingoBinary("gte", meProp(_me, "m_iOffset"), callMethod("getMaxCount", meProp(_me, "m_rThumblist")))) {
  setMeProp(_me, "m_iOffset", lingoBinary("sub", meProp(_me, "m_iOffset"), callMethod("getMaxCount", meProp(_me, "m_rThumblist"))));
  callMethod("readthumbs", _me)
  setMeProp(_me, "m_iCurrentID", callMethod("getLastID", meProp(_me, "m_rThumblist")));
  }

  } else {
  setMeProp(_me, "m_iCurrentID", callMethod("getPrevID", meProp(_me, "m_rThumblist"), meProp(_me, "m_iCurrentID")));
  }

  callMethod("changeView", _me, symbol("Full"))
  break;
case "close":
  callMethod("showHidePhotoCatalog", _me, 0)
  break;
  }

  break;
  }

  } else {
  if (lingoBinary("eq", tEvent, symbol("keyDown"))) {
  var t_iKeyCode = theProperty("keyCode");
  if (lingoBinary("neq", meProp(_me, "m_pCannedField"), 0)) {
  switch (t_iKeyCode) {
case 36:
case 49:
  var tElem = callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sWindowTitle")), tElemID);
  var tSelection = tElem.pMember.selection;
  var tCharcount = tElem.pMember.text.char.count;
  if (lingoBinary("gt", tCharcount, 0)) {
  if (lingoBinary("eq", tElem.pMember.text.char[tSelection[2]], " ")) {
  return 1;
  }

  if (lingoBinary("lte", lingoBinary("add", tSelection[2], 1), tCharcount)) {
  if (lingoBinary("eq", tElem.pMember.text.char[lingoBinary("add", tSelection[2], 1)], " ")) {
  return 1;
  }

  }

  }

  var t_pass = callMethod("CheckContent", meProp(_me, "m_pCannedField"));
  if (t_pass) {
  callMethod("updateContent", meProp(_me, "m_pCannedField"))
  }

  callNamed("pass")
  break;
  default:
  callMethod("updateContent", meProp(_me, "m_pCannedField"))
  callNamed("pass")
  break;
  }

  }

  } else {
  if (lingoBinary("eq", tEvent, symbol("keyUp"))) {
  t_iKeyCode = theProperty("keyCode");
  if (lingoBinary("neq", meProp(_me, "m_pCannedField"), 0)) {
  switch (t_iKeyCode) {
case 36:
case 49:
  break;
  default:
  callMethod("CheckWord", meProp(_me, "m_pCannedField"))
  break;
  }

  }

  }

  }

  }

}

