import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import Section from '../ui/Section';

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
    image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
    content: "NexusConsult transformed our business with their innovative software solutions. Their team delivered beyond our expectations, creating a system that increased our efficiency by 40%.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Marketing Director",
    company: "GrowthCorp",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
    content: "The marketing strategy developed by NexusConsult helped us reach new audiences and significantly increase our online presence. Their data-driven approach delivered exceptional results.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Product Manager",
    company: "InnovateCo",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
    content: "Working with NexusConsult on our product redesign was exceptional. Their design team created an intuitive interface that our users love, resulting in improved engagement and retention.",
    rating: 5,
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
    <Section bg="white" spacing="large">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-primary-50 text-primary-600 text-sm font-medium rounded-full mb-4">
            Client Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-800 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </motion.div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[current].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8 md:p-12 shadow-soft"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Quote Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-6 lg:mb-0">
                    <Quote className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex justify-center lg:justify-start mb-4">
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
                  
                  <blockquote className="text-lg md:text-xl text-dark-700 mb-6 leading-relaxed">
                    "{testimonials[current].content}"
                  </blockquote>
                </div>

                {/* Client Info */}
                <div className="flex-shrink-0 text-center lg:text-right">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-20 h-20 rounded-full object-cover shadow-medium mx-auto lg:mx-0 mb-4"
                  />
                  <h4 className="font-display font-semibold text-dark-800 text-lg">
                    {testimonials[current].name}
                  </h4>
                  <p className="text-primary-600 font-medium">
                    {testimonials[current].role}
                  </p>
                  <p className="text-dark-500">
                    {testimonials[current].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center mt-8 gap-4">
          <button
            onClick={prev}
            className="p-3 rounded-full bg-white shadow-medium text-dark-700 hover:text-primary-500 hover:shadow-hard transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === current ? 'bg-primary-500 w-8' : 'bg-dark-200 hover:bg-dark-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 rounded-full bg-white shadow-medium text-dark-700 hover:text-primary-500 hover:shadow-hard transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Section>
  );
};

export default TestimonialsSection;