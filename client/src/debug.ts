/**
 * Debug mode: the trace panel, the boot status line and the `window.vmk*`
 * inspection hooks.
 *
 * Off by default — a player sees the game and nothing else. `?debug=1` turns
 * it on and REMEMBERS it (localStorage), so it survives the login redirect and
 * reloads; `?debug=0` turns it off again. `?perf` implies it, because the
 * profiler is read through `window.vmkPerf`.
 *
 * ⚠ A URL flag only HIDES things — anyone can type it. For a build handed to
 * outside testers, build with `VITE_VMK_NO_DEBUG=1`: the flag is then a
 * constant `false` and Vite drops the debug paths from the bundle.
 */
const ALLOWED = import.meta.env.VITE_VMK_NO_DEBUG !== "1";
const STORAGE_KEY = "vmkDebug";

function read(): boolean {
  if (!ALLOWED) return false;
  try {
    const params = new URLSearchParams(location.search);
    if (params.has("perf")) return true;
    const asked = params.get("debug");
    if (asked !== null) {
      const on = asked !== "0";
      try {
        if (on) localStorage.setItem(STORAGE_KEY, "1");
        else localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* storage blocked: the flag still applies to this load */
      }
      return on;
    }
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export const DEBUG = read();
