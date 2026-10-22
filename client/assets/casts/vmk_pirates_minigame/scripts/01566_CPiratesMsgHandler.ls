-- Movie Script
on construct me
  return 1
end
on deconstruct me
  return me._Config(0)
end
on _AvatarChat this, a_rMsg
  t_iRef = a_rMsg.connection.GetIntFrom()
  t_sMsg = TransformCannedMsgToString(a_rMsg)
  t_rCon = getThread("room").getComponent()._AccessRoom()
  t_rShip = this.getComponent().GetShipByOwner(t_iRef)
  if not voidp(t_rCon) and not voidp(t_rShip) then
    t_veLoc = vector(t_rShip.GetVisual().getRealLoc().locH, t_rShip.GetVisual().getRealLoc().locV, 0)
    t_sName = t_rShip.GetVisual().getPlayerName()
    if t_rShip.GetParam("Team") = 1 then
      t_rColor = rgb(255, 40, 40)
    else
      t_rColor = rgb(40, 40, 255)
    end if
    executeMessage(#chat, [#message: t_sMsg, #mode: #say, #name: t_sName, #color: t_rColor, #loc: t_veLoc])
  end if
end
on _Config this, a_bBool
  t_sID = getVariable("main.connection.id", "VMK")
  t_rList = [:]
  t_rList.setaProp(2560, #_AvatarChat)
  if a_bBool then
    registerListener(t_sID, this.getID(), t_rList)
  else
    unregisterListener(t_sID, this.getID(), t_rList)
  end if
  t_rList = [:]
  t_rList.setaProp("say", 560)
  t_rList.setaProp("canned_say", 561)
  if a_bBool then
    registerCommands(t_sID, this.getID(), t_rList)
  else
    unregisterCommands(t_sID, this.getID(), t_rList)
  end if
  return 1
end