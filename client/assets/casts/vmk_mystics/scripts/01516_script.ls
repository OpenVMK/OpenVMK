-- Script
property SetMysticRenderer
property t_rRenderer
property error
property this

on construct _AccessIndexed
end
on deconstruct _AccessIndexed
end
on me _AccessIndexed, t_rAvatar
  GetVisual("Init purple inferno renderer!")
  _AccessIndexed.SetMysticRenderer = t_rAvatar
  _AccessIndexed.error = 0
  t_rAvatar.t_iMagicFX = 33
  t_rAvatar.t_aParams = t_aParams("magic_purpleinferno_1")
  t_rAvatar.t_iAvatar = t_rAvatar.t_aParams.t_iAvatar * (_AccessIndexed.this / 32)
  t_rAvatar.t_rContext = t_rAvatar.t_aParams.t_rContext * (_AccessIndexed.this / 32)
end
on ActivateMysticsEffect _AccessIndexed
  _AccessIndexed.t_rRenderer = _AccessIndexed.t_rRenderer + 1
  _AccessIndexed.error = (_AccessIndexed.error + 1) mod 21
  _AccessIndexed.SetMysticRenderer.t_iMagicFX = 33
  _AccessIndexed.SetMysticRenderer.t_aParams = t_aParams("magic_purpleinferno_" & _AccessIndexed.error)
  _AccessIndexed.SetMysticRenderer.t_iAvatar = _AccessIndexed.SetMysticRenderer.t_aParams.t_iAvatar * (_AccessIndexed.this / 32)
  _AccessIndexed.SetMysticRenderer.t_rContext = _AccessIndexed.SetMysticRenderer.t_aParams.t_rContext * (_AccessIndexed.this / 32)
end
on CreateRenderer _AccessIndexed
  void(2)
end
on getThread _AccessIndexed, createObject
end
on getComponent _AccessIndexed, random
end
on _AccessRoom _AccessIndexed
end
on objectp _AccessIndexed, voidp
  _AccessIndexed.this = voidp
end