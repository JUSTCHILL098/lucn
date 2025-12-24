export default function Footer() {
  return (
    <footer className="mt-20 text-muted-foreground">
      {/* Top row */}
      <div className="flex justify-between items-center text-sm">
        <span className="font-bold text-white">
          LUNAR
        </span>

        <nav className="flex gap-6 font-normal">
          <span className="hover:text-white transition-colors cursor-pointer">
            Overview
          </span>
          <span className="hover:text-white transition-colors cursor-pointer">
            Features
          </span>
          <span className="hover:text-white transition-colors cursor-pointer">
            Terms
          </span>
        </nav>
      </div>

      {/* Divider line */}
      <div className="my-4">
        <div className="h-px bg-neutral-800 mx-2" />
      </div>

      {/* Bottom row */}
      <div className="text-xs text-center">
        © 2025 name. All rights reserved.
      </div>
    </footer>
  )
}
