-- Score Script
on construct me
end
on deconstruct me
end
on ActivateMysticsEffect t_iMagicFX, t_aParams, this, t_iAvatar
  t_rRenderer = getThread("room").getComponent()._AccessRoom()
  if objectp(t_rRenderer) then
    t_rContext = t_rRenderer._AccessIndexed(t_aParams, "avatar")
    if objectp(t_rContext) then
      t_rAvatar = t_iMagicFX.CreateRenderer(t_rContext, this, t_iAvatar)
      t_rContext.GetVisual().SetMysticRenderer(t_rAvatar)
    else
      error(#ActivateMysticsEffect, "Avatar not found!")
    end if
  else
    error(#ActivateMysticsEffect, "Room context not found!")
  end if
end
on CreateRenderer t_iMagicFX, a_iMagicFx, a_rAvatar, a_aParams
  t_rAvatar = VOID
  case a_rAvatar of
    1:
      t_rAvatar = createObject(#random, "CSnowflakeRenderer")
    2:
      t_rAvatar = createObject(#random, "CLetItGoRenderer")
    3:
      t_rAvatar = createObject(#random, "CBluefernoRenderer")
    4:
      t_rAvatar = createObject(#random, "CPopcornRenderer")
    5:
      t_rAvatar = createObject(#random, "CPixieRenderer")
    6:
      t_rAvatar = createObject(#random, "CFWRenderer")
    7:
      t_rAvatar = createObject(#random, "CRobRenderer")
    8:
      t_rAvatar = createObject(#random, "CVillainRenderer")
    9:
      t_rAvatar = createObject(#random, "CWindRenderer")

  end case
  if not voidp(t_rAvatar) then
    t_rAvatar.SetTileSize(a_iMagicFx.GetVisual().GetRenderer().m_iTileSize)
    t_rAvatar.SetAvatar(a_iMagicFx)
    t_rAvatar.SetParams(a_aParams)
  end if
  return t_rAvatar
end