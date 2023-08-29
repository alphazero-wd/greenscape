const testimonials = [
  {
    comment:
      "I couldn't be happier with my experience shopping at this e-commerce website! The process was seamless and easy, and the products arrived quickly and in perfect condition.",
    author: "Sarah Peters, New Orleans",
  },
  {
    comment:
      "I was a little hesitant to try shopping online, but I'm so glad I did! The customer service was fantastic and I was able to find exactly what I was looking for. I highly recommend this site to anyone.",
    author: "Kelly McPherson, Chicago",
  },
  {
    comment:
      "This e-commerce website has become my go-to for all my shopping needs. The prices are great and the quality of the products is outstanding. I highly recommend it to anyone who wants a hassle-free shopping experience.",
    author: "Chris Paul, Phoenix",
  },
];

export const Testimonials = () => {
  return (
    <section className="sm:pt-32 sm:px-6 pt-24 px-4 max-w-7xl container">
      <div className="max-w-2xl lg:max-w-none mx-auto">
        <h2 className="text-gray-900 tracking-tight font-bold text-2xl">
          What are people saying?
        </h2>

        <div className="grid lg:grid-cols-3 lg:gap-x-8 gap-y-8 lg:gap-y-0 mt-16">
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
              <div className="lg:mt-10 lg:ml-0 sm:mt-0 sm:ml-6 mt-8">
                <p className="text-lg text-gray-600">{testimonial.comment}</p>
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
