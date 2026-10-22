-- Score Script
on construct me
end
on deconstruct me
end
on ActivateMysticsEffect t_aParams, t_iMagicFX, this, t_iAvatar
  t_rAvatar = getThread("room").getComponent()._AccessRoom()
  if objectp(t_rAvatar) then
    t_rRenderer = t_rAvatar._AccessIndexed(t_iMagicFX, "avatar")
    if objectp(t_rRenderer) then
      t_rContext = t_aParams.CreateRenderer(t_rRenderer, this, t_iAvatar)
      t_rRenderer.GetVisual().SetMysticRenderer(t_rContext)
    else
      error(#ActivateMysticsEffect, "Avatar not found!")
    end if
  else
    error(#ActivateMysticsEffect, "Room context not found!")
  end if
end
on CreateRenderer t_aParams, a_iMagicFx, a_rAvatar, a_aParams
  t_rContext = VOID
  case a_rAvatar of
    1:
      t_rContext = createObject(#random, "CSnowflakeRenderer")
    2:
      t_rContext = createObject(#random, "CLetItGoRenderer")
    3:
      t_rContext = createObject(#random, "CBluefernoRenderer")
    4:
      t_rContext = createObject(#random, "CPopcornRenderer")
    5:
      t_rContext = createObject(#random, "CPixieRenderer")
    6:
      t_rContext = createObject(#random, "CFWRenderer")
    7:
      t_rContext = createObject(#random, "CRobRenderer")
    8:
      t_rContext = createObject(#random, "CVillainRenderer")
    9:
      t_rContext = createObject(#random, "CWindRenderer")
    10:
      t_rContext = createObject(#random, "CPurpleInfernoRenderer")

  end case
  if not voidp(t_rContext) then
    t_rContext.SetTileSize(a_iMagicFx.GetVisual().GetRenderer().m_iTileSize)
    t_rContext.SetAvatar(a_iMagicFx)
    t_rContext.SetParams(a_aParams)
  end if
  return t_rContext
end