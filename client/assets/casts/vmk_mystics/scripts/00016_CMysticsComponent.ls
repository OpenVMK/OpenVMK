-- Score Script
on construct me
end
on deconstruct me
end
on ActivateMysticsEffect this, t_iAvatar, t_iMagicFX, t_aParams
  t_rContext = getThread("room").getComponent()._AccessRoom()
  if objectp(t_rContext) then
    t_rAvatar = t_rContext._AccessIndexed(t_iAvatar, "avatar")
    if objectp(t_rAvatar) then
      t_rRenderer = this.CreateRenderer(t_rAvatar, t_iMagicFX, t_aParams)
      t_rAvatar.GetVisual().SetMysticRenderer(t_rRenderer)
    else
      error(#ActivateMysticsEffect, "Avatar not found!")
    end if
  else
    error(#ActivateMysticsEffect, "Room context not found!")
  end if
end
on CreateRenderer this, a_rAvatar, a_iMagicFx, a_aParams
  t_rRenderer = VOID
  case a_iMagicFx of
    1:
      t_rRenderer = createObject(#random, "CSnowflakeRenderer")
    2:
      t_rRenderer = createObject(#random, "CLetItGoRenderer")
    3:
      t_rRenderer = createObject(#random, "CBluefernoRenderer")
    4:
      t_rRenderer = createObject(#random, "CPopcornRenderer")
    5:
      t_rRenderer = createObject(#random, "CPixieRenderer")
    6:
      t_rRenderer = createObject(#random, "CFWRenderer")
    7:
      t_rRenderer = createObject(#random, "CRobRenderer")
    8:
      t_rRenderer = createObject(#random, "CVillainRenderer")
    9:
      t_rRenderer = createObject(#random, "CWindRenderer")
    10:
      t_rRenderer = createObject(#random, "CPurpleInfernoRenderer")
    11:
      t_rRenderer = createObject(#random, "CSoullessRenderer")

  end case
  if not voidp(t_rRenderer) then
    t_rRenderer.SetTileSize(a_rAvatar.GetVisual().GetRenderer().m_iTileSize)
    t_rRenderer.SetAvatar(a_rAvatar)
    t_rRenderer.SetParams(a_aParams)
  end if
  return t_rRenderer
end