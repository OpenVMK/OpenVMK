// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _Config

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Config(_me: LingoMe, _this: LingoValue, a_bBool: LingoValue) {
  var t_sID = callNamed("getVariable", "main.connection.id", "VMK");
  var t_rList = new LingoPropList([]);
  callMethod("setaProp", t_rList, 2590, symbol("_EnterRoom"))
  callMethod("setaProp", t_rList, 2591, symbol("_LeaveRoom"))
  callMethod("setaProp", t_rList, 2580, symbol("_CreateFloors"))
  callMethod("setaProp", t_rList, 2581, symbol("_RemoveFloor"))
  callMethod("setaProp", t_rList, 2582, symbol("_CreateAvatars"))
  callMethod("setaProp", t_rList, 2504, symbol("_ModifyAvatar"))
  callMethod("setaProp", t_rList, 2589, symbol("_RemoveAvatar"))
  callMethod("setaProp", t_rList, 2585, symbol("_LocateAvatar"))
  callMethod("setaProp", t_rList, 2586, symbol("_CreateElements"))
  callMethod("setaProp", t_rList, 2531, symbol("_RemoveElement"))
  callMethod("setaProp", t_rList, 2530, symbol("_RemovePoster"))
  callMethod("setaProp", t_rList, 2583, symbol("_StatusPulse"))
  callMethod("setaProp", t_rList, 2592, symbol("_AvatarInfo"))
  callMethod("setaProp", t_rList, 2599, symbol("_UpdateElement"))
  callMethod("setaProp", t_rList, 2588, symbol("_ElementStatus"))
  callMethod("setaProp", t_rList, 2560, symbol("_AvatarChat"))
  callMethod("setaProp", t_rList, 2598, symbol("_ElementChat"))
  callMethod("setaProp", t_rList, 2534, symbol("_FailedToPlace"))
  callMethod("setaProp", t_rList, 2506, symbol("_AvatarSlogan"))
  callMethod("setaProp", t_rList, 2042, symbol("_CancelRoomLoad"))
  callMethod("setaProp", t_rList, 2881, symbol("_ItemConfiguration"))
  callMethod("setaProp", t_rList, 2882, symbol("_CurrentItemConfiguration"))
  callMethod("setaProp", t_rList, 2883, symbol("_ItemConfigurationUsed"))
  if (a_bBool) {
  callNamed("registerListener", t_sID, callMethod("getID", _this), t_rList)
  } else {
  callNamed("unregisterListener", t_sID, callMethod("getID", _this), t_rList)
  }

  t_rList = new LingoPropList([]);
  callMethod("setaProp", t_rList, "PlaceItem", 520)
  callMethod("setaProp", t_rList, "PickItem", 521)
  callMethod("setaProp", t_rList, "RotateItem", 590)
  callMethod("setaProp", t_rList, "MoveItem", 591)
  callMethod("setaProp", t_rList, "start", 580)
  callMethod("setaProp", t_rList, "move", 581)
  callMethod("setaProp", t_rList, "chat", 585)
  callMethod("setaProp", t_rList, "say", 560)
  callMethod("setaProp", t_rList, "canned_say", 561)
  callMethod("setaProp", t_rList, "AskToBeFriend", 545)
  callMethod("setaProp", t_rList, "IgnoreUser", 592)
  callMethod("setaProp", t_rList, "PlacePoster", 531)
  callMethod("setaProp", t_rList, "MovePoster", 595)
  callMethod("setaProp", t_rList, "UseItem", 584)
  callMethod("setaProp", t_rList, "KickUser", 596)
  callMethod("setaProp", t_rList, "ConfigureItem", 810)
  callMethod("setaProp", t_rList, "UseItemConfiguration", 811)
  callMethod("setaProp", t_rList, "ChangeItemProperties", 813)
  callMethod("setaProp", t_rList, "ToggleItem", 815)
  if (a_bBool) {
  callNamed("registerCommands", t_sID, callMethod("getID", _this), t_rList)
  } else {
  callNamed("unregisterCommands", t_sID, callMethod("getID", _this), t_rList)
  }

  return 1;
}

