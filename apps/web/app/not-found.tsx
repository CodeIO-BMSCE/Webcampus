export default function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white p-4">
      {/* Desktop Image */}
      <img
        src="/404_notfound.png"
        alt="Page not found"
        className="hidden max-h-full max-w-full object-contain md:block"
      />

      {/* Mobile Image */}
      <img
        src="/404_notfoundmobile.png"
        alt="Page not found"
        className="block max-h-full max-w-full object-contain md:hidden"
      />
    </div>
  );
}
