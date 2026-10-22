// eba88a10adbb7784498c2112110c5871.cct / CThemedGuestRoomNavigator / construct

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
  setMeProp(_me, "m_sWindowTitle", "Nav_Themed_GuestRooms");
  setMeProp(_me, "m_sWindowResource", "vmk_nav_theme_guestrooms.window");
  setMeProp(_me, "m_pItemlist", callNamed("createObject", symbol("random"), "CGuestNavItemList"));
  callMethod("SetWidth", meProp(_me, "m_pItemlist"), callNamed("getMember", "field.nav.active").image.width)
  callMethod("SetMinimumHeight", meProp(_me, "m_pItemlist"), 164)
  callMethod("render", meProp(_me, "m_pItemlist"))
  setMeProp(_me, "m_selectedRoomData", new LingoPropList([]));
  setMeProp(_me, "m_sRoomName", "");
  setMeProp(_me, "m_sRoomDesc", "");
  setMeProp(_me, "m_rRoomNameField", 0);
  setMeProp(_me, "m_rRoomDescField", 0);
  return 1;
}

