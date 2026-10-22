-- Movie Script
property m_windowTitle
property m_sCameraWindowName
property m_sPicTitleWindowName
property m_ar_HiddenMickeysInRoom
property m_lHiddenMickeysInViewFinder
property m_mpHiddenMickeysInRoom
property m_arActiveMickeyList
property m_mpMickeyColorList
property m_mpHMMembersByType

on construct me
  m_mpHMMembersByType = [0: ["floor": "q2", "wall": "q1"], 1: ["floor": "q4", "wall": "q3"], 2: ["floor": "q6", "wall": "q5"], 3: ["floor": "q8", "wall": "q7"], 4: ["floor": "q10", "wall": "q9"]]
  m_windowTitle = "Hidden Mickey"
  m_sCameraWindowName = "CameraViewFinder"
  m_sPicTitleWindowName = "CameraPictureTitle"
  m_lHiddenMickeysInViewFinder = []
  m_ar_HiddenMickeysInRoom = []
  m_mpHiddenMickeysInRoom = [:]
  m_mpHiddenMickeysInRoom.sort()
  m_arActiveMickeyList = []
  m_mpMickeyColorList = [:]
  m_mpMickeyColorList.sort()
  registerMessage(#Initialize, me.getID(), #InitializeObject)
  registerMessage(#room_ready, me.getID(), #allocateMickeysInRoom)
  registerMessage(#room_leave, me.getID(), #reset)
  return 1
end
on deconstruct me
end
on InitializeObject me
  executeMessage(#camera_add_receiver, me)
end
on reset me
  m_ar_HiddenMickeysInRoom = []
  m_lHiddenMickeysInViewFinder = []
  repeat with tMickey in m_mpHiddenMickeysInRoom
    if not voidp(tMickey.getaProp("SPRITE")) then
      releaseSprite(tMickey["SPRITE"].spriteNum)
    end if
  end repeat
  m_mpHiddenMickeysInRoom = [:]
end
on allocateMickeysInRoom me, a_kSkipActiveCheck
  t_rRoomXML = getThread(#room).getComponent()._AccessRoom().GetRoot()
  t_sMickeyDef = t_rRoomXML[#param]["NAME"] & ".mickey.xml"
  if member(t_sMickeyDef).memberNum > 0 then
    t_rHMXML = CreateXML(member(t_sMickeyDef).text)
    repeat with tMickey in t_rHMXML.GetRoot()[#child][1][#child]
      t_iMickeyID = value(tMickey[#param]["ID"])
      if m_arActiveMickeyList.getPos(t_iMickeyID) = 0 and a_kSkipActiveCheck <> #skipactivecheck then
        next repeat
      end if
      m_mpHiddenMickeysInRoom.setaProp(t_iMickeyID, [:])
      tSprite = sprite(reserveSprite(me.getID()))
      repeat with i = 1 to tMickey[#param].count
        tParamName = tMickey[#param].getPropAt(i)
        tParamStr = tMickey[#param][i]
        tParamVal = value(tMickey[#param][i])
        case tParamName of
          "TYPE":
            tColor = m_mpMickeyColorList.getaProp(t_iMickeyID)
            if voidp(tColor) then
              tColor = 0
            end if
            tmember = m_mpHMMembersByType.getaProp(tColor)[tParamStr]
            tSprite.member = getMember(tmember)
          "X":
            tSprite.locH = tParamVal
          "Y":
            tSprite.locV = tParamVal
          "Z":
            tSprite.locZ = tParamVal
          "W":
            tSprite.width = tParamVal
          "H":
            tSprite.height = tParamVal
          "BLEND":
            tSprite.blend = tParamVal
          "FLIPH":
            tSprite.flipH = tParamVal

        end case
        m_mpHiddenMickeysInRoom.getaProp(t_iMickeyID).setaProp(tParamName, tParamStr)
      end repeat
      m_mpHiddenMickeysInRoom.getaProp(t_iMickeyID).setaProp("SPRITE", tSprite)
    end repeat
  else
    error(me, "Unable to find hidden mickey definition XML for room!", #allocateMickeysInRoom)
  end if
end
on SetActiveMickeyList me, a_arMickeyIds, a_arColors
  tCount = a_arMickeyIds.count
  repeat with i = 1 to tCount
    tID = a_arMickeyIds[i]
    m_arActiveMickeyList.append(tID)
    m_mpMickeyColorList.setaProp(tID, a_arColors[i])
  end repeat
end
on GetMickeysInRoom me
  return m_mpHiddenMickeysInRoom
end
on GetMickeyMemberByTypeAndOrientation this, a_iColor, a_sOrientation
  return m_mpHMMembersByType.getaProp(a_iColor)[a_sOrientation]
end
on showHiddenMickeysInViewFinder me, a_rect
  m_lHiddenMickeysInViewFinder = []
  repeat with i = 1 to m_mpHiddenMickeysInRoom.count
    tMickey = m_mpHiddenMickeysInRoom[i]
    tID = m_mpHiddenMickeysInRoom.getPropAt(i)
    tBlend = value(tMickey["BLEND"])
    tSprite = tMickey["SPRITE"]
    if tSprite <> 0 then
      t_error = 0
      t_corners = [point(tSprite.rect.left, tSprite.rect.top), point(tSprite.rect.right, tSprite.rect.top), point(tSprite.rect.right, tSprite.rect.bottom), point(tSprite.rect.left, tSprite.rect.bottom)]
      repeat with t_corner in t_corners
        if not t_corner.inside(a_rect) then
          t_error = 1
          exit repeat
        end if
      end repeat
      if not t_error then
        m_lHiddenMickeysInViewFinder.append(tMickey)
        tSprite.blend = 100
      end if
    end if
  end repeat
  return m_lHiddenMickeysInViewFinder.count()
end
on photoTaken me
  repeat with tMickey in m_lHiddenMickeysInViewFinder
    tSprite = tMickey["SPRITE"]
    tSprite.blend = tMickey["BLEND"]
  end repeat
  if m_lHiddenMickeysInViewFinder.count = 0 then
    executeMessage(#MickeyInPicture, 0)
  end if
  m_lHiddenMickeysInViewFinder = []
end
on updateQuestStatus me
  if getTimeout(#HMQuestStatus) <> 0 then
    removeTimeout(#HMQuestStatus)
  end if
end
on EventProc me, tEvent, tElemID, tParm
  if tEvent = #mouseDown then
    case tElemID of
      "camera.takepicture.button":
        tWndObj = getWindow(m_sCameraWindowName)
        if tWndObj <> 0 then
          tRect = getWindow(m_sCameraWindowName).getElement("camera.picture").pSprite.rect
          if me.showHiddenMickeysInViewFinder(tRect) > 0 then
            me.getHandler().RequestHiddenMickeyTest(point(tRect.left, tRect.top))
          end if
        end if
      otherwise:
        put "Hidden Mickey Quest received proc: " && [tEvent, tElemID, tParm]

    end case
  end if
end
on SwitchMickeyColor this, a_iMickeyId, a_kNext
  t_mpMickey = m_mpHiddenMickeysInRoom.getaProp(a_iMickeyId)
  if voidp(t_mpMickey) then
    return error(this, "Mickey not found.", #SwitchMickeyColor)
  end if
  t_iCurrentColor = m_mpMickeyColorList.getaProp(a_iMickeyId)
  case a_kNext of
    #next:
      t_iCurrentColor = t_iCurrentColor + 1
      if t_iCurrentColor > m_mpHMMembersByType.count - 1 then
        t_iCurrentColor = 0
      end if
    #previous:
      t_iCurrentColor = t_iCurrentColor - 1
      if t_iCurrentColor < 0 then
        t_iCurrentColor = m_mpHMMembersByType.count - 1
      end if

  end case
  t_mpMickey["SPRITE"].member = m_mpHMMembersByType.getaProp(t_iCurrentColor).getaProp(t_mpMickey["TYPE"])
  m_mpMickeyColorList.setaProp(a_iMickeyId, t_iCurrentColor)
end