const testimonials = [
  {
    comment:
      "I've been purchasing plants from this site for over a year now, and every experience has been fantastic. The plants always arrive healthy and well-packaged, ready to thrive in my home. My indoor garden now includes a beautiful Snake Plant, a vibrant Peace Lily, and a stunning Anthurium, all of which have been easy to care for thanks to the detailed instructions provided. Additionally, the plant care products, like the organic plant fertilizer and soil moisture meter, have made maintaining my plants a breeze. I highly recommend this site to any plant lover!",
    author: "Jessica M., New York NY",
  },
  {
    comment:
      "As a beginner gardener, I was a bit nervous about buying plants online, but this site has made it so easy. The detailed care guides and the wide variety of plants available are amazing. I've purchased everything from a hardy ZZ Plant to a delicate Orchid, and each one has flourished in my home. The care instructions are straightforward, and the plant care products, such as the pest control spray and pruning shears, have been invaluable in keeping my plants healthy and thriving. The customer service is also top-notch, always ready to answer any questions I have.",
    author: "David K., Seattle WA",
  },
  {
    comment:
      "I recently ordered a selection of outdoor plants for my garden, including a Japanese Maple, Black-Eyed Susans, and Sweet Potato Vines. The plants were all in excellent condition when they arrived, and the quality exceeded my expectations. The care guides provided were incredibly helpful, ensuring that I knew exactly how to plant and maintain each species. The plant care products, like the high-quality garden soil and automatic watering system, have been game-changers for my gardening routine. My garden looks beautiful, and I've received numerous compliments from neighbors. This site is my go-to for all my gardening needs!",
    author: "Lisa H., Charlotte NC",
  },
];

export const Testimonials = () => {
  return (
    <section className="sm:py-32 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl container">
        <h2 className="text-foreground tracking-tight font-bold text-2xl">
          What are people saying?
        </h2>

        <div className="grid lg:grid-cols-3 justify-between lg:gap-x-8 gap-y-8 lg:gap-y-0 mt-6">
          {testimonials.map((testimonial) => (
            <blockquote className="lg:block sm:flex" key={testimonial.author}>
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                aria-hidden="true"
                className="text-gray-300 flex-shrink-0"
              >
                <path
                  d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                  fill="currentColor"
                ></path>
              </svg>
              <div className="lg:mt-4 lg:ml-0 sm:mt-0 sm:ml-6 mt-8">
                <p className="text-sm text-secondary-foreground">
                  {testimonial.comment}
                </p>
                <cite className="text-gray-900 font-semibold block mt-4 not-italic">
                  {testimonial.author}
                </cite>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
