export function VideoBanner() {
  return (
    <div className="relative aspect-video rounded-3xl overflow-hidden">
      <video
        src="https://cdn.pixabay.com/video/2022/12/20/143728-781098204_large.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8">
        <h2 className="text-3xl md:text-5xl font-black mb-3">عالم بلا حدود</h2>
        <p className="text-lg opacity-90 mb-6 max-w-md">اكتشف ما يمكن أن تصنعه الأدوات الصغيرة عند توظيفها بذكاء.</p>
        <button className="bg-mint-gradient text-primary-foreground px-6 py-3 rounded-xl font-semibold">شاهد المزيد</button>
      </div>
    </div>
  );
}
