import React, { useCallback, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { NextButton, PrevButton, usePrevNextButtons } from "./ArrowButtons";
import ProductCard from "../ProductCard";
import { usePathname } from "next/navigation";
import formattedDateTime from "../(events)/FormattedDateTime";
import EventCard from "../(events)/EventCard";
import ServiceCard from "../ServiceCard";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  const pathname = usePathname();
  const eventsPage = pathname === "/events";
  const productsPage =
    pathname === "/" ||
    pathname === "/cart" ||
    pathname.startsWith("/product");
  const servicesPage = pathname.startsWith("/services");

 useEffect(() => {
   let slideSize = "20%"


   if (productsPage) {
     slideSize
   } else {
     slideSize = "25%"; // Default size
   }

   console.log("Setting slide size to:", slideSize); // Debugging line
   document.documentElement.style.setProperty("--slide-size", slideSize);
 }, [pathname]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => {
            const { date, time } = formattedDateTime(slide, "event");
            return (
              <div className="embla__slide" key={index}>
                {productsPage && (
                  <ProductCard
                    key={index}
                    category={slide.category_name}
                    salePrice={slide.sale_price}
                    globalPrice={slide.global_price}
                    productName={slide.name}
                    href={`/product/${slide._id}`}
                    isThrift={slide.condition}
                    productId={slide._id}
                  />
                )}

                {eventsPage && (
                  <EventCard
                    title={slide.event_name}
                    text={slide.description}
                    date={date}
                    img={"/images/eventP.jpg"}
                    href={`/events/${slide._id}`}
                  />
                )}

                {servicesPage && (
                  <ServiceCard
                    title={slide.service_name}
                    text={slide.description}
                    img={"/images/serviceP.jpg"}
                    location={`${slide.location.address}${", "}${
                      slide.location.city
                    }`}
                    href={`/services/${slide._id}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {slides.length > 5 && (
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default EmblaCarousel;
