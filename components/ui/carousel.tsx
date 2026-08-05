"use client";

import { cn } from "@/lib/utils";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import type React from "react";
import { createContext, forwardRef, useCallback, useContext } from "react";

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: EmblaOptionsType;
  plugins?: Parameters<typeof useEmblaCarousel>[1];
}

interface CarouselContextType {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0];
  orientation: "vertical" | "horizontal";
}

const CarouselContext = createContext<CarouselContextType | undefined>(undefined);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a Carousel component");
  }
  return context;
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ children, options = {}, plugins = [], className, dir, ...props }, ref) => {
    const orientation = options.axis === "y" ? "vertical" : "horizontal";
    const direction = options.direction ?? (dir as "ltr" | "rtl" | undefined);

    const [emblaRef, emblaApi] = useEmblaCarousel(
      { ...options, axis: orientation === "vertical" ? "y" : "x", direction },
      plugins
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!emblaApi) return;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          emblaApi.scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          emblaApi.scrollNext();
        }
      },
      [emblaApi]
    );

    return (
      <CarouselContext.Provider value={{ emblaRef, orientation }}>
        <div
          ref={ref}
          tabIndex={0}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative w-full focus:outline-hidden", className)}
          dir={direction}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

export const SliderContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { emblaRef, orientation } = useCarousel();

  return (
    <div ref={emblaRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-col" : "flex-row",
          className
        )}
        style={{ touchAction: "pan-y pinch-zoom" }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
});
SliderContainer.displayName = "SliderContainer";

export const Slider = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn("min-w-0 shrink-0 grow-0", className)} {...props}>
      {children}
    </div>
  )
);
Slider.displayName = "Slider";
