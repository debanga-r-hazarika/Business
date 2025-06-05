import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechInnovate",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "NexusConsult transformed our business with their software solutions. Their team delivered a custom CRM that streamlined our operations and increased efficiency by 40%. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Marketing Director",
    company: "EcoFriendly Co.",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "The marketing strategy developed by NexusConsult helped us reach new audiences and increase our online presence significantly. Their data-driven approach delivered measurable results.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Product Manager",
    company: "HealthPlus",
    image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "Working with NexusConsult on our product redesign was a game-changer. Their design team created an intuitive interface that our users love, resulting in improved retention rates.",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <Section bg="white">
      <SectionTitle
        title="Client Testimonials"
        subtitle="Hear what our clients have to say about working with us."
        centered
      />

      <div className="relative max-w-4xl mx-auto mt-12 overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-white shadow-medium text-dark-700 hover:text-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10">
          <button
            onClick={next}
            className="p-2 rounded-full bg-white shadow-medium text-dark-700 hover:text-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="relative px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[current].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-dark-50 rounded-2xl p-6 md:p-8 shadow-soft"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="shrink-0">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover shadow-medium"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonials[current].rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-dark-300'
                        }`}
                      />
                    ))}
                  </div>
                  <blockquote className="text-dark-700 text-lg mb-4 italic">
                    "{testimonials[current].content}"
                  </blockquote>
                  <div>
                    <h4 className="font-display font-semibold text-dark-800">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-dark-500">
                      {testimonials[current].role}, {testimonials[current].company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === current ? 'bg-primary-500' : 'bg-dark-200'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TestimonialsSection;