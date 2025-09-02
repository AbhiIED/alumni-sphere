import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // install lucide-react if not installed

export default function HomeNews() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#BBDCE5] py-5 sm:py-5 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            News and Updates
          </h2>
        </div>

        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-300 z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        {/* Blog Carousel */}
        <div
          ref={scrollRef}
          className="mt-10 flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-8 justify-center"
        >
          {/* Blog 1 */}
          <article className="flex-none w-80 snap-center flex flex-col items-start justify-between">
            <div className="relative w-full">
              <img
                src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?auto=format&fit=crop&w=3603&q=80"
                alt=""
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover"
              />
            </div>
            <div className="max-w-xl">
              <div className="mt-4 flex items-center gap-x-4 text-xs">
                <time dateTime="2020-03-16" className="text-gray-500">
                  Mar 16, 2020
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  Marketing
                </a>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                Boost your conversion rate
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Illo sint voluptas. Error voluptates culpa eligendi. Hic vel
                totam vitae illo.
              </p>
            </div>
          </article>

          {/* Blog 2 */}
          <article className="flex-none w-80 snap-center flex flex-col items-start justify-between">
            <div className="relative w-full">
              <img
                src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?auto=format&fit=crop&w=3270&q=80"
                alt=""
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover"
              />
            </div>
            <div className="max-w-xl">
              <div className="mt-4 flex items-center gap-x-4 text-xs">
                <time dateTime="2020-03-10" className="text-gray-500">
                  Mar 10, 2020
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  Sales
                </a>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                How to use SEO to drive sales
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Optio cum necessitatibus dolor voluptatum provident commodi.
              </p>
            </div>
          </article>

          {/* Blog 3 */}
          <article className="flex-none w-80 snap-center flex flex-col items-start justify-between">
            <div className="relative w-full">
              <img
                src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=3270&q=80"
                alt=""
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover"
              />
            </div>
            <div className="max-w-xl">
              <div className="mt-4 flex items-center gap-x-4 text-xs">
                <time dateTime="2020-02-12" className="text-gray-500">
                  Feb 12, 2020
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  Business
                </a>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                Improve your customer experience
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Cupiditate maiores ullam eveniet adipisci in doloribus nulla
                minus.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
