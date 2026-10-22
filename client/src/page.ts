/**
 * The page around the stage: fit the 800x600 canvas to the window at 4:3, and
 * the full-screen button.
 *
 * Only the canvas's DISPLAYED size changes. Its backing store stays 800x600 —
 * VMK lays its windows out against `the stage.rect` — and input already maps
 * through the displayed size (`toStage` in boot-client), so scaling needs
 * nothing from the client. The browser's default (smooth) scaling is used:
 * at fractional sizes nearest-neighbour makes the pixel art and bitmap fonts
 * shimmer unevenly, which reads worse than a slight softness.
 */
const ASPECT = 4 / 3;
/** Keep the button clear of the stage edge, in the letterbox when there is one. */
const BUTTON = 32;
const GAP = 8;

export function setUpPage(debug: boolean): void {
  if (debug) document.body.classList.add("debug");
  const game = document.getElementById("game");
  const canvas = document.getElementById("stage") as HTMLCanvasElement | null;
  const button = document.getElementById("fullscreen") as HTMLButtonElement | null;
  if (!game || !canvas) return;

  const fit = (): void => {
    const boxW = game.clientWidth;
    const boxH = game.clientHeight;
    if (boxW <= 0 || boxH <= 0) return;
    const width = Math.floor(Math.min(boxW, boxH * ASPECT));
    const height = Math.floor(width / ASPECT);
    canvas.style.width = `${String(width)}px`;
    canvas.style.height = `${String(height)}px`;
    if (button) placeButton(button, canvas);
  };

  new ResizeObserver(fit).observe(game);
  window.addEventListener("resize", fit);
  fit();

  if (!button) return;
  if (!document.fullscreenEnabled) {
    button.hidden = true;
    return;
  }
  button.addEventListener("click", () => {
    // ⚠ Drop focus first: a focused button turns the game's own Enter/Space
    // presses (chat!) into another click on it.
    button.blur();
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => undefined);
  });
  document.addEventListener("fullscreenchange", fit);
}

/**
 * In the letterbox beside the stage when there is room — VMK draws its own
 * buttons in every corner of the stage — otherwise over the top-right corner.
 */
function placeButton(button: HTMLButtonElement, canvas: HTMLCanvasElement): void {
  const box = canvas.getBoundingClientRect();
  const spaceRight = window.innerWidth - box.right;
  const spaceBelow = window.innerHeight - box.bottom;
  let left: number;
  let top: number;
  if (spaceRight >= BUTTON + GAP * 2) {
    left = box.right + GAP;
    top = box.top + GAP;
  } else if (spaceBelow >= BUTTON + GAP * 2) {
    left = box.right - BUTTON - GAP;
    top = box.bottom + GAP;
  } else {
    left = box.right - BUTTON - GAP;
    top = box.top + GAP;
  }
  button.style.left = `${String(Math.round(left))}px`;
  button.style.top = `${String(Math.round(top))}px`;
}
