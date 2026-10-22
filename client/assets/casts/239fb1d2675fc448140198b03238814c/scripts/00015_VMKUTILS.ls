-- Behavior
on ShowSpriteLimitCounter
  pSprLimitCounter = createObject("SpriteLimitCounter", "CTempViewSprCount")
end
on HideSpriteLimitCounter
  removeObject("SpriteLimitCounter")
end