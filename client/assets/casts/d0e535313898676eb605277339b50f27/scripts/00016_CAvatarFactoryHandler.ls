-- Score Script
property m_bHatListReady
property m_bAvailableSetsReady
property m_arPArsedAvailbleSets
property m_Obj_HmDetails
property m_mp_Test

on construct me
  m_bHatListReady = 0
  m_bAvailableSetsReady = 0
  m_Obj_HmDetails = createObject("HMDetails", "CHiddenMickeyStatus")
  createObject("ImageCache", "CAvatarImageCache")
  me.regMsgList(1)
  return 1
end
on deconstruct me
  if objectExists("AvatarBuilderClothesLoader") then
    removeObject("AvatarBuilderClothesLoader")
  end if
  removeObject("HMDetails")
  me.regMsgList(0)
  return 1
end
on getAvailableSets me, tMsg
  if not m_bAvailableSetsReady and not voidp(tMsg) then
    t_iLength = tMsg.connection.GetIntFrom()
    t_ar_iSetList = []
    repeat with i = 1 to t_iLength
      t_ar_iSetList.add(tMsg.connection.GetIntFrom())
    end repeat
    t_ar_iSetList.sort()
    if t_ar_iSetList.count > 0 then
      m_bAvailableSetsReady = 1
      if objectExists("AvatarBuilderClothesLoader") then
        t_Obj = getObject("AvatarBuilderClothesLoader")
      else
        t_Obj = createObject("AvatarBuilderClothesLoader", "CAvatarClothesLoader")
      end if
      t_Obj.DefineAvailableSets(t_ar_iSetList)
      m_ar_ParsedAvailbleSets = t_ar_iSetList
      m_mp_Test = t_ar_iSetList
    end if
  end if
end
on AllClothesLoaded this, a_arParsedAvailbleSets
  m_bAvailableSetsReady = 1
  if listp(a_arParsedAvailbleSets) then
    m_ar_ParsedAvailbleSets = a_arParsedAvailbleSets
  end if
  if objectExists("AvatarBuilderClothesLoader") then
    removeObject("AvatarBuilderClothesLoader")
  end if
  if m_bHatListReady and m_bAvailableSetsReady and listp(a_arParsedAvailbleSets) then
    return this.getComponent().parseAvailableSets(m_ar_ParsedAvailbleSets)
  end if
end
on BuilderClosed this
  m_bAvailableSetsReady = 0
end
on getAvatarData me, tMsg
  t_sName = tMsg.connection.GetStrFrom()
  getObject(#session).set("Name", t_sName)
  t_iSex = tMsg.connection.GetIntFrom()
  getObject(#session).set("Sex", t_iSex)
  t_sSlogan = tMsg.connection.GetStrFrom()
  getObject(#session).set("Slogan", t_sSlogan)
  t_ar_iFigData = []
  repeat with i = 1 to 12
    t_ar_iFigData.add(tMsg.connection.GetIntFrom())
  end repeat
  me.getComponent().ParseMyAvatar(t_ar_iFigData)
  return 1
end
on ActivateTeleport me, tMsg
  if not objectExists("TeleportObj") then
    t_iMagic = tMsg.connection.GetIntFrom()
    t_Teleport_Obj = createObject("TeleportObj", "CMagicTeleportMove")
    t_Teleport_Obj.SetFxNum(t_iMagic)
  end if
end
on AvatarMoved me, tMsg
  if objectExists("TeleportObj") then
    removeObject("TeleportObj")
  end if
end
on SloganChanged me, tMsg
  me.getInterface().SloganChanged(tMsg.connection.GetIntFrom())
end
on HairListForHats me, tMsg
  t_iLength = tMsg.connection.GetIntFrom()
  t_ar_iHatList = []
  repeat with i = 1 to t_iLength
    t_ar_iHatList.add(tMsg.connection.GetIntFrom())
  end repeat
  me.getComponent().SetHatList(t_ar_iHatList)
  m_bHatListReady = 1
  me.getAvailableSets()
  return 1
end
on foundHiddenMickeyList me, tMsg
  t_iFoundMickeysCount = tMsg.connection.GetIntFrom()
  t_ar_rFoundMickeys = []
  if t_iFoundMickeysCount <> 0 then
    repeat with i = 1 to t_iFoundMickeysCount
      t_rFoundMickey = [:]
      t_rFoundMickey.sort()
      t_rFoundMickey[#id] = tMsg.connection.GetIntFrom()
      t_rFoundMickey[#date] = tMsg.connection.GetStrFrom()
      t_ar_rFoundMickeys.append(t_rFoundMickey)
    end repeat
  end if
  if objectp(m_Obj_HmDetails) then
    m_Obj_HmDetails.updateMickeyList(t_ar_rFoundMickeys)
  end if
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2501, #getAvailableSets)
  tMsgs.setaProp(2505, #getAvatarData)
  tMsgs.setaProp(2513, #SloganChanged)
  tMsgs.setaProp(2528, #ActivateTeleport)
  tMsgs.setaProp(2585, #AvatarMoved)
  tMsgs.setaProp(2512, #HairListForHats)
  tMsgs.setaProp(2772, #foundHiddenMickeyList)
  tCmds = [:]
  tCmds.setaProp("GETFIGURELIST", 501)
  tCmds.setaProp("CHANGEFIGURE", 504)
  tCmds.setaProp("REQUESTDATA", 505)
  tCmds.setaProp("ChangeSlogan", 506)
  tCmds.setaProp("StartAction", 582)
  tCmds.setaProp("StopAction", 583)
  tCmds.setaProp("MagicTeleport", 529)
  tCmds.setaProp("RequestHiddenMickeyList", 773)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end