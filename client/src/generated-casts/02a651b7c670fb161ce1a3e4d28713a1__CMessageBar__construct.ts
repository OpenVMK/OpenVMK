// 02a651b7c670fb161ce1a3e4d28713a1.cct / CMessageBar / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sWndTitle", "MessageBar");
  setMeProp(_me, "m_sPhotoPopupWndTitle", "PhotoPopup");
  setMeProp(_me, "m_pCannedField", 0);
  setMeProp(_me, "m_bVisible", 0);
  callNamed("registerMessage", "SetButtonStates", callMethod("getID", _me), symbol("MessageBarStates"))
  setMeProp(_me, "m_mp_ButtonElements", new LingoPropList([symbol("Info"), "chatbar.info", symbol("navigator"), "chatbar.navigator", symbol("inventory"), "chatbar.inventory", symbol("Messenger"), "chatbar.messenger", symbol("shop"), "chatbar.shop", symbol("emoticon"), "chatbar.emoticons", symbol("magic"), "chatbar.magics", symbol("camera"), "chatbar.camera", symbol("avatar"), "chatbar.avatar", symbol("settings"), "chatbar.settings", symbol("Help"), "chatbar.help", symbol("exit"), "chatbar.exit", symbol("chat"), "chat.field", symbol("quest"), "chatbar.quest"]));
  callNamed("registerMessage", "room_tile_selection", callMethod("getID", _me), symbol("ClosePhotoPopup"))
  callNamed("registerMessage", symbol("hide_camera"), callMethod("getID", _me), symbol("ClosePhotoPopup"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("ClosePhotoPopup"))
  return 1;
}

