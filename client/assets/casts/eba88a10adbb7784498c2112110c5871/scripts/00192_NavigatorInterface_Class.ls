-- Script
property m_windowTitle
property m_sWindowID
property m_merged
property m_page
property m_activeRoomID
property m_pGuestRoomNavigator
property m_pThemedGuestRoomNavigator
property m_pAdvancedNavItemList
property m_sAdvancedModeWindowTitle
property m_mp_advancedModeInstanceInfo
property m_mp_advancedSelectedData
property m_ar_instanceTitles
property m_ar_MinigameNavNodes
property m_objSnd
property m_bSoundPlayed
property m_rRoomQueueWindow
property m_mp_ar_sHighlighters

on construct me
  registerMessage(#Initialize, me.getID(), #AllCastsDone)
  registerMessage(#LandingOnRoom, me.getID(), #DisableWelcomesound)
  registerMessage(#ui_StopWelcomeSound, me.getID(), #StopWelcomeSnd)
  m_ar_MinigameNavNodes = VOID
  m_ar_instanceTitles = ["North", "East", "South", "West", "North-East", "South-East", "South-West", "North-West", "North-North-East", "North-East-East", "North-East-North", "South-East-East", "South-South-East", "South-East-South", "South-South-West", "South-West-West", "South-West-South", "North-West-West", "North-North-West", "North-West-North", "North-North-North-East", "North-North-East-East", "North-North-East-North", "North-South-East-East", "North-South-South-East", "North-South-East-South", "North-South-South-West", "North-South-West-West", "North-South-West-South", "North-North-West-West", "North-North-North-West", "North-North-West-North", "South-North-North-East", "South-North-East-East", "South-North-East-North", "South-South-East-East", "South-South-South-East", "South-South-East-South", "South-South-South-West", "South-South-West-West", "South-South-West-South", "South-North-West-West", "South-North-North-West", "South-North-West-North"]
  t_ar_instanceTitles2 = []
  t_ar_DirList = [VOID, "North-", "East-", "South-", "West-"]
  repeat with e = 1 to 5
    repeat with i = 1 to m_ar_instanceTitles.count
      t_sTitle = t_ar_DirList[e] & m_ar_instanceTitles[i]
      t_ar_instanceTitles2.add(t_sTitle)
    end repeat
  end repeat
  m_ar_instanceTitles = t_ar_instanceTitles2
  m_mp_ar_sHighlighters = [:]
  m_mp_ar_sHighlighters.setaProp(#parkmap, ["nav.frontierland.active", "nav.guestrooms.active", "nav.fantasyland.active", "nav.adventureland.active", "nav.mainstreet.active", "nav.tomorrowland.active", "nav.neworleans.active"])
  m_mp_ar_sHighlighters.setaProp(#whatsnew, ["nav.frontierland.active", "nav.guestrooms.active", "nav.fantasyland.active", "nav.adventureland.active", "nav.mainstreet.active", "nav.tomorrowland.active", "nav.neworleans.active"])
  m_mp_ar_sHighlighters.setaProp(#adventureland, ["nav.shrunkennedsshop.active", "nav.tiki.active", "nav.bazaar.active", "nav.treehouse.active", "nav.cambodian.active", "nav.safari.active", "nav.tent.active", "nav.indy.active", "nav.piratesgame.active", "nav.dock.active"])
  m_mp_ar_sHighlighters.setaProp(#frontierland, ["nav.splashmountain.active", "nav.tomsawyer.active", "nav.thundermountain.active", "nav.steamboat.active", "nav.pier.active", "nav.goldenhorseshoe.active", "nav.frontierland_hub.active"])
  m_mp_ar_sHighlighters.setaProp(#fantasyland, ["nav.fireworks.active", "nav.castlebanquet.active", "nav.snowwhite.active", "nav.matterhorn.active", "nav.castleentrance.active", "nav.castlespellroom.active", "nav.smallworld.active", "nav.inthesky.active", "nav.castlemoneyshot.active", "nav.castledungeon.active", "nav.storybookland.active", "nav.fantasycourtyard.active"])
  m_mp_ar_sHighlighters.setaProp(#tomorrowland, ["nav.qalaxyimports.active", "nav.tomorrowlandhub.active", "nav.autopia.active", "nav.mars.active", "nav.speedway.active", "nav.shipwreck.active", "nav.nautilus.active", "nav.nautilusgrotto.active", "nav.spacemountain.active", "nav.shrinkingmachine.active"])
  m_mp_ar_sHighlighters.setaProp(#mainstreet, ["nav.castlecourtyard.active", "nav.hub2.active", "nav.vmkcentral.active", "nav.musicjam.active", "nav.musicalmainstreet.active", "nav.emporium.active", "nav.mainstreetsquare.active", "nav.esplanade.active", "nav.buenavista.active", "nav.pennyarcade.active", "nav.magicshopcheckers.active"])
  m_mp_ar_sHighlighters.setaProp(#neworleans, ["nav.gallery.active", "nav.neworleanssquare.active", "nav.bluebayou.active", "nav.hauntedmansion.active"])
  m_windowTitle = "Navigator Window"
  m_sWindowID = "vmk_nav.window"
  m_sAdvancedModeWindowTitle = "Navigator Advanced Mode Window"
  m_mp_advancedModeInstanceInfo = [:]
  m_mp_advancedSelectedData = [:]
  m_page = #whatsnew
  m_activeRoomID = VOID
  m_pGuestRoomNavigator = VOID
  m_pThemedGuestRoomNavigator = VOID
  getObject(#session).set("AdvNavigation", 0)
  m_objSnd = VOID
  m_bSoundPlayed = 0
end
on deconstruct me
  tObject = getObject("Navigation.Room.Queue")
  if tObject <> 0 then
    removeObject(tObject.getID())
  end if
  unregisterMessage(#LandingOnRoom)
  if objectp(m_pAdvancedNavItemList) then
    removeObject(m_pAdvancedNavItemList.getID())
  end if
end
on AllCastsDone this
  m_pAdvancedNavItemList = createObject(#random, "CAdvancedNavItemList")
  m_rRoomQueueWindow = createObject("Navigation.Room.Queue", "CNavigatorQueueInterface")
end
on DisableWelcomesound this
  m_bSoundPlayed = 1
end
on ShowNavigator this
  if not windowExists(m_windowTitle) then
    this.showhidenavigator()
  end if
end
on HideNavigator this
  if windowExists(m_windowTitle) then
    m_bSoundPlayed = 1
    this.showhidenavigator()
  end if
end
on getRoomQueueWindow me
  return m_rRoomQueueWindow
end
on SetRoomQueueWindow me, t_rRoomQueueWindow
  m_rRoomQueueWindow = t_rRoomQueueWindow
end
on showhidenavigator me
  if windowExists(m_windowTitle) then
    tWndObj = getWindow(m_windowTitle)
    if tWndObj.getProperty(#visible) then
      removeWindow(tWndObj.getID())
      executeMessage("SetButtonStates", [#all: 1])
      if windowExists(m_sAdvancedModeWindowTitle) then
        removeWindow(m_sAdvancedModeWindowTitle)
      end if
    end if
  else
    if not createWindow(m_windowTitle, m_sWindowID) then
      return error(me, "Failed to create navigator window", #showhidenavigator)
    end if
    m_merged = 0
    tWndObj = getWindow(m_windowTitle)
    tWndObj.registerClient(me.getID())
    tWndObj.registerProcedure(#eventProcNavigator, me.getID(), #mouseUp)
    tWndObj.registerProcedure(#eventProcNavigator, me.getID(), #mouseEnter)
    tWndObj.registerProcedure(#eventProcNavigator, me.getID(), #mouseLeave)
    tWndObj.moveTo(0, 0)
    executeMessage("SetButtonStates", [#all: 0])
    executeMessage("SetButtonStates", [#Messenger: 1, #navigator: 1, #settings: 1, #Help: 1, #exit: 1])
    t_objRoom = getThread(#room).component._AccessRoom()
    if objectp(t_objRoom) then
      tWndObj.getElement("close").setProperty(#visible, 1)
      tWndObj.getElement("help").setProperty(#visible, 1)
    else
      executeMessage("SetButtonStates", [#navigator: 0])
      tWndObj.getElement("close").setProperty(#visible, 0)
      tWndObj.getElement("help").setProperty(#visible, 0)
    end if
    t_bMusic = getObject(#session).get("music")
    if not m_bSoundPlayed and t_bMusic then
      m_objSnd = createObject(#temp, "CSoundObject")
      m_objSnd.Define("vmk-map-5")
      m_objSnd.SetSoundType("ui")
      m_objSnd.PlaySound()
      m_bSoundPlayed = 1
    end if
    getConnection(getVariable("main.connection.id", "VMK")).send(25)
    executeMessage("PlayInterfaceSound", "open-map")
    me.getComponent().RequestNavigationNodes(m_page)
    me.RefreshContent()
    me.SetTabs()
    executeMessage(#ui_Fastpass)
    if getObject(#session).get("AdvNavigation") then
      if me.getAdvancedModeWindow() = 0 then
        createWindow(m_sAdvancedModeWindowTitle, "vmk_nav_advanced.window")
        tWndObj = getWindow(m_sAdvancedModeWindowTitle)
        tWndObj.registerClient(me.getID())
        tWndObj.registerProcedure(#eventProcAdvNavigator, me.getID(), #mouseUp)
        tWndObj.moveTo(550, 50)
        tWndObj.hide()
      else
        me.getAdvancedModeWindow().show()
      end if
      if getWindow(m_windowTitle).getElement("nav.advancedmode.off") <> 0 then
        getWindow(m_windowTitle).getElement("nav.advancedmode.off").feedImage(getMember("button.checkbox.1").image)
      end if
    else
      if getWindow(m_windowTitle).getElement("nav.advancedmode.off") <> 0 then
        getWindow(m_windowTitle).getElement("nav.advancedmode.off").feedImage(getMember("button.checkbox.0").image)
      end if
    end if
  end if
end
on ChangePage me, a_newPage
  m_page = a_newPage
  me.getComponent().RequestNavigationNodes(m_page)
  me.RefreshContent()
  me.SetTabs()
  executeMessage("PlayInterfaceSound", "map-tab-change")
  executeMessage(#ui_Fastpass)
  updateStage()
end
on ToggleAdvancedMode me
  t_advancedMode = not getObject(#session).get("AdvNavigation")
  getObject(#session).set("AdvNavigation", t_advancedMode)
  if getWindow(m_windowTitle).getElement("nav.advancedmode.off") <> 0 then
    if t_advancedMode then
      getWindow(m_windowTitle).getElement("nav.advancedmode.off").feedImage(getMember("button.checkbox.1").image)
    else
      getWindow(m_windowTitle).getElement("nav.advancedmode.off").feedImage(getMember("button.checkbox.0").image)
      if windowExists(m_sAdvancedModeWindowTitle) then
        tWndObj = getWindow(m_sAdvancedModeWindowTitle)
        tWndObj.hide()
      end if
    end if
  end if
end
on ShowAdvancedModeWindow me
  executeMessage("PlayInterfaceSound", "map-tab-change")
  executeMessage(#ui_Fastpass)
  if windowExists(m_sAdvancedModeWindowTitle) then
    tWndObj = getWindow(m_sAdvancedModeWindowTitle)
    tWndObj.show()
    tWidth = tWndObj.getProperty(#width)
    tHeight = tWndObj.getProperty(#height)
    tWindowPos = the mouseLoc - point(tWidth / 2, tHeight / 2)
    if tWindowPos.locH < 0 then
      tWindowPos.locH = 0
    end if
    if tWindowPos.locV < 0 then
      tWindowPos.locV = 0
    end if
    if tWindowPos.locH > (the stage).image.width - tWidth then
      tWindowPos.locH = (the stage).image.width - tWidth
    end if
    if tWindowPos.locV > (the stage).image.height - tHeight then
      tWindowPos.locV = (the stage).image.height - tHeight
    end if
    activateWindow(tWndObj.getID())
    tWndObj.moveTo(tWindowPos.locH, tWindowPos.locV)
  else
    createWindow(m_sAdvancedModeWindowTitle, "vmk_nav_advanced.window")
    tWndObj = getWindow(m_sAdvancedModeWindowTitle)
    tWndObj.registerClient(me.getID())
    tWndObj.registerProcedure(#eventProcAdvNavigator, me.getID(), #mouseUp)
    tWidth = tWndObj.getProperty(#width)
    tHeight = tWndObj.getProperty(#height)
    tWindowPos = the mouseLoc - point(tWidth / 2, tHeight / 2)
    if tWindowPos.locH < 0 then
      tWindowPos.locH = 0
    end if
    if tWindowPos.locV < 0 then
      tWindowPos.locV = 0
    end if
    if tWindowPos.locH > (the stage).image.width - tWidth then
      tWindowPos.locH = (the stage).image.width - tWidth
    end if
    if tWindowPos.locV > (the stage).image.height - tHeight then
      tWindowPos.locV = (the stage).image.height - tHeight
    end if
    tWndObj.moveTo(tWindowPos.locH, tWindowPos.locV)
  end if
end
on RefreshContent me
  tWndObj = getWindow(m_windowTitle)
  if m_merged then
    tWndObj.unmerge()
  end if
  m_merged = 0
  case m_page of
    #parkmap, #whatsnew:
      tWndObj.merge("vmk_nav_parkmap.window")
      m_merged = 1
    #adventureland:
      tWndObj.merge("vmk_nav_adventureland.window")
      m_merged = 1
    #frontierland:
      tWndObj.merge("vmk_nav_frontierland.window")
      m_merged = 1
    #fantasyland:
      tWndObj.merge("vmk_nav_fantasyland.window")
      m_merged = 1
    #tomorrowland:
      tWndObj.merge("vmk_nav_tomorrowland.window")
      m_merged = 1
    #mainstreet:
      tWndObj.merge("vmk_nav_mainstreet.window")
      m_merged = 1
    #neworleans:
      tWndObj.merge("vmk_nav_neworleans.window")
      m_merged = 1

  end case
  if getWindow(m_windowTitle).getElement("nav.advancedmode.off") <> 0 then
    if getObject(#session).get("AdvNavigation") then
      getWindow(m_windowTitle).getElement("nav.advancedmode.off").feedImage(getMember("button.checkbox.1").image)
    else
      getWindow(m_windowTitle).getElement("nav.advancedmode.off").feedImage(getMember("button.checkbox.0").image)
    end if
  end if
  repeat with tElemName in m_mp_ar_sHighlighters.getaProp(m_page)
    if objectp(tWndObj.getElement(tElemName)) then
      tWndObj.getElement(tElemName).hide()
    end if
  end repeat
end
on SetTabs me
  tWndObj = getWindow(m_windowTitle)
  case m_page of
    #parkmap, #whatsnew:
      tWndObj.getElement("nav.tab.parkmap.active").show()
      tWndObj.getElement("nav.tab.adventureland.active").hide()
      tWndObj.getElement("nav.tab.frontierland.active").hide()
      tWndObj.getElement("nav.tab.fantasyland.active").hide()
      tWndObj.getElement("nav.tab.tomorrowland.active").hide()
      tWndObj.getElement("nav.tab.mainstreet.active").hide()
      tWndObj.getElement("nav.tab.neworleans.active").hide()
    #adventureland:
      tWndObj.getElement("nav.tab.parkmap.active").hide()
      tWndObj.getElement("nav.tab.adventureland.active").show()
      tWndObj.getElement("nav.tab.frontierland.active").hide()
      tWndObj.getElement("nav.tab.fantasyland.active").hide()
      tWndObj.getElement("nav.tab.tomorrowland.active").hide()
      tWndObj.getElement("nav.tab.mainstreet.active").hide()
      tWndObj.getElement("nav.tab.neworleans.active").hide()
    #frontierland:
      tWndObj.getElement("nav.tab.parkmap.active").hide()
      tWndObj.getElement("nav.tab.adventureland.active").hide()
      tWndObj.getElement("nav.tab.frontierland.active").show()
      tWndObj.getElement("nav.tab.fantasyland.active").hide()
      tWndObj.getElement("nav.tab.tomorrowland.active").hide()
      tWndObj.getElement("nav.tab.mainstreet.active").hide()
      tWndObj.getElement("nav.tab.neworleans.active").hide()
    #fantasyland:
      tWndObj.getElement("nav.tab.parkmap.active").hide()
      tWndObj.getElement("nav.tab.adventureland.active").hide()
      tWndObj.getElement("nav.tab.frontierland.active").hide()
      tWndObj.getElement("nav.tab.fantasyland.active").show()
      tWndObj.getElement("nav.tab.tomorrowland.active").hide()
      tWndObj.getElement("nav.tab.mainstreet.active").hide()
      tWndObj.getElement("nav.tab.neworleans.active").hide()
    #tomorrowland:
      tWndObj.getElement("nav.tab.parkmap.active").hide()
      tWndObj.getElement("nav.tab.adventureland.active").hide()
      tWndObj.getElement("nav.tab.frontierland.active").hide()
      tWndObj.getElement("nav.tab.fantasyland.active").hide()
      tWndObj.getElement("nav.tab.tomorrowland.active").show()
      tWndObj.getElement("nav.tab.mainstreet.active").hide()
      tWndObj.getElement("nav.tab.neworleans.active").hide()
    #mainstreet:
      tWndObj.getElement("nav.tab.parkmap.active").hide()
      tWndObj.getElement("nav.tab.adventureland.active").hide()
      tWndObj.getElement("nav.tab.frontierland.active").hide()
      tWndObj.getElement("nav.tab.fantasyland.active").hide()
      tWndObj.getElement("nav.tab.tomorrowland.active").hide()
      tWndObj.getElement("nav.tab.mainstreet.active").show()
      tWndObj.getElement("nav.tab.neworleans.active").hide()
    #neworleans:
      tWndObj.getElement("nav.tab.parkmap.active").hide()
      tWndObj.getElement("nav.tab.adventureland.active").hide()
      tWndObj.getElement("nav.tab.frontierland.active").hide()
      tWndObj.getElement("nav.tab.fantasyland.active").hide()
      tWndObj.getElement("nav.tab.tomorrowland.active").hide()
      tWndObj.getElement("nav.tab.mainstreet.active").hide()
      tWndObj.getElement("nav.tab.neworleans.active").show()

  end case
end
on AdventureLandClick me, a_elemID
  case a_elemID of
    "nav.tab.parkmap.passive":
      me.ChangePage(#whatsnew)
    "nav.tab.frontierland.passive":
      me.ChangePage(#frontierland)
    "nav.tab.fantasyland.passive":
      me.ChangePage(#fantasyland)
    "nav.tab.tomorrowland.passive":
      me.ChangePage(#tomorrowland)
    "nav.tab.mainstreet.passive":
      me.ChangePage(#mainstreet)
    "nav.tab.neworleans.passive":
      me.ChangePage(#neworleans)
    "nav.piratesgame", "nav.piratesgame.active":
      me.startMiniGame(#pirates)
    "nav.shrunkennedsshop", "nav.shrunkennedsshop.active":
      me.getComponent().NavigateToRoom(16)
    "nav.bazaar", "nav.bazaar.active":
      me.getComponent().NavigateToRoom(5)
    "nav.treehouse", "nav.treehouse.active":
      me.getComponent().NavigateToRoom(36)
    "nav.tiki", "nav.tiki.active":
      me.getComponent().NavigateToRoom(7)
    "nav.cambodian", "nav.cambodian.active":
      me.getComponent().NavigateToRoom(6)
    "nav.dock", "nav.dock.active":
      me.getComponent().NavigateToRoom(11)
    "nav.indy", "nav.indy.active":
      me.getComponent().NavigateToRoom(8)
    "nav.tent", "nav.tent.active":
      me.getComponent().NavigateToRoom(9)
    "nav.safari", "nav.safari.active":
      me.getComponent().NavigateToRoom(10)
    "nav.advancedmode.off":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)
    "nav.advancedmode.on":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)
    "nav.advancedmode.hd":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)

  end case
end
on FrontierLandClick me, a_elemID
  case a_elemID of
    "nav.tab.parkmap.passive":
      me.ChangePage(#whatsnew)
    "nav.tab.adventureland.passive":
      me.ChangePage(#adventureland)
    "nav.tab.fantasyland.passive":
      me.ChangePage(#fantasyland)
    "nav.tab.tomorrowland.passive":
      me.ChangePage(#tomorrowland)
    "nav.tab.mainstreet.passive":
      me.ChangePage(#mainstreet)
    "nav.tab.neworleans.passive":
      me.ChangePage(#neworleans)
    "nav.splashmountain", "nav.splashmountain.active":
      me.getComponent().NavigateToRoom(49)
    "nav.tomsawyer", "nav.tomsawyer.active":
      me.getComponent().NavigateToRoom(64)
    "nav.thundermountain", "nav.thundermountain.active":
      me.getComponent().NavigateToRoom(61)
    "nav.steamboat", "nav.steamboat.active":
      me.getComponent().NavigateToRoom(57)
    "nav.pier", "nav.pier.active":
      me.getComponent().NavigateToRoom(59)
    "nav.goldenhorseshoe", "nav.goldenhorseshoe.active":
      me.getComponent().NavigateToRoom(44)
    "nav.frontierland_hub", "nav.frontierland_hub.active":
      me.getComponent().NavigateToRoom(58)
    "nav.advancedmode.off":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)
    "nav.advancedmode.on":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)
    "nav.advancedmode.hd":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)

  end case
end
on FantasyLandClick me, a_elemID
  case a_elemID of
    "nav.tab.parkmap.passive":
      me.ChangePage(#whatsnew)
    "nav.tab.adventureland.passive":
      me.ChangePage(#adventureland)
    "nav.tab.frontierland.passive":
      me.ChangePage(#frontierland)
    "nav.tab.tomorrowland.passive":
      me.ChangePage(#tomorrowland)
    "nav.tab.mainstreet.passive":
      me.ChangePage(#mainstreet)
    "nav.tab.neworleans.passive":
      me.ChangePage(#neworleans)
    "nav.fireworks", "nav.fireworks.active":
      me.startMiniGame(#fireworks)
    "nav.castlebanquet", "nav.castlebanquet.active":
      me.getComponent().NavigateToRoom(34)
    "nav.snowwhite", "nav.snowwhite.active":
      me.getComponent().NavigateToRoom(37)
    "nav.matterhorn", "nav.matterhorn.active":
      me.getComponent().NavigateToRoom(33)
    "nav.castleentrance", "nav.castleentrance.active":
      me.getComponent().NavigateToRoom(31)
    "nav.smallworld", "nav.smallworld.active":
      me.getComponent().NavigateToRoom(38)
    "nav.inthesky", "nav.inthesky.active":
      me.getComponent().NavigateToRoom(39)
    "nav.castlemoneyshot", "nav.castlemoneyshot.active":
      me.getComponent().NavigateToRoom(30)
    "nav.castledungeon", "nav.castledungeon.active":
      me.getComponent().NavigateToRoom(13)
    "nav.storybookland", "nav.storybookland.active":
      me.getComponent().NavigateToRoom(40)
    "nav.fantasycourtyard", "nav.fantasycourtyard.active":
      me.getComponent().NavigateToRoom(99)
    "nav.advancedmode.off":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)
    "nav.advancedmode.on":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)
    "nav.advancedmode.hd":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)

  end case
end
on TomorrowLandClick me, a_elemID
  case a_elemID of
    "nav.tab.parkmap.passive":
      me.ChangePage(#whatsnew)
    "nav.tab.adventureland.passive":
      me.ChangePage(#adventureland)
    "nav.tab.frontierland.passive":
      me.ChangePage(#frontierland)
    "nav.tab.fantasyland.passive":
      me.ChangePage(#fantasyland)
    "nav.tab.mainstreet.passive":
      me.ChangePage(#mainstreet)
    "nav.tab.neworleans.passive":
      me.ChangePage(#neworleans)
    "nav.qalaxyimports", "nav.qalaxyimports.active":
      me.getComponent().NavigateToRoom(45)
    "nav.tomorrowlandhub", "nav.tomorrowlandhub.active":
      me.getComponent().NavigateToRoom(47)
    "nav.autopia", "nav.autopia.active":
      me.getComponent().NavigateToRoom(77)
    "nav.mars", "nav.mars.active":
      me.getComponent().NavigateToRoom(75)
    "nav.speedway", "nav.speedway.active":
      me.getComponent().NavigateToRoom(74)
    "nav.shipwreck", "nav.shipwreck.active":
      me.getComponent().NavigateToRoom(78)
    "nav.nautilus", "nav.nautilus.active":
      me.getComponent().NavigateToRoom(76)
    "nav.nautilusgrotto", "nav.nautilusgrotto.active":
      me.getComponent().NavigateToRoom(82)
    "nav.spacemountain", "nav.spacemountain.active":
      me.getComponent().NavigateToRoom(73)
    "nav.shrinkingmachine", "nav.shrinkingmachine.active":
      me.getComponent().NavigateToRoom(81)
    "nav.advancedmode.off":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)
    "nav.advancedmode.on":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)
    "nav.advancedmode.hd":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)

  end case
end
on MainStreetClick me, a_elemID
  case a_elemID of
    "nav.tab.parkmap.passive":
      me.ChangePage(#whatsnew)
    "nav.tab.adventureland.passive":
      me.ChangePage(#adventureland)
    "nav.tab.frontierland.passive":
      me.ChangePage(#frontierland)
    "nav.tab.fantasyland.passive":
      me.ChangePage(#fantasyland)
    "nav.tab.tomorrowland.passive":
      me.ChangePage(#tomorrowland)
    "nav.tab.neworleans.passive":
      me.ChangePage(#neworleans)
    "nav.castlecourtyard", "nav.castlecourtyard.active":
      me.getComponent().NavigateToRoom(35)
    "nav.hub2", "nav.hub2.active":
      me.getComponent().NavigateToRoom(2)
    "nav.vmkcentral", "nav.vmkcentral.active":
      me.getComponent().NavigateToRoom(41)
    "nav.musicjam", "nav.musicjam.active":
      me.getComponent().NavigateToRoom(42)
    "nav.musicalmainstreet", "nav.musicalmainstreet.active":
      me.getComponent().NavigateToRoom(4)
    "nav.emporium", "nav.emporium.active":
      me.getComponent().NavigateToRoom(43)
    "nav.mainstreetsquare", "nav.mainstreetsquare.active":
      me.getComponent().NavigateToRoom(3)
    "nav.esplanade", "nav.esplanade.active":
      me.getComponent().NavigateToRoom(48)
    "nav.buenavista", "nav.buenavista.active":
      me.getComponent().NavigateToRoom(72)
    "nav.pennyarcade", "nav.pennyarcade.active":
      me.getComponent().NavigateToRoom(140)
    "nav.magicshopcheckers", "nav.magicshopcheckers.active":
      me.getComponent().NavigateToRoom(1108)
    "nav.advancedmode.off":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)
    "nav.advancedmode.on":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)
    "nav.advancedmode.hd":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)

  end case
end
on NewOrleansClick me, a_elemID
  case a_elemID of
    "nav.tab.parkmap.passive":
      me.ChangePage(#whatsnew)
    "nav.tab.adventureland.passive":
      me.ChangePage(#adventureland)
    "nav.tab.frontierland.passive":
      me.ChangePage(#frontierland)
    "nav.tab.fantasyland.passive":
      me.ChangePage(#fantasyland)
    "nav.tab.tomorrowland.passive":
      me.ChangePage(#tomorrowland)
    "nav.tab.mainstreet.passive":
      me.ChangePage(#mainstreet)
    "nav.tab.neworleans.passive":
      me.ChangePage(#neworleans)
    "nav.neworleanssquare", "nav.neworleanssquare.active":
      me.getComponent().NavigateToRoom(95)
    "nav.gallery", "nav.gallery.active":
      me.getComponent().NavigateToRoom(96)
    "nav.bluebayou", "nav.bluebayou.active":
      me.getComponent().NavigateToRoom(97)
    "nav.hauntedmansion", "nav.hauntedmansion.active":
      me.getComponent().NavigateToRoom(1104)
    "nav.advancedmode.off":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)
    "nav.advancedmode.on":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)
    "nav.advancedmode.hd":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)

  end case
end
on ParkMapClick me, a_elemID
  case a_elemID of
    "nav.frontierland", "nav.frontierland.active":
      me.ChangePage(#frontierland)
    "nav.guestrooms", "nav.guestrooms.active":
      me.startGuestRoomNavigator()
    "nav.fantasyland", "nav.fantasyland.active":
      me.ChangePage(#fantasyland)
    "nav.adventureland", "nav.adventureland.active":
      me.ChangePage(#adventureland)
    "nav.mainstreet", "nav.mainstreet.active":
      me.ChangePage(#mainstreet)
    "nav.tomorrowland", "nav.tomorrowland.active":
      me.ChangePage(#tomorrowland)
    "nav.neworleans", "nav.neworleans.active":
      me.ChangePage(#neworleans)
    "nav.shortcut_1":
      me.OpenShortCut(1)
    "nav.shortcut_2":
      me.OpenShortCut(2)
    "nav.shortcut_3":
      me.OpenShortCut(3)
    "nav.shortcut_4":
      me.OpenShortCut(4)
    "nav.advancedmode.off":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)
    "nav.advancedmode.on":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)
    "nav.advancedmode.hd":
      me.ToggleAdvancedMode()
      me.getComponent().RequestNavigationNodes(m_page)
    "nav.tab.adventureland.passive":
      me.ChangePage(#adventureland)
    "nav.tab.frontierland.passive":
      me.ChangePage(#frontierland)
    "nav.tab.fantasyland.passive":
      me.ChangePage(#fantasyland)
    "nav.tab.tomorrowland.passive":
      me.ChangePage(#tomorrowland)
    "nav.tab.mainstreet.passive":
      me.ChangePage(#mainstreet)
    "nav.tab.neworleans.passive":
      me.ChangePage(#neworleans)

  end case
end
on OpenShortCut me, a_iShortcut
  if variableExists("nav.shortcut." & a_iShortcut) then
    t_iRoomNum = getVariable("nav.shortcut." & a_iShortcut)
    if not voidp(t_iRoomNum) then
      me.getComponent().NavigateToRoom(t_iRoomNum)
    end if
  end if
end
on click me, a_elemID
  if windowExists(m_sAdvancedModeWindowTitle) then
    removeWindow(m_sAdvancedModeWindowTitle)
  end if
  if a_elemID = "close" then
    executeMessage("PlayInterfaceSound", "close-popup")
    me.showhidenavigator()
  else
    if a_elemID = "help" then
      executeMessage(#open_help_page, "help.navigation.navigator")
    else
      if a_elemID = "nav.guestrooms.button" then
        executeMessage(#ui_navigator_guestroom)
        me.startGuestRoomNavigator()
      else
        case m_page of
          #parkmap, #whatsnew:
            executeMessage(#ui_navigator_land)
            me.ParkMapClick(a_elemID)
          #adventureland:
            executeMessage(#ui_navigator_land)
            me.AdventureLandClick(a_elemID)
          #frontierland:
            executeMessage(#ui_navigator_land)
            me.FrontierLandClick(a_elemID)
          #fantasyland:
            executeMessage(#ui_navigator_land)
            me.FantasyLandClick(a_elemID)
          #tomorrowland:
            executeMessage(#ui_navigator_land)
            me.TomorrowLandClick(a_elemID)
          #mainstreet:
            executeMessage(#ui_navigator_land)
            me.MainStreetClick(a_elemID)
          #neworleans:
            executeMessage(#ui_navigator_land)
            me.NewOrleansClick(a_elemID)

        end case
      end if
    end if
  end if
end
on startGuestRoomNavigator me
  executeMessage("PlayInterfaceSound", "map-tab-change")
  executeMessage(#ui_Fastpass)
  if voidp(m_pGuestRoomNavigator) then
    m_pGuestRoomNavigator = createObject(#random, "CGuestRoomNavigator")
    m_pGuestRoomNavigator.showHide()
  else
    m_pGuestRoomNavigator.showHide()
  end if
end
on GetGuestRoomNavigator me
  if voidp(m_pGuestRoomNavigator) then
    m_pGuestRoomNavigator = createObject(#random, "CGuestRoomNavigator")
  end if
  return m_pGuestRoomNavigator
end
on startThemedGuestRoomNavigator me
  executeMessage("PlayInterfaceSound", "map-tab-change")
  executeMessage(#ui_Fastpass)
  if voidp(m_pThemedGuestRoomNavigator) then
    m_pThemedGuestRoomNavigator = createObject(#random, "CThemedGuestRoomNavigator")
    m_pThemedGuestRoomNavigator.showHide()
  else
    m_pThemedGuestRoomNavigator.showHide()
  end if
end
on GetThemedGuestRoomNavigator me
  return m_pThemedGuestRoomNavigator
end
on startMiniGame me, a_game
  case a_game of
    #pirates:
      me.getComponent().NavigateToRoom(1001)
    #junglecruise:
      me.getComponent().NavigateToRoom(11)
    #fireworks:
      me.getComponent().NavigateToRoom(1100)
    #musicjam:
      me.getComponent().NavigateToRoom(42)

  end case
end
on eventProcNavigator me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_windowTitle)
  if tEvent = #mouseUp then
    me.click(tElemID)
  else
    if tEvent = #mouseEnter and not (tElemID contains "tab") then
      if not (tElemID contains ".active") then
        tHighLighter = tWndObj.getElement(tElemID & ".active")
      else
        tHighLighter = tWndObj.getElement(tElemID)
      end if
      if objectp(tHighLighter) then
        tHighLighter.getProperty(#sprite).ink = 33
        tHighLighter.show()
      end if
    else
      if tEvent = #mouseLeave and not (tElemID contains "tab") then
        if not (tElemID contains ".active") then
          tHighLighter = tWndObj.getElement(tElemID & ".active")
        else
          tHighLighter = tWndObj.getElement(tElemID)
        end if
        if objectp(tHighLighter) then
          tHighLighter.hide()
        end if
      end if
    end if
  end if
end
on eventProcAdvNavigator me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    case tElemID of
      "nav.gotoroom.button":
        if m_pAdvancedNavItemList.GetSelected() <> 0 then
          tInsId = m_pAdvancedNavItemList.GetItem(m_pAdvancedNavItemList.GetSelected()).getLink().getaProp("instanceID")
          getConnection(getVariable("main.connection.id", "VMK")).send(31, [#integer: m_activeRoomID, #integer: tInsId])
          me.getInterface().showhidenavigator()
        else
          getConnection(getVariable("main.connection.id", "VMK")).send(31, [#integer: m_activeRoomID, #integer: -1])
          executeMessage("PlayInterfaceSound", "map-room-selection")
          me.showhidenavigator()
        end if
      "nav.advancedlist":
        tElement = getWindow(m_sAdvancedModeWindowTitle).getElement("nav.advancedlist")
        tRect = tElement.getProperty(#rect)
        tElement.feedImage(m_pAdvancedNavItemList.click(tParm))
        if m_pAdvancedNavItemList.GetSelected() <> 0 then
          tItem = m_pAdvancedNavItemList.GetItem(m_pAdvancedNavItemList.GetSelected())
          m_mp_advancedSelectedData = tItem.getLink()
        else
          m_mp_advancedSelectedData = [:]
        end if
      "close":
        executeMessage("PlayInterfaceSound", "close-popup")
        getWindow(m_sAdvancedModeWindowTitle).hide()
      "help":
        executeMessage("PlayInterfaceSound", "close-popup")
        executeMessage(#open_help_page, "help.navigation.navigator")

    end case
  end if
end
on getAdvancedModeWindow me
  return getWindow(m_sAdvancedModeWindowTitle)
end
on SetAdvancedModeWindowData me, a_sTitle, a_iRoomID, a_mp_roomInstances
  getWindow(m_sAdvancedModeWindowTitle).getElement("nav.advanced.roomhd").setText(a_sTitle)
  if a_iRoomID <> -1 then
    m_activeRoomID = a_iRoomID
  end if
  if listp(a_mp_roomInstances) and a_mp_roomInstances.count > 1 then
    t_mp_advancedModeInstanceInfo = []
    t_OneEmptyAdded = 0
    repeat with i = 1 to a_mp_roomInstances.count
      if a_mp_roomInstances[i].instanuserpercent > 0 then
        t_mp_advancedModeInstanceInfo.add(a_mp_roomInstances[i])
        next repeat
      end if
      if not t_OneEmptyAdded then
        t_mp_advancedModeInstanceInfo.add(a_mp_roomInstances[i])
        t_OneEmptyAdded = 1
      end if
    end repeat
    m_mp_advancedModeInstanceInfo = t_mp_advancedModeInstanceInfo
  else
    m_mp_advancedModeInstanceInfo = a_mp_roomInstances
  end if
  me.RefreshAdvancedInterface()
end
on RefreshAdvancedInterface me
  m_pAdvancedNavItemList.clear()
  m_pAdvancedNavItemList.SetWidth(getMember("field.advnav.active").image.width)
  tList = [:]
  t_iCount = m_ar_instanceTitles.count
  t_iCounter = 1
  repeat with i = 1 to m_mp_advancedModeInstanceInfo.count
    t_mp_InstanceData = m_mp_advancedModeInstanceInfo[i]
    t_iInstanceNum = t_mp_InstanceData.instanceID + 1
    if t_iInstanceNum <= t_iCount then
      t_sID = m_ar_instanceTitles[t_iInstanceNum]
    else
      t_sID = m_ar_instanceTitles[t_iCounter]
      t_iCounter = t_iCounter + 1
      if t_iCounter > t_iCount then
        t_iCounter = 1
      end if
    end if
    tList.addProp(t_sID, t_mp_InstanceData)
  end repeat
  tImg = m_pAdvancedNavItemList.createTopics(tList)
  getWindow(m_sAdvancedModeWindowTitle).getElement("nav.advancedlist").feedImage(tImg)
  updateStage()
end
on NavigatorReady me
  if m_page = #parkmap or m_page = #whatsnew then
    m_ar_MinigameNavNodes = me.getComponent().GetNavNodes()
  end if
end
on StopWelcomeSnd me
  if objectp(m_objSnd) then
    m_objSnd.StopSound()
    removeObject(m_objSnd)
    m_objSnd = VOID
  end if
end
on getRoomInstanceTitles me
  return m_ar_instanceTitles
end