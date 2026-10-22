// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogRoomsView / ShowRooms

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowRooms(_me: LingoMe, _this: LingoValue) {
  if (callNamed("listp", meProp(_me, "m_mpRooms"))) {
  var t_RoomID = meProp(_me, "m_mpRooms")[1][meProp(_me, "m_iRoomNum")].code;
  if (callNamed("memberExists", lingoBinary("join", "rooms.bg.", t_RoomID))) {
  var t_Img = callMethod("duplicate", callNamed("getMember", lingoBinary("join", "rooms.bg.", t_RoomID)).image);
  }

  if ((lingoTruthy(callNamed("voidp", t_Img)) ? 0 : 1)) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.rooms.preview"), t_Img)
  } else {
  callNamed("put", lingoBinary("join", lingoBinary("joinPad", "Missing :", "rooms.bg."), t_RoomID))
  }

  var t_sPrice = callNamed("string", meProp(_me, "m_mpRooms")[1][meProp(_me, "m_iRoomNum")].price);
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.item.prize"), t_sPrice)
  var t_sInfoHd = callNamed("getText", lingoBinary("join", "RoomDescHd.", t_RoomID));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.room.infohd"), t_sInfoHd)
  var t_sInfoTxt = callNamed("getText", lingoBinary("join", "RoomDescTxt.", t_RoomID));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.room.info"), t_sInfoTxt)
  if (callNamed("textExists", lingoBinary("join", "roomLand.", t_RoomID))) {
  var t_sLandName = callNamed("getText", lingoBinary("join", "roomLand.", t_RoomID));
  var t_img2 = callNamed("getMember", lingoBinary("join", "logo.", t_sLandName));
  }

  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", t_Img)) ? 0 : 1), (lingoTruthy(callNamed("voidp", t_img2)) ? 0 : 1))) {
  t_Img = callMethod("duplicate", t_img2.image);
  var t_iDestW = callMethod("getProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "land.logo"), symbol("width"));
  var t_iDestH = callMethod("getProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "land.logo"), symbol("height"));
  t_img2 = callNamed("image", t_iDestW, t_iDestH, 32);
  callMethod("copyPixels", t_img2, t_Img, t_img2.rect, t_Img.rect)
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWndObj"), "land.logo"), t_img2)
  }

  }

}

