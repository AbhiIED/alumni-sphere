import React from "react";
import Navbar from "../component/Navbar"; // Correctly import Navbar with capital N

export default function NewsDetails() {
  // Dummy data – replace this with actual news data when implementing
  const news = {
    image:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?auto=format&fit=crop&w=3603&q=80",
    title: "Boost your conversion rate",
    date: "Mar 16, 2020",
    category: "Marketing",
    content: `
      Conversions are the lifeline of any online business. Optimizing your conversion rate means more customers, better engagement, and ultimately increased revenue.
      
      One of the key strategies is to ensure that your website’s landing page is clear and concise. According to recent research, websites with simplified forms and clear calls-to-action experience up to 35% higher conversion rates.

      Additionally, A/B testing your pages frequently can help identify which headlines, images, or offers resonate best with your audience.

      “Understanding customer behavior through analytics tools allows businesses to create personalized experiences that meet specific user needs,” says marketing expert Jane Doe.

      For further reading, you can check out these resources:
      - <a href="https://www.hubspot.com/conversion-rate-optimization" target="_blank" class="text-blue-600 hover:underline">HubSpot – Conversion Rate Optimization</a>
      - <a href="https://neilpatel.com/what-is-conversion-rate-optimization/" target="_blank" class="text-blue-600 hover:underline">Neil Patel – Guide to CRO</a>

      Implementing these tips consistently can lead to measurable improvements and give you a competitive edge in the market.
    `,
  };

  return (
    <div className="bg-[#Bbdce5] pt-2">
      {/* Navbar */}
      <Navbar />

      {/* News Content */}
      <div className="min-h-screen mt-15">
        {/* News Image */}
        <div className="max-w-4xl mx-auto px-4">
          <img
            src={news.image}
            alt={news.title}
            className="w-full rounded-xl object-cover aspect-[16/9]"
          />
        </div>

        {/* News Details */}
        <div className="max-w-4xl mx-auto mt-6 px-4">
          <div className="flex items-center gap-x-4 text-sm text-gray-500">
            <time dateTime="2020-03-16">{news.date}</time>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 font-medium">
              {news.category}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {news.title}
          </h1>

          <div
            className="mt-4 text-gray-700 space-y-4"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>
      </div>
    </div>
  );
}
