<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Game logic lives in `src/game/` (pure reducer in `state.ts`, story content in `story.ts`, audio store in `audio.ts`, player-uploaded sprites in `customAvatars.ts`); UI lives in `src/components/game/`. Why: keeps rules testable and story content editable without touching UI.
- Avatars render only through `AvatarSprite` (handles single images and horizontal sprite sheets); built-in avatars are CDN `.asset.json` pointers. Why: one place for sprite-sheet frame logic.
- Living-room positions live in `ROOM` in `LivingRoomStage.tsx`; the couch front is re-drawn over the actor via clip-path. Why: makes a seated sprite sink into the cushions instead of floating.
- Sound effects are static MP3s in `public/audio/` played through `playSound()` only. Why: one place enforces the user's SFX toggle and volume.
- Never combine custom text-effect utilities named `text-*` with `cn()`; name them without the `text-` prefix. Why: tailwind-merge treats them as colours and drops the real colour class.
- Offline play uses `vite-plugin-pwa` (generateSW, output in `dist/client`, NetworkFirst for pages); the service worker is registered only from `src/lib/offline.ts`, which refuses dev/iframe/preview hosts and supports `?sw=off`. Why: offline must never serve stale code in the Lovable preview.
- Fonts are self-hosted in `public/fonts` (no Google Fonts link). Why: the game must look right with no internet.
