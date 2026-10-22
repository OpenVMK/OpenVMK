-- Behavior
property m_rXMLDomestic

on construct this
  this.m_rXMLDomestic = CreateXML(getMember("room.object.domestic.xml").text)
  this.m_rXMLDomestic.Search("type", "NODE")
  setVariable("room.class.factor.domestic", "[" & QUOTE & "CRoomWorker" & QUOTE & ", " & QUOTE & "CRoomFactorDomestic" & QUOTE & "]")
  setVariable("room.class.visual.domestic", "[" & QUOTE & "CRoomWorker" & QUOTE & ", " & QUOTE & "CRoomAnchor" & QUOTE & ", " & QUOTE & "CRoomVisualDomestic" & QUOTE & "]")
  this.regMsgList(1)
end
on deconstruct this
end
on handle_createpet this, tMsg
  t_rObj = tMsg.connection
  tCon = getThread("room").getComponent()._AccessRoom()
  t_rContext = t_rObj.GetIntFrom()
  t_iTile = t_rObj.GetIntFrom()
  t_iID = t_rObj.GetIntFrom()
  t_sName = t_rObj.GetStrFrom()
  t_iDir = t_rObj.GetIntFrom()
  t_rTile = t_rObj.GetIntFrom()
  t_iType = this.m_rXMLDomestic
  t_iType.SetParam("REF", string(t_rContext))
  t_iType.SetParam("NAME", t_sName)
  t_iType.SetParam("TYPE", string(t_iTile))
  t_iType.SetParam("DIR", string(t_iID))
  t_iType.SetParam("ACT", string(t_rTile))
  if tCon._CreateIndexed(t_rContext, "domestic", t_iType) then
    t_iAct = tCon._AccessIndexed(t_rContext, "domestic")
    t_iAct.GetVisual().CreateSprites()
    tXml = tCon._AccessIndexed(t_iDir, "tile")
    if objectp(tXml) then
      t_iStack = 0
      t_rCopy = tXml
      repeat while 1
        if t_rCopy.GetCount() > 0 then
          t_rCopy = t_rCopy[1]
          t_iStack = t_iStack + 1
          next repeat
        end if
        exit repeat
      end repeat
      t_iAct.GetFactor().SetToTileStack(tXml, t_iStack)
    end if
  end if
end
on handle_removepet this, tMsg
  getThread("room").getComponent()._AccessRoom()._RemoveIndexed(tMsg.connection.GetIntFrom(), "domestic")
end
on handle_petstatus this, tMsg
  t_rObj = tMsg.connection
  tCon = getThread("room").getComponent()._AccessRoom()
  t_iRef = t_rObj.GetIntFrom()
  t_bMoveUpdate = t_rObj.GetIntFrom()
  t_iDir = t_rObj.GetIntFrom()
  t_iID = t_rObj.GetIntFrom()
  t_rTile = t_rObj.GetIntFrom()
  t_iAct = tCon._AccessIndexed(t_iRef, "domestic")
  if objectp(t_iAct) then
    t_iAct.SetParam("DIR", string(t_iID))
    t_iAct.SetParam("ACT", string(t_rTile))
    tXml = tCon._AccessIndexed(t_iDir, "tile")
    if objectp(tXml) then
      t_iStack = 0
      t_rCopy = tXml
      repeat while 1
        if t_rCopy.GetCount() > 0 then
          t_rCopy = t_rCopy[1]
          t_iStack = t_iStack + 1
          next repeat
        end if
        exit repeat
      end repeat
      if not t_bMoveUpdate then
        t_iAct.GetFactor().WalkToTile(tXml, t_iStack)
      else
        t_iAct.GetFactor().SetToTileStack(tXml, t_iStack)
      end if
    end if
  end if
end
on handle_petchat this, tMsg
  t_rObj = tMsg.connection
  tCon = getThread("room").getComponent()._AccessRoom()
  t_iRef = t_rObj.GetIntFrom()
  t_sMsg = t_rObj.GetStrFrom()
  t_iAct = tCon._AccessIndexed(t_iRef, "domestic")
  if objectp(t_iAct) then
    t_rColor = rgb(255, 90, 183)
    t_sName = t_iAct.GetParam("NAME")
    t_veLoc = t_iAct.GetScrPos()
    executeMessage(#chat, [#message: t_sMsg, #mode: #say, #name: t_sName, #color: t_rColor, #loc: t_veLoc])
  end if
end
on regMsgList this, tBool
  trace("regMsgList()")
  tMsgs = [:]
  tMsgs.setaProp(3000, #handle_createpet)
  tMsgs.setaProp(3001, #handle_petstatus)
  tMsgs.setaProp(3002, #handle_petchat)
  tMsgs.setaProp(3003, #handle_removepet)
  tCmds = [:]
  tCmds.setaProp("CLICKPET", 3000)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  end if
  trace("end regMsgList()")
end