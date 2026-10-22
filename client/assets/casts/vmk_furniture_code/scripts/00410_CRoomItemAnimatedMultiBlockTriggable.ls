-- Script
property m_mpFrameList
property m_bReady
property m_iState
property m_iDelay
property m_iMaxDelay

on construct me
  m_mpFrameList = [:]
  m_bReady = 0
  m_iLastState = VOID
  m_iDelay = VOID
  m_iMaxDelay = 5
  return 1
end
on deconstruct me
  m_mpFrameList = [:]
  m_bReady = 0
  return callAncestor(#deconstruct, me)
end
on select this
  if the doubleClick then
    t_iRef = integer(this.getObject().GetParam("REF"))
    getConnection("VMK").send("UseItem", [#int: t_iRef, #int: 0])
    return callAncestor(#select, this)
  end if
end
on setState this, a_iState
  if a_iState <> m_iState then
    case a_iState of
      0:
        this.animate(1)
        m_iDelay = 1
      1:
        nothing()
        m_iDelay = 1

    end case
  end if
  m_iState = a_iState
end
on animate this, t_iForceFrame
  if m_bReady then
    if not voidp(t_iForceFrame) or m_iDelay = m_iMaxDelay then
      t_rItem = this.getObject()
      t_fFloorSize = float(getThread(#room).component._AccessRoom().GetParam("TILESIZE"))
      t_fItemSize = float(t_rItem.GetParam("STRUCT")[#param]["TILESIZE"])
      if voidp(t_fItemSize) then
        t_fItemSize = 32.0
      end if
      t_fScaling = VOID
      if t_fItemSize <> t_fFloorSize then
        t_fScaling = t_fFloorSize / t_fItemSize
      end if
      case value(t_rItem.GetParam("DIR")) of
        1:
          tFrameList = m_mpFrameList[1]
        3:
          tFrameList = m_mpFrameList[2]
        5:
          tFrameList = m_mpFrameList[3]
        7:
          tFrameList = m_mpFrameList[4]
        otherwise:
          tFrameList = []

      end case
      t_ar_rBlocks = t_rItem.GetFactor().GetBlocks()
      repeat with i = 1 to t_ar_rBlocks.count
        t_rBlock = t_ar_rBlocks[i]
        t_ar_rSprites = t_rBlock.GetVisual().GetSprites()
        repeat with j = 1 to t_ar_rSprites.count
          t_iMaxFrame = tFrameList[i][j].count
          if t_iMaxFrame > 1 then
            t_rSprite = t_ar_rSprites[j]
            if voidp(t_iForceFrame) then
              t_iCurFrame = tFrameList[i][j].getPos(t_rSprite.member)
              t_iCurFrame = t_iCurFrame + 1
              if t_iCurFrame > t_iMaxFrame then
                t_iCurFrame = 2
              end if
              t_rSprite.member = tFrameList[i][j][t_iCurFrame]
            else
              t_rSprite.member = tFrameList[i][j][t_iForceFrame]
            end if
            if t_fScaling <> VOID then
              t_rSprite.width = t_rSprite.member.width * t_fScaling
              t_rSprite.height = t_rSprite.member.height * t_fScaling
              next repeat
            end if
            t_rSprite.width = t_rSprite.member.width
            t_rSprite.height = t_rSprite.member.height
          end if
        end repeat
      end repeat
      m_iDelay = 1
    else
      m_iDelay = m_iDelay + 1
    end if
  end if
end
on update this
  callAncestor(#update, this)
  if not m_bReady then
    this._Init()
  end if
  if m_iState then
    this.animate()
  end if
end
on _Init me
  t_rItem = me.getObject()
  if t_rItem.GetVisual().IsReady() then
    tStruct = t_rItem.GetParam("STRUCT")
    tAnimDir = []
    repeat with tSub in tStruct.child
      tAnimStruct = []
      tElementClickable = []
      repeat with tBlk in tSub.child
        tAnimBlk = []
        tBlockClickable = []
        i = 1
        repeat with tSpr in tBlk.child
          tBaseName = tSpr.param.getaProp("GFX")
          tAnimSpr = [getMember(tBaseName)]
          tNum = integer(the last char in tBaseName) + 1
          delete char -30000 of tBaseName
          repeat while memberExists(tBaseName & tNum)
            tAnimSpr.append(getMember(tBaseName & tNum))
            tNum = tNum + 1
          end repeat
          tAnimBlk.append(tAnimSpr)
          tBlockClickable.append(i)
          i = i + 1
        end repeat
        tAnimStruct.append(tAnimBlk)
        tElementClickable.append(tBlockClickable)
      end repeat
      tAnimDir.append(tAnimStruct)
    end repeat
    m_mpFrameList = tAnimDir
    t_rItem.GetVisual().SetBlockVisualCursors([getMember("cursor.finger"), getMember("cursor.finger.mask")], tElementClickable)
    m_bReady = 1
    me.setState(m_iState)
  end if
end