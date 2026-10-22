-- Script
property m_sWindowName
property m_rNotification
property m_bActive
property m_rClient

on construct me
  m_sWindowName = "HMG Window Notice"
  m_rNotification = VOID
  m_bActive = 0
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  removeUpdate(me.getID())
  if getWindow(m_sWindowName) <> 0 then
    removeWindow(m_sWindowName)
  end if
  if not voidp(m_rNotification) then
    releaseSprite(m_rNotification.spriteNum)
  end if
  return 1
end
on Init me, a_rClient, a_sNotification
  m_rClient = a_rClient
  me.showNotification(a_sNotification)
end
on hide me
  if getWindow(m_sWindowName) <> 0 then
    removeWindow(m_sWindowName)
  end if
  m_bActive = 0
  if not voidp(m_rNotification) then
    m_rNotification.visible = 0
  end if
end
on show me
  if getWindow(m_sWindowName) <> 0 then
    getWindow(m_sWindowName).show()
  else
    me.InitWindow()
  end if
end
on update me
  if m_bActive then
    if not voidp(m_rNotification) then
      if m_rNotification.visible then
        m_rNotification.blend = m_rNotification.blend - 2
        if m_rNotification.blend <= 0 then
          m_rNotification.blend = 0
          m_rNotification.visible = 0
        end if
      end if
    end if
  end if
end
on InitWindow me
  m_bActive = 1
end
on createNotification me
  m_rNotification = sprite(reserveSprite(me.getID()))
  m_rNotification.visible = 0
  m_rNotification.member = VOID
  m_rNotification.ink = 33
  m_rNotification.locZ = 10000
end
on showNotification me, i_sName
  if voidp(m_rNotification) then
    me.createNotification()
  end if
  t_bChange = 0
  case i_sName of
    "door race":
      m_rNotification.member = member("hm.door_race")
      t_bChange = 1
    "sudden death":
      m_rNotification.member = member("hm.suddendeath")
      t_bChange = 1
    "correct exit":
      m_rNotification.member = member("hm.correct_door")
      t_bChange = 1
    "fight":
      m_rNotification.member = member("hm.catch")
      t_bChange = 1
    "hurry up":
      m_rNotification.member = member("hm.hurry_up")
      t_bChange = 1

  end case
  if t_bChange then
    tW = m_rNotification.member.width
    tH = m_rNotification.member.height
    m_rNotification.width = tW
    m_rNotification.height = tH
    m_rNotification.visible = 1
    m_rNotification.blend = 100
    m_rNotification.locH = 400
    m_rNotification.locV = 300
  end if
end