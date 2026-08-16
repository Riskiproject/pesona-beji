type HeroDesktopProps = {
  banner: any;
  banners: any[];
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

export default function HeroDesktop({
  banner,
  banners,
  current,
  setCurrent,
}: HeroDesktopProps) {
  return (
    <section className="relative h-[540px] w-full overflow-hidden">
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
      <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-[1200px] items-center px-[70px] pt-[90px]">
        <div className="w-[48%]">
          {/* BADGE */}
          <div className="mb-[18px] inline-block rounded-full bg-[#8BC34A] px-[22px] py-[10px] text-[16px] font-semibold text-white">
            Selamat Datang di
          </div>

          {/* TITLE */}
          <h1 className="m-0 whitespace-nowrap text-[78px] font-extrabold leading-[1] text-[#214E28]">
  {banner.title}
</h1>

          {/* SUBTITLE */}
          <h2 className="mt-[22px] whitespace-pre-line text-[38px] font-bold leading-[1.35] text-[#3D3D3D]">
            {banner.subtitle}
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-[22px] max-w-[520px] text-[18px] leading-[1.8] text-[#555]">
            {banner.description}
          </p>

          {/* BUTTONS */}
          <div className="mt-[20px] flex gap-[18px] translate-y-[-12px]">
            <a href={banner.button1_link}>
              <button className="cursor-pointer rounded-[12px] border-none bg-[#1B5E20] px-[30px] py-[16px] text-[16px] font-bold text-white">
                {banner.button1_text}
              </button>
            </a>

            <a href={banner.button2_link}>
              <button className="cursor-pointer rounded-[12px] border-2 border-[#BCAAA4] bg-white px-[30px] py-[16px] text-[16px] font-bold text-[#5D4037]">
                {banner.button2_text}
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* DOT SLIDER */}
      <div className="absolute bottom-[35px] left-0 z-20 flex w-full justify-center gap-[10px]">
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className="h-[12px] w-[12px] cursor-pointer rounded-full"
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