-- Script
property m_ar_rAnimations
property m_iRefCounter
property m_ar_sriteDefaults
property m_bRoomReady
property m_bCheckState

on construct me
  m_bCheckState = 0
  m_bRoomReady = 0
  m_iRefCounter = 1
  m_ar_rAnimations = [:]
  m_ar_sriteDefaults = me.createProperties("sprite.props")
  registerMessage(#room_ready, me.getID(), #RoomReady)
  registerMessage(#changeAnimationState, me.getID(), #setState)
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  m_bRoomReady = 0
  unregisterMessage(#changeAnimationState, me.getID())
  unregisterMessage(#room_ready, me.getID())
  removeUpdate(me.getID())
  m_ar_rAnimations.deleteAll()
  return 1
end
on RoomReady me
  m_bRoomReady = 1
end
on getAnimation me, a_sAnimationID
  t_rAnimation = m_ar_rAnimations[a_sAnimationID]
  if objectp(t_rAnimation) then
    return t_rAnimation
  else
    return VOID
  end if
end
on setState me, a_sAnimationID, a_bState, a_kParam, a_kParam2
  t_rAnimation = m_ar_rAnimations[a_sAnimationID]
  if objectp(t_rAnimation) then
    case a_bState of
      #followObject:
        t_rAnimation.GetVisual().setFollowRoomObject(a_kParam)
      #pause, #play, #freeze:
        t_rAnimation.SetParam("ANIMATIONSTATE", a_bState)
      #stop:
        t_rAnimation.SetParam("ANIMATIONSTATE", a_bState)
        t_rAnimation.SetParam("FRAMECOUNTER", 1)
      #rewind:
        t_rAnimation.SetParam("FRAMECOUNTER", 1)
      #goto:
        if integerp(a_kParam) then
          t_rAnimation.SetParam("FRAMECOUNTER", a_kParam)
        else
          if stringp(a_kParam) then
            t_rAnimation.GetFactor().gotomarker(a_kParam, a_kParam2)
          end if
        end if
      #show, #hide:
        if objectp(t_rAnimation.GetVisual()) then
          t_rAnimation.GetVisual().setState(a_bState)
        end if
      otherwise:
        put "Error, unknown animation state" && a_bState

    end case
  end if
end
on NewAnimation me, a_vWorldPos, a_sAnimationID, a_sAnimationMember, a_iAnimationType
  if voidp(a_iAnimationType) then
    a_iAnimationType = #room
  end if
  t_rAnimationXML = VOID
  if getMember(a_sAnimationMember) <> 0 then
    t_sAnimationContent = getMember(a_sAnimationMember).text
    t_rAnimationXML = CreateXML(t_sAnimationContent)
  end if
  tProps = [:]
  tProps["Reference"] = m_iRefCounter
  tProps["WorldPosition"] = a_vWorldPos
  tProps["spriteDefaults"] = m_ar_sriteDefaults
  tProps["FRAMECOUNTER"] = 1
  tProps["ANIMATIONSTATE"] = #play
  tProps["ANIMATIONID"] = a_sAnimationID
  case a_iAnimationType of
    #room:
      tObject = me.CreateRoomAnimationObject("vmkanimation", m_iRefCounter, tProps)
    #sprite:
      tObject = me.CreateSpriteAnimationObject("vmkanimation", m_iRefCounter, tProps)
    otherwise:
      tObject = me.CreateRoomAnimationObject("vmkanimation", m_iRefCounter, tProps)

  end case
  tObject.SetAbsPos(a_vWorldPos)
  t_bSuccess = me.parseAnimation(t_rAnimationXML, tObject)
  m_ar_rAnimations.addProp(a_sAnimationID, tObject)
  m_iRefCounter = m_iRefCounter + 1
  m_bCheckState = 1
  return tObject
end
on CreateSpriteAnimationObject me, a_sClass, a_iRef, a_mp_params
  t_rAnimationObject = createObject(#random, "CSpriteAnimationObject")
  repeat with i = 1 to a_mp_params.count
    tKey = a_mp_params.getPropAt(i)
    tvalue = a_mp_params.getaProp(tKey)
    t_rAnimationObject.SetParam(tKey, tvalue)
  end repeat
  return t_rAnimationObject
end
on CreateRoomAnimationObject me, a_sClass, a_iRef, a_mp_params
  t_rXML = CreateXML()
  if getMember("empty.node.xml") = 0 then
    put "Animation Manager has trouble finding the empty-node xml member"
  end if
  t_rXML.open(member("empty.node.xml").text)
  t_rXML.Search("type", "NODE")
  t_rXML.SetParam("REF", a_iRef)
  t_rXML.SetParam("CLASS", a_sClass)
  t_rRoomContext = getThread("room").getComponent()._AccessRoom()
  t_rRoomContext._CreateIndexed(a_iRef, a_sClass, t_rXML)
  t_rAnimationObject = t_rRoomContext._AccessIndexed(a_iRef, a_sClass)
  repeat with i = 1 to a_mp_params.count
    tKey = a_mp_params.getPropAt(i)
    tvalue = a_mp_params.getaProp(tKey)
    t_rAnimationObject.SetParam(tKey, tvalue)
  end repeat
  return t_rAnimationObject
end
on update me
  if m_bCheckState and m_bRoomReady then
    t_iChecks = 0
    repeat with t_rAnimation in m_ar_rAnimations
      if objectp(t_rAnimation.GetVisual()) and objectp(t_rAnimation.GetFactor()) then
        t_iChecks = t_iChecks + 1
      end if
    end repeat
    if t_iChecks = m_ar_rAnimations.count then
      executeMessage(#room_animations_ready)
      m_bCheckState = 0
    end if
  end if
end
on ClearAll me
  repeat while m_ar_rAnimations.count > 0
    t_sAnimationID = m_ar_rAnimations.getPropAt(1)
    me.RemoveAnimation(t_sAnimationID)
  end repeat
  m_ar_rAnimations = [:]
end
on RemoveAnimation me, a_sAnimationID
  t_rAnimation = m_ar_rAnimations[a_sAnimationID]
  if objectp(t_rAnimation) then
    t_sAnimationType = t_rAnimation.string.word[2]
    t_sAnimationType = replaceChunks(t_sAnimationType, QUOTE, EMPTY)
    case t_sAnimationType of
      "CSpriteAnimationObject":
        removeObject(t_rAnimation.getID())
      "CRoomObject":
        nothing()
      otherwise:
        put "Removing unknown animation:" && t_sAnimationType && a_sAnimationID

    end case
  end if
  m_ar_rAnimations.deleteProp(a_sAnimationID)
end
on parseAnimation me, t_rXML, tObject
  if objectp(t_rXML) then
    t_animation = [:]
    t_animation[#fileVersion] = "0.1"
    t_animation[#version] = "1.0"
    t_animation[#creator] = EMPTY
    t_animation[#date] = EMPTY
    t_animation[#time] = EMPTY
    t_rXML.GetRoot()
    t_checkData = ["fileversion", "version", "creator", "time", "date"]
    repeat with tdata in t_checkData
      tPos = t_rXML.GetRoot().param.findPos(tdata)
      if tPos <> 0 then
        t_animation[symbol(tdata)] = t_rXML.GetRoot().param[tPos]
      end if
    end repeat
    if t_animation.version = 1.64999997615814 then
      t_animation.fileVersion = 1.64999997615814
      t_animation.version = 1.0
    end if
    t_ar_Events = [:]
    t_ar_Sounds = [:]
    if value(t_animation.fileVersion) >= 0.5 then
      if t_rXML.Search("type", "SCORE", 1) then
      end if
      if t_rXML.Search("type", "EVENTS", 1) then
        repeat with tEvent in t_rXML.GetNode().child
          case tEvent[#type] of
            "EVENT":
              t_sEventID = string(tEvent.param["FRAME"])
              t_sEventName = tEvent.param["NAME"]
              t_ar_Events[t_sEventID] = t_sEventName

          end case
        end repeat
      end if
      if t_rXML.Search("type", "SOUNDS", 1) then
        repeat with tSound in t_rXML.GetNode().child
          case tSound[#type] of
            "SOUND":
              t_sSoundID = string(tSound.param["FRAME"])
              t_sSoundName = tSound.param["NAME"]
              if listp(t_ar_Sounds.getaProp(t_sSoundID)) then
                t_ar_Sounds[t_sSoundID].append(t_sSoundName)
              else
                t_ar_Sounds[t_sSoundID] = [t_sSoundName]
              end if

          end case
        end repeat
      end if
    end if
    if t_rXML.Search("type", "ANIMATION", 1) then
      t_bDebug = 0
      if t_animation.fileVersion = "0.1" then
        if t_rXML.GetNode().param.findPos("REGPOINT") = 0 then
          put "No Animation REGPOINT Defined!!"
          return 0
        else
          t_animation.fileVersion = "0.2"
        end if
      end if
      if t_bDebug then
        put t_rXML.GetParam("LASTFRAME")
        put t_rXML.GetParam("LASTCHANNEL")
        put t_rXML.GetParam("REGPOINT")
      end if
      t_animation[#Info] = t_rXML.GetNode().param.duplicate()
      t_animation[#channels] = []
      t_iLastFrameOfLastSprite = 1
      repeat with tChannel in t_rXML.GetNode().child
        case tChannel[#type] of
          "CHANNEL":
            if t_bDebug then
              put "CHANNEL"
              repeat with iChannelCounter = 1 to tChannel.param.count
                tParamName = tChannel.param.getPropAt(iChannelCounter)
                tParamValue = value(tChannel.param[iChannelCounter])
                put tParamName && tParamValue
              end repeat
            end if
            t_ar_channelSprites = []
            repeat with tSprite in tChannel.child
              case tSprite.type of
                "SPRITE":
                  t_ar_sprite = [:]
                  tPos = tSprite.param.findPos("SCORECOLOR")
                  if tPos <> 0 then
                    tParamValue = value(tSprite.param[tPos])
                    if tParamValue = 4 then
                      next repeat
                    end if
                  end if
                  tPos = tSprite.param.findPos("ENDFRAME")
                  if tPos <> 0 then
                    tParamValue = value(tSprite.param[tPos])
                    if tParamValue > t_iLastFrameOfLastSprite then
                      t_iLastFrameOfLastSprite = tParamValue
                    end if
                  end if
                  if t_bDebug then
                    put "  SPRITE"
                    repeat with iSpriteCounter = 1 to tSprite.param.count
                      tParamName = tSprite.param.getPropAt(iSpriteCounter)
                      tParamValue = value(tSprite.param[iSpriteCounter])
                      put "      " && tParamName && tParamValue
                    end repeat
                  end if
                  t_ar_sprite[#sprite] = tSprite.param.duplicate()
                  t_ar_sprite[#keyframes] = []
                  repeat with tKeyframe in tSprite.child
                    case tKeyframe.type of
                      "KEYFRAME":
                        t_ar_sprite[#keyframes].append(tKeyframe.param.duplicate())
                        if t_bDebug then
                          put "    KEYFRAME"
                          repeat with iKeyframeCounter = 1 to tKeyframe.param.count
                            tParamName = tKeyframe.param.getPropAt(iKeyframeCounter)
                            tParamValue = value(tKeyframe.param[iKeyframeCounter])
                            put "          " && tParamName && tParamValue
                          end repeat
                        end if
                      otherwise:
                        put "Unknown keyframe" && tChannel[#type] & "." & tSprite[#type] & "." & tKeyframe[#type]

                    end case
                  end repeat
                  t_ar_channelSprites.append(t_ar_sprite)
                otherwise:
                  put "Unknnown sprite" && tChannel[#type] & "." & tSprite[#type]

              end case
            end repeat
            if t_ar_channelSprites.count > 0 then
              t_animation[#channels].append(t_ar_channelSprites)
            end if
          otherwise:
            put "Unknown channel" && tChannel[#type]

        end case
      end repeat
      t_animation[#Info]["LASTFRAME"] = t_iLastFrameOfLastSprite
      tObject.GetVisual().addAnimation(t_animation)
      tObject.GetFactor().setEvents(t_ar_Events)
      tObject.GetFactor().setSounds(t_ar_Sounds)
      return 1
    else
      return 0
    end if
  else
    return 0
  end if
end
on createProperties me, memName
  t_props = [:]
  t_deli = the itemDelimiter
  the itemDelimiter = RETURN
  repeat with i = 1 to member(memName).item.count
    t_item = member(memName).item[i]
    if t_item.char.count <> 0 then
      if not (t_item.char[1..2] = "--") then
        t = offset("=", t_item)
        if t <> 0 then
          t_prop = symbol(t_item.char[1..t - 1])
          if t_props.findPos(t_prop) = 0 then
            t_val = value(t_item.char[t + 1..t_item.char.count])
            t_props.setaProp(t_prop, t_val)
          end if
        end if
      end if
    end if
  end repeat
  the itemDelimiter = t_deli
  t_props.sort()
  return t_props
end