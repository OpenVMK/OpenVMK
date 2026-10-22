// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_components", new LingoPropList([]));
  setMeProp(_me, "m_sWindowTitle", "Nav_GuestRooms");
  setMeProp(_me, "m_sWindowResource", "vmk_nav_guestrooms.window");
  setMeProp(_me, "m_page", symbol("popular"));
  setMeProp(_me, "m_pItemlist", callNamed("createObject", symbol("random"), "CGuestNavItemList"));
  callMethod("SetWidth", meProp(_me, "m_pItemlist"), callNamed("getMember", "field.nav.active").image.width)
  callMethod("SetMinimumHeight", meProp(_me, "m_pItemlist"), 164)
  callMethod("render", meProp(_me, "m_pItemlist"))
  setMeProp(_me, "m_selectedRoomData", new LingoPropList([]));
  setMeProp(_me, "m_sRoomName", "");
  setMeProp(_me, "m_sRoomDesc", "");
  setMeProp(_me, "m_rRoomNameField", 0);
  setMeProp(_me, "m_rRoomDescField", 0);
  setMeProp(_me, "m_sSearchString", undefined);
  var tWidth = lingoBinary("add", lingoBinary("add", callNamed("getMember", "icon.fastpass").width, 2), callNamed("getMember", "eventroom_icon").width);
  var tHeight = callNamed("max", callNamed("getMember", "icon.fastpass").height, callNamed("getMember", "eventroom_icon").height);
  setMeProp(_me, "m_sIconMickeyAndTicket", "tempicon.mickeyandticket");
  if (callNamed("createMember", meProp(_me, "m_sIconMickeyAndTicket"), symbol("bitmap"))) {
  var tImage = callNamed("image", tWidth, tHeight, 32);
  setThePropOf(tImage, "useAlpha", 1);
  var tSrc = callNamed("getMember", "eventroom_icon").image;
  var tYOffs = lingoBinary("div", lingoBinary("sub", tHeight, tSrc.height), 2);
  var tdestrect = callNamed("rect", 0, tYOffs, tSrc.width, lingoBinary("add", tYOffs, tSrc.height));
  callNamed("ReallyCopyPixels", tImage, tSrc, tdestrect, tSrc.rect)
  tSrc = callNamed("getMember", "icon.fastpass").image;
  tYOffs = lingoBinary("div", lingoBinary("sub", tHeight, tSrc.height), 2);
  var tXOffs = lingoBinary("sub", tWidth, tSrc.width);
  tdestrect = callNamed("rect", tXOffs, tYOffs, tWidth, lingoBinary("add", tYOffs, tSrc.height));
  callNamed("ReallyCopyPixels", tImage, tSrc, tdestrect, tSrc.rect)
  setThePropOf(callNamed("getMember", meProp(_me, "m_sIconMickeyAndTicket")), "image", tImage);
  }

  return 1;
}

