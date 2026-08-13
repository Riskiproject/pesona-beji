type HeroMobileProps = {
  banner: any;
  banners: any[];
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

export default function HeroMobile({
  banner,
  banners,
  current,
  setCurrent,
}: HeroMobileProps) {
  return (
    <section className="relative h-[250px] w-full overflow-hidden">
      {/* BACKGROUND */}
      <img
        src={banner.image_url}
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* GRADIENT */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at 15% 35%,
              rgba(255,245,220,0.82) 0%,
              rgba(255,245,220,0.65) 22%,
              rgba(255,245,220,0.40) 42%,
              rgba(255,245,220,0.15) 60%,
              rgba(255,245,220,0) 80%
            ),
            linear-gradient(
              90deg,
              rgba(255,248,235,.60) 0%,
              rgba(255,248,235,.30) 30%,
              rgba(255,248,235,.08) 50%,
              rgba(255,248,235,0) 72%
            )
          `,
        }}
      />

      {/* CONTENT */}
      <div className="absolute inset-0 z-10 px-[18px] pt-[10px]">
        <div className="max-w-[340px]">
          {/* BADGE */}
          <div className="mb-[3px] inline-block rounded-full bg-[#8BC34A] px-[12px] py-[4px] text-[9px] font-semibold text-white">
            Selamat Datang di
          </div>

          {/* TITLE */}
          <h1 className="m-0 break-words text-[27px] font-extrabold leading-[0.95] text-[#214E28]">
            {banner.title}
          </h1>

          {/* SUBTITLE */}
          <h2 className="mt-[4px] whitespace-pre-line text-[13px] font-bold leading-[1.1] text-[#3D3D3D]">
            {banner.subtitle}
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-[4px] line-clamp-2 max-w-[320px] text-[10px] leading-[1.2] text-[#555]">
            {banner.description}
          </p>

          {/* BUTTONS */}
          <div className="mt-[6px] flex flex-nowrap items-center gap-[6px]">
            <a href={banner.button1_link} className="shrink-0">
              <button className="cursor-pointer whitespace-nowrap rounded-[7px] border-none bg-[#1B5E20] px-[12px] py-[6px] text-[10px] font-bold text-white">
                {banner.button1_text}
              </button>
            </a>

            <a href={banner.button2_link} className="shrink-0">
              <button className="cursor-pointer whitespace-nowrap rounded-[7px] border-2 border-[#BCAAA4] bg-white px-[12px] py-[6px] text-[10px] font-bold text-[#5D4037]">
                {banner.button2_text}
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* DOT SLIDER */}
      <div className="absolute bottom-[7px] left-0 z-20 flex w-full justify-center gap-[7px]">
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className="h-[8px] w-[8px] cursor-pointer rounded-full"
            style={{
              background:
                current === index
                  ? "#fff"
                  : "rgba(255,255,255,.5)",
            }}
          />
        ))}
      </div>
    </section>
  );
}