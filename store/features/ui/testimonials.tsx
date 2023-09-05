const testimonials = [
  {
    comment:
      "I couldn't be happier with my experience ordering from Greenify. The website is user-friendly and made it easy for me to find the perfect plants for my home. The plants arrived in excellent condition and have truly brightened up my space.",
    author: "Sarah Peters, New Orleans",
  },
  {
    comment:
      "Greenify has transformed my living space into a lush oasis. Their collection of rare and exotic plants is unmatched, and their knowledgeable team is always available to answer any questions I have. Thank you, Greenify, for bringing life and beauty into my home.",
    author: "Kelly McPherson, Chicago",
  },
  {
    comment:
      "I was hesitant to order plants online, but Greenify exceeded my expectations. The selection is impressive, and the customer service is top-notch. I even received a personalized care guide for each plant I ordered, which was incredibly helpful.",
    author: "Chris Paul, Phoenix",
  },
];

export const Testimonials = () => {
  return (
    <section className="sm:pt-32 pt-24">
      <div className="max-w-2xl sm:px-6 px-4 lg:px-8 lg:max-w-7xl container">
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
