// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialHandler / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", "ui_AvatarBuilder", callMethod("getID", _me), symbol("ListenToSettings"))
  callNamed("registerMessage", symbol("ui_camera"), callMethod("getID", _me), symbol("ListenToCamera"))
  callNamed("registerMessage", symbol("ui_catalog"), callMethod("getID", _me), symbol("ListenToCatalog"))
  callNamed("registerMessage", "ui_Emoticons", callMethod("getID", _me), symbol("ListenToEmoticons"))
  callNamed("registerMessage", symbol("ui_help"), callMethod("getID", _me), symbol("ListenToHelp"))
  callNamed("registerMessage", "ui_Magic", callMethod("getID", _me), symbol("ListenToMagic"))
  callNamed("registerMessage", symbol("ui_messenger"), callMethod("getID", _me), symbol("ListenToMessenger"))
  callNamed("registerMessage", symbol("ui_navigator"), callMethod("getID", _me), symbol("ListenToNavigator"))
  callNamed("registerMessage", symbol("ui_navigator_land"), callMethod("getID", _me), symbol("ListenToNavigatorLand"))
  callNamed("registerMessage", symbol("ui_navigator_guestroom"), callMethod("getID", _me), symbol("ListenToNavigatorGuest"))
  callNamed("registerMessage", symbol("ui_photocatalog"), callMethod("getID", _me), symbol("ListenToPhotocatalog"))
  callNamed("registerMessage", symbol("ui_roominfo"), callMethod("getID", _me), symbol("ListenToRoomInfo"))
  callNamed("registerMessage", symbol("ui_inventory"), callMethod("getID", _me), symbol("ListenToInventory"))
  callNamed("registerMessage", symbol("inside_shop"), callMethod("getID", _me), symbol("ListenToShop"))
  callNamed("registerMessage", "ui_avatarprofile", callMethod("getID", _me), symbol("ListenToProfileOpen"))
  callNamed("registerMessage", "place_element_start", callMethod("getID", _me), symbol("ListenToFurniturePlace"))
  callNamed("registerMessage", "place_poster_start", callMethod("getID", _me), symbol("ListenToPosterPlace"))
  callMethod("regMsgList", _me, 1)
  return 1;
}

