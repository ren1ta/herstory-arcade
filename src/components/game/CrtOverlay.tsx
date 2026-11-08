/** Full-screen CRT scanlines, RGB mask and vignette. Never blocks clicks. */
export function CrtOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div className="crt-rgb absolute inset-0" />
      <div className="crt-scanlines absolute inset-0" />
      <div className="crt-vignette absolute inset-0" />
    </div>
  );
}
