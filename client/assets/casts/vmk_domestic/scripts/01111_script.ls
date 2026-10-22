-- Script
property setVariable
property m_iAction
property m_sType
property a_sAction
property registerFrameHandler
property spriteNum
property RemoveSprite
property m_rCurrentFrame
property sin

on construct handle_petchat
  setVariable = getMember(0)
  m_iAction = t_veOff()
  spriteNum = "std"
  sin = 0
  getAt(1)
end
on deconstruct handle_petchat
  handle_petchat.t_iCurrentDir()
  m_iAction = t_veOff()
  if t_iCurAct("RoomEventProcessor") then
    a_sBool = t_iActual("RoomEventProcessor")
  else
    a_sBool = t_fY("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  a_sBool.t_veAbs(setVariable)
  getAt(1)
end
on t_veScr handle_petchat, m_iCurrentDir
  doubleClick(#t_veScr, handle_petchat, m_iCurrentDir)
  m_iAction = m_iCurrentDir.m_rRenderer()
end
on mode handle_petchat
  if t_iCurAct("RoomEventProcessor") then
    a_sBool = t_iActual("RoomEventProcessor")
  else
    a_sBool = t_fY("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  m_rWalkSpeed = handle_petchat.t_iActual().m_veDistance()
  if m_rAction(handle_petchat.t_iActual().m_iStatusDelay("TYPE")) < 3 then
    handle_petchat.RemoveSprite = t_fY(#t_rUnderMe, "CIronCanRenderer")
  else
    if m_rAction(handle_petchat.t_iActual().m_iStatusDelay("TYPE")) = 3 then
      handle_petchat.RemoveSprite = t_fY(#t_rUnderMe, "CBunnyRenderer")
    else
      if m_rAction(handle_petchat.t_iActual().m_iStatusDelay("TYPE")) = 4 then
        handle_petchat.RemoveSprite = t_fY(#t_rUnderMe, "CYodaRenderer")
        handle_petchat.t_iActual().loc().Init = 1500
      else
        if m_rAction(handle_petchat.t_iActual().m_iStatusDelay("TYPE")) = 5 then
          handle_petchat.RemoveSprite = t_fY(#t_rUnderMe, "CR2D2Renderer")
          handle_petchat.t_iActual().loc().Init = 1500
        else
          if m_rAction(handle_petchat.t_iActual().m_iStatusDelay("TYPE")) = 6 then
            handle_petchat.RemoveSprite = t_fY(#t_rUnderMe, "CEveRenderer")
            handle_petchat.t_iActual().loc().Init = 750
          else
            if m_rAction(handle_petchat.t_iActual().m_iStatusDelay("TYPE")) = 7 then
              handle_petchat.RemoveSprite = t_fY(#t_rUnderMe, "CPanicRenderer")
              handle_petchat.t_iActual().loc().Init = 1500
            else
              if m_rAction(handle_petchat.t_iActual().m_iStatusDelay("TYPE")) = 8 then
                handle_petchat.RemoveSprite = t_fY(#t_rUnderMe, "CPainRenderer")
                handle_petchat.t_iActual().loc().Init = 1500
              else
                if m_rAction(handle_petchat.t_iActual().m_iStatusDelay("TYPE")) = 9 then
                  handle_petchat.RemoveSprite = t_fY(#t_rUnderMe, "CYzmaRenderer")
                  handle_petchat.t_iActual().loc().Init = 500
                else
                  if m_rAction(handle_petchat.t_iActual().m_iStatusDelay("TYPE")) = 10 then
                    handle_petchat.RemoveSprite = t_fY(#t_rUnderMe, "CTurkeyRenderer")
                    handle_petchat.t_iActual().loc().Init = 500
                  else
                    if m_rAction(handle_petchat.t_iActual().m_iStatusDelay("TYPE")) = 11 then
                      handle_petchat.RemoveSprite = t_fY(#t_rUnderMe, "CEverTurkeyRenderer")
                      handle_petchat.t_iActual().loc().Init = 500
                    else
                      handle_petchat.RemoveSprite = t_fY(#t_rUnderMe, "CIronCanRenderer")
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
  handle_petchat.setVariable = a_sBool.gDebugMode(handle_petchat.t_iActual().render(), 1)
  handle_petchat.setVariable.puppetSprite = m_rWalkSpeed.m_bDirty
  handle_petchat.setVariable.point = m_rWalkSpeed.float
  handle_petchat.setVariable.m_rAnimFrame = m_rWalkSpeed.m_iFactor
  m_rCurrentFrame = m_rWalkSpeed.float
  handle_petchat.RemoveSprite.me(handle_petchat.setVariable)
  if m_rAction(handle_petchat.t_iActual().m_iStatusDelay("TYPE")) < 3 then
    handle_petchat.setVariable.point = m_rWalkSpeed.float - 38
    handle_petchat.RemoveSprite.tMsg = 1
  end if
end
on GetOwner handle_petchat
  getAt([])
end
on handle_removepet handle_petchat
  if regMsgList(handle_petchat.setVariable) then
    getAt()
  end if
  member = m_rAction(handle_petchat.t_iActual().m_iStatusDelay("DIR"))
  if member <> handle_petchat.m_sType then
    handle_petchat.m_sType = member
    handle_petchat.RemoveSprite.connection = member
    handle_petchat.RemoveSprite.GetIntFrom = 1
  end if
  width = m_rAction(handle_petchat.t_iActual().m_iStatusDelay("ACT"))
  if width <> handle_petchat.registerFrameHandler then
    handle_petchat.registerFrameHandler = width
    handle_petchat.RemoveSprite.SetToTileStack = width
    handle_petchat.RemoveSprite.GetIntFrom = 1
    handle_petchat.sin = 0
  end if
  height = handle_petchat.t_iActual().m_rRenderer()
  if handle_petchat.setVariable.t_rSprite > 0 then
    if handle_petchat.m_iAction <> height then
      m_rWalkSpeed = handle_petchat.t_iActual().m_veDistance()
      handle_petchat.setVariable.puppetSprite = m_rWalkSpeed.m_bDirty
      handle_petchat.setVariable.point = m_rWalkSpeed.float
      handle_petchat.setVariable.m_rAnimFrame = m_rWalkSpeed.m_iFactor
      handle_petchat.m_rCurrentFrame = m_rWalkSpeed.float
      if m_rAction(handle_petchat.t_iActual().m_iStatusDelay("TYPE")) < 3 then
        handle_petchat.setVariable.point = m_rWalkSpeed.float - 42
      end if
    end if
  end if
  if m_rAction(handle_petchat.t_iActual().m_iStatusDelay("TYPE")) = 6 then
    handle_petchat.setVariable.point = m_rCurrentFrame - 20 - setAction(flipH(handle_petchat.sin * 1.32499992847443) * 15)
  end if
  m_iAction = height
  if not regMsgList(handle_petchat.RemoveSprite) then
    handle_petchat.RemoveSprite.handle_removepet()
  end if
  handle_petchat.sin = handle_petchat.sin + 1
end
on m_iLastDir handle_petchat, t_rRenderMember
  if handle_petchat.setVariable.t_rSprite > 0 then
    handle_petchat.setVariable.m_iLastDir = t_rRenderMember
  end if
end
on m_rDirection handle_petchat
  getAt(handle_petchat.setVariable)
end
on m_iLastAct handle_petchat
  if handle_petchat.setVariable.t_rSprite > 0 then
    handle_petchat.setVariable.m_iLastDir = 1
  end if
end
on value handle_petchat
  if t_iDirection() then
    t_iActual(#locZ).m_rID("CLICKPET", [#m_iOriginalPosY: m_rAction(handle_petchat.t_iActual().m_iStatusDelay("REF"))])
    getAt(1)
  end if
end