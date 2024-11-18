export default function PopularPhotos() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <h2 className="text-center text-xl font-medium lg:text-2xl">
        Foto Populer
      </h2>
      <div className="flex w-full flex-wrap items-center justify-center">
        <img
          src="/gallery/popular/1.png"
          alt="Foto Populer"
          className="h-[254px] w-[171.5px] object-cover lg:h-[412px] lg:w-[320px]"
        />
        <img
          src="/gallery/popular/2.png"
          alt="Foto Populer"
          className="h-[254px] w-[171.5px] object-cover lg:h-[412px] lg:w-[320px]"
        />
        <img
          src="/gallery/popular/3.png"
          alt="Foto Populer"
          className="h-[254px] w-[171.5px] object-cover lg:h-[412px] lg:w-[320px]"
        />
        <img
          src="/gallery/popular/4.png"
          alt="Foto Populer"
          className="h-[254px] w-[171.5px] object-cover lg:h-[412px] lg:w-[320px]"
        />
      </div>
    </div>
  );
}
