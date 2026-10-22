-- Score Script
on construct me
end
on deconstruct me
end
on ActivateMysticsEffect t_aParams, this, t_iMagicFX, t_iAvatar
  t_rAvatar = getThread("room").getComponent()._AccessRoom()
  if objectp(t_rAvatar) then
    t_rContext = t_rAvatar._AccessIndexed(this, "avatar")
    if objectp(t_rContext) then
      t_rRenderer = t_aParams.CreateRenderer(t_rContext, t_iMagicFX, t_iAvatar)
      t_rContext.GetVisual().SetMysticRenderer(t_rRenderer)
    else
      error(#ActivateMysticsEffect, "Avatar not found!")
    end if
  else
    error(#ActivateMysticsEffect, "Room context not found!")
  end if
end
on CreateRenderer t_aParams, a_aParams, a_rAvatar, a_iMagicFx
  t_rRenderer = VOID
  case a_rAvatar of
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

  end case
  if not voidp(t_rRenderer) then
    t_rRenderer.SetTileSize(a_aParams.GetVisual().GetRenderer().m_iTileSize)
    t_rRenderer.SetAvatar(a_aParams)
    t_rRenderer.SetParams(a_iMagicFx)
  end if
  return t_rRenderer
end