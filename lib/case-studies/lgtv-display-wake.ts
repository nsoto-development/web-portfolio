import type { CaseStudy } from "./types";

export const lgtvDisplayWake: CaseStudy = {
  slug: "lgtv-display-wake",
  title: "When the display wakes but the TV does not",
  subtitle: "A real WoL bug, a capture that changed the question, and a purpose-built sync tool",
  lifecycle: "implemented",
  lastUpdated: "2026-07-27",
  status: {
    phaseLabel: "Implemented",
    headline: "Packaged interim utility — service + tray, validated under VPN",
    body: "Display sleep/wake drives TV standby → WoL → screen on. v0.1.0 ships a self-contained Windows x64 zip (service, console, optional tray). ColorControl PR #597 is a related upstream WoL fix — not claimed to fix the daily webOS control-channel failure.",
  },
  sections: [
    {
      id: "hook",
      eyebrow: "</ CONTEXT >",
      heading: "Dedicated Ethernet, then VPN",
      body: `An LG webOS OLED is the machine’s only display, driven over a **dedicated Ethernet segment** — its own isolated subnet, no internet on that link. PC↔TV control stays on that cable; the PC reaches the internet on a separate interface. [ColorControl](https://github.com/Maassoft/ColorControl) already handled “display sleeps → TV off, wake → TV on” and worked.

After a **WireGuard VPN** came up, wake stopped working: lock the PC, the display sleeps, move the mouse — and the TV never comes back. With the VPN off it always worked. Reachability still looked fine — \`ping\` and a TCP open to the TV succeeded — but the control session never finished, so no “screen on” was sent.`,
    },
    {
      id: "chapter-wol",
      eyebrow: "</ CHAPTER 1 >",
      heading: "A real Wake-on-LAN bug",
      body: `The first investigation assumed the daily failure was WoL under VPN. **Wireshark** captures on the TV segment showed ColorControl spraying magic packets across **all NICs** and targeting a host-style “broadcast” of \`x.x.x.0\` instead of the subnet’s directed broadcast.

The fix: send directed broadcast from the **matching** NIC on the TV subnet. A harness then woke the TV from full standby **with the VPN connected**. That landed upstream as [ColorControl PR #597](https://github.com/Maassoft/ColorControl/pull/597).

**Honest claim:** that PR (and the local patch) fixed **full-standby WoL-over-VPN** in the harness. It did **not**, by itself, explain or fix the everyday lock → mouse-wake path.`,
    },
    {
      id: "pivot",
      eyebrow: "</ PIVOT >",
      heading: "The capture that changed the question",
      body: `A lock → wake **Wireshark** capture with the daily failure reproduced showed **no WoL at all**. On this path the TV was already in a Quick Start+ / control-channel regime: Windows expected “screen on” over the secure WebSocket, not a cold magic packet.

The same captures localized the intermittent failure to TLS on \`wss://<tv>:3001\`: TCP connects, the client sends \`ClientHello\`, the TV **ACKs it and never returns \`ServerHello\`** for the whole timeout, then RSTs roughly fifteen seconds later. Stalls cluster in waves — long stretches succeed in ~130 ms, then a bad period produces a run of hangs. Connection churn makes it worse: each stalled socket lingers on the TV, and webOS has a small connection budget.

**Patched WoL alone ≠ daily mouse-wake fix.** Two bugs had been sharing one symptom.`,
    },
    {
      id: "false-leads",
      eyebrow: "</ DEAD ENDS >",
      heading: "What looked true and wasn’t",
      bullets: [
        "**Assumed WoL path** — daily wake never sent a magic packet; the control channel did.",
        "**Split-tunnel / bad route** — control traffic stayed on the TV Ethernet with the expected source; still stalled.",
        "**Allow LAN / VPN exclusions** — already excluded; failure remained with VPN on.",
        "**IP scheme** — not explanatory under the conditions tested.",
        "**SSDP noise** — distraction, not the TLS stall.",
        "**Screensaver-only path** — different from console display sleep; wrong instrument for the bug.",
        "**Burst retries into a bad wave** — short connect timeout with rapid reconnects storm the TV while sockets linger.",
      ],
    },
    {
      id: "chapter-tls",
      eyebrow: "</ CHAPTER 2 >",
      heading: "Probe the handshake, then change the retry shape",
      body: `Wireshark framed the problem; a purpose-built, instrumented SSAP probe timed each connect phase separately. Together they made the TLS stall measurable instead of “sometimes the TV doesn’t wake.”

ColorControl’s connect strategy (as observed) uses a **~5 s timeout with a burst of retries** at the wake moment — easy to stall and storm through a bad period. The tool that followed uses a **fresh connect with a short (~2.5 s) timeout and gentle, spaced retries**, keeping at most one warm connection so a wave can pass without filling the TV’s budget.`,
    },
    {
      id: "constraints",
      eyebrow: "</ CONSTRAINTS >",
      heading: "What the fix had to honor",
      kind: "constraints",
    },
    {
      id: "options",
      eyebrow: "</ OPTIONS >",
      heading: "Three paths after the pivot",
      body: "Once the capture showed the daily path wasn’t WoL, the remaining choices were operational, not theoretical.",
      kind: "options",
    },
    {
      id: "decision",
      eyebrow: "</ DIRECTION >",
      heading: "Ship a small sync utility; leave the WoL PR upstream",
      body: `**Chosen:** [\`lgtv-display-sync\`](https://github.com/nsoto-development/lgtv-display-sync) — a small Windows/.NET rewrite on standard webOS SSAP with an original short-timeout / spaced-retry transport. It watches console display state, drives standby / screen off, WoL + screen on, and keeps at most one warm control connection.

**Also keep:** ColorControl [PR #597](https://github.com/Maassoft/ColorControl/pull/597) as an upstream contribution for the **real** WoL-over-VPN bug other setups still hit. Soft language on ColorControl: it worked until this topology + VPN; the daily failure was a different layer.

Not a ColorControl fork. Pairing keys can migrate from ColorControl for convenience.`,
    },
    {
      id: "outcome",
      eyebrow: "</ OUTCOME >",
      heading: "Validated under VPN — then packaged as v0.1.0",
      body: `End-to-end: real display sleep → TV standby; wake → WoL → screen on, **VPN connected**, ColorControl not in the loop.

In the meantime the tool moved from a console prototype to a **first packaged interim release** — [\`v0.1.0\`](https://github.com/nsoto-development/lgtv-display-sync/releases/tag/v0.1.0): self-contained Windows x64 zip (no separate .NET install), **Windows service** (session 0 / LocalSystem, auto-start), console watcher when launched directly, and an optional **\`--tray\`** companion for SCM status / start / stop. ProgramData holds keys and logs. Still positioned as an interim daily driver until a broader client handles this VPN + TLS-stall case again.

**Unknown (stated as such):** why the TV withholds \`ServerHello\` in clustered waves. The portfolio claim stops at measurement + a retry shape that rides the waves — not a root-cause story about webOS internals.`,
    },
    {
      id: "evidence",
      eyebrow: "</ REPOS >",
      heading: "Where to look",
      body: `- [\`lgtv-display-sync\`](https://github.com/nsoto-development/lgtv-display-sync) — utility + \`probe/\` timings; also listed on [\`/apps\`](/apps).
- [Release v0.1.0](https://github.com/nsoto-development/lgtv-display-sync/releases/tag/v0.1.0) — service + tray packaging zip.
- [ColorControl PR #597](https://github.com/Maassoft/ColorControl/pull/597) — directed-broadcast WoL fix (full-standby / VPN harness path).
- [ColorControl](https://github.com/Maassoft/ColorControl) — context for the prior daily driver, not the subject of this rewrite.`,
    },
    {
      id: "learnings",
      eyebrow: "</ TAKEAWAYS >",
      heading: "Two bugs, one symptom",
      bullets: [
        "**Verify the path you think you are on.** A Wireshark capture with no WoL reframed the whole investigation.",
        "**One symptom can hide two defects.** Shipping the WoL PR was still right — just not the daily mouse-wake fix.",
        "**Instrument before you rewrite.** Packet capture plus phased connect timings beat guessing at VPN routing.",
        "**Retry shape is product behavior.** Bursting into a bad TLS wave is different from spaced, short-timeout attempts.",
        "**Say what you proved.** Directed broadcast under VPN is proven; why ServerHello is withheld is not.",
      ],
    },
  ],
  constraints: [
    {
      constraint: "VPN on during the failure",
      implication: "Any fix must work with the tunnel up; “disable VPN” is not a solution",
    },
    {
      constraint: "Isolated Ethernet TV segment",
      implication: "Control stays on a dedicated subnet; internet and TV paths are separate",
    },
    {
      constraint: "Shippable interim without forking ColorControl",
      implication: "Own SSAP transport + retry policy; optional key migrate; package as service/console/tray when ready",
    },
    {
      constraint: "Don’t overclaim ColorControl",
      implication: "PR #597 is a related WoL fix — not the daily control-channel fix",
    },
    {
      constraint: "Upstream PR etiquette",
      implication: "Contribute the proven WoL fix; don’t dump a private rewrite as their roadmap",
    },
  ],
  options: [
    {
      option: "VPN settings only",
      pros: "No code",
      cons: "Topology already broke naive IP exclude; exclusion alone still failed",
      verdict: "Insufficient alone",
    },
    {
      option: "Patch ColorControl only",
      pros: "Helps all ColorControl users on the WoL path",
      cons: "Daily path wasn’t WoL; TLS stall still flaky under burst retries",
      verdict: "Partial — ship WoL PR",
    },
    {
      option: "Purpose-built tool + probe",
      pros: "Own retry policy; instrumentable; DPMS-driven; later packaged (service + tray)",
      cons: "Niche; interim until a broader client catches up",
      verdict: "Chosen",
    },
  ],
};
