-- Script
on construct me
  registerMessage("ui_AvatarBuilder", me.getID(), #ListenToSettings)
  registerMessage(#ui_camera, me.getID(), #ListenToCamera)
  registerMessage(#ui_catalog, me.getID(), #ListenToCatalog)
  registerMessage("ui_Emoticons", me.getID(), #ListenToEmoticons)
  registerMessage(#ui_help, me.getID(), #ListenToHelp)
  registerMessage("ui_Magic", me.getID(), #ListenToMagic)
  registerMessage(#ui_messenger, me.getID(), #ListenToMessenger)
  registerMessage(#ui_navigator, me.getID(), #ListenToNavigator)
  registerMessage(#ui_navigator_land, me.getID(), #ListenToNavigatorLand)
  registerMessage(#ui_navigator_guestroom, me.getID(), #ListenToNavigatorGuest)
  registerMessage(#ui_photocatalog, me.getID(), #ListenToPhotocatalog)
  registerMessage(#ui_roominfo, me.getID(), #ListenToRoomInfo)
  registerMessage(#ui_inventory, me.getID(), #ListenToInventory)
  registerMessage(#inside_shop, me.getID(), #ListenToShop)
  registerMessage("ui_avatarprofile", me.getID(), #ListenToProfileOpen)
  registerMessage("place_element_start", me.getID(), #ListenToFurniturePlace)
  registerMessage("place_poster_start", me.getID(), #ListenToPosterPlace)
  me.regMsgList(1)
  return 1
end
on deconstruct me
end
on ListenToSettings me
  if not me.getComponent().actionTaken("tutorial.settings.open") then
    me.getComponent().takeAction("tutorial.settings.open")
  end if
end
on ListenToCamera me
  if not me.getComponent().actionTaken("tutorial.camera.open") then
    me.getComponent().takeAction("tutorial.camera.open")
  end if
end
on ListenToCatalog me
  if not me.getComponent().actionTaken("tutorial.catalog.open") then
    me.getComponent().takeAction("tutorial.catalog.open")
  end if
end
on ListenToEmoticons me
  if not me.getComponent().actionTaken("tutorial.emotes.open") then
    me.getComponent().takeAction("tutorial.emotes.open")
  end if
end
on ListenToHelp me
  if not me.getComponent().actionTaken("tutorial.help.open") then
    me.getComponent().takeAction("tutorial.help.open")
  end if
end
on ListenToMagic me
  if not me.getComponent().actionTaken("tutorial.magic.open") then
    me.getComponent().takeAction("tutorial.magic.open")
  end if
end
on ListenToMessenger me
  if not me.getComponent().actionTaken("tutorial.messenger.open") then
    me.getComponent().takeAction("tutorial.messenger.open")
  end if
end
on ListenToNavigator me
  if not me.getComponent().actionTaken("tutorial.navigator.open") then
    me.getComponent().takeAction("tutorial.navigator.open")
  end if
end
on ListenToNavigatorLand me
  if not me.getComponent().actionTaken("tutorial.navigator.land") then
    me.getComponent().takeAction("tutorial.navigator.land")
  end if
end
on ListenToNavigatorGuest me
  if not me.getComponent().actionTaken("tutorial.navigator.guest") then
    me.getComponent().takeAction("tutorial.navigator.guest")
  end if
end
on ListenToPhotocatalog me
  if not me.getComponent().actionTaken("tutorial.photo.open") then
    me.getComponent().takeAction("tutorial.photo.open")
  end if
end
on ListenToMessageReceived me, tMsg
  if not me.getComponent().actionTaken("tutorial.message.receive") then
    me.getComponent().takeAction("tutorial.message.receive")
  end if
end
on ListenToFriendRequest me, tMsg
  if not me.getComponent().actionTaken("tutorial.friend.request") then
    me.getComponent().takeAction("tutorial.friend.request")
  end if
end
on ListenToRoomInfo me
  if not me.getComponent().actionTaken("tutorial.room.info") then
    me.getComponent().takeAction("tutorial.room.info")
  end if
end
on ListenToInventory me
  if not me.getComponent().actionTaken("tutorial.inventory.open") then
    me.getComponent().takeAction("tutorial.inventory.open")
  end if
end
on ListenToGuestArea me, tMsg
  if not me.getComponent().actionTaken("tutorial.area.enter") then
    me.getComponent().takeAction("tutorial.area.enter")
  end if
end
on ListenToGuestRoom me, tMsg
  if not me.getComponent().actionTaken("tutorial.room.enter") then
    me.getComponent().takeAction("tutorial.room.enter")
  end if
end
on ListenToShop me
  if not me.getComponent().actionTaken("tutorial.shop.enter") then
    me.getComponent().takeAction("tutorial.shop.enter")
  end if
end
on ListenToTradeRequest me, tMsg
  if not me.getComponent().actionTaken("tutorial.trade.request") then
    me.getComponent().takeAction("tutorial.trade.request")
  end if
end
on ListenToProfileOpen me
  if not me.getComponent().actionTaken("tutorial.profile.open") then
    me.getComponent().takeAction("tutorial.profile.open")
  end if
end
on ListenToFurniturePlace me
  if not me.getComponent().actionTaken("tutorial.furniture.place") then
    me.getComponent().takeAction("tutorial.furniture.place")
  end if
end
on ListenToPosterPlace me
  if not me.getComponent().actionTaken("tutorial.poster.place") then
    me.getComponent().takeAction("tutorial.poster.place")
  end if
end
on shortcutnavigate me
  me.getComponent().shortcutnavigate()
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2543, #ListenToMessageReceived)
  tMsgs.setaProp(2544, #ListenToFriendRequest)
  tMsgs.setaProp(2584, #ListenToGuestArea)
  tMsgs.setaProp(2587, #ListenToGuestRoom)
  tMsgs.setaProp(2594, #ListenToTradeRequest)
  tMsgs.setaProp(2020, #shortcutnavigate)
  tCmds = [:]
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end