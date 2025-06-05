import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    file: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, file }));
      setFileName(file.name);
      
      // Clear error if exists
      if (errors.file) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.file;
          return newErrors;
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          file: null,
        });
        setFileName('');
        
        // Reset submission state after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };

  useEffect(() => {
    document.title = 'Contact Us | NexusConsult';
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Section bg="gradient" spacing="large" className="pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-dark-100 mb-8"
          >
            Have a question or ready to start your next project? Reach out to our team.
          </motion.p>
        </div>
      </Section>

      {/* Contact Form & Info */}
      <Section bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-display font-bold text-dark-800 mb-6">Contact Information</h2>
            <p className="text-dark-600 mb-8">
              Feel free to reach out to us with any questions or inquiries. We're here to help!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary-50 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-dark-800 mb-1">Our Office</h3>
                  <p className="text-dark-600">
                    123 Innovation Drive<br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-50 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-dark-800 mb-1">Phone</h3>
                  <p className="text-dark-600">
                    <a href="tel:+14155550123" className="hover:text-primary-500 transition-colors">
                      (415) 555-0123
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-50 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-dark-800 mb-1">Email</h3>
                  <p className="text-dark-600">
                    <a href="mailto:info@nexusconsult.com" className="hover:text-primary-500 transition-colors">
                      info@nexusconsult.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-50 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-dark-800 mb-1">Business Hours</h3>
                  <p className="text-dark-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card elevation="low">
              <h2 className="text-2xl font-display font-bold text-dark-800 mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-success-50 border border-success-100 text-success-700 rounded-lg p-4 mb-6"
                >
                  <p className="font-medium">Thank you for your message!</p>
                  <p>We've received your inquiry and will get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-dark-700 mb-1">
                        Your Name <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.name ? 'border-error-500 ring-1 ring-error-500' : 'border-dark-200'
                        } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-error-500">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-1">
                        Email Address <span className="text-error-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.email ? 'border-error-500 ring-1 ring-error-500' : 'border-dark-200'
                        } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-error-500">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-dark-700 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-dark-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-dark-700 mb-1">
                        Subject <span className="text-error-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.subject ? 'border-error-500 ring-1 ring-error-500' : 'border-dark-200'
                        } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Marketing Services">Marketing Services</option>
                        <option value="Design Services">Design Services</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Career Opportunity">Career Opportunity</option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-error-500">{errors.subject}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-dark-700 mb-1">
                      Your Message <span className="text-error-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.message ? 'border-error-500 ring-1 ring-error-500' : 'border-dark-200'
                      } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-error-500">{errors.message}</p>
                    )}
                  </div>
                  
                  {/* File upload */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-dark-700 mb-1">
                      Attach Files (Optional)
                    </label>
                    <div className="mt-1 flex items-center">
                      <label className="block w-full">
                        <span className="sr-only">Choose file</span>
                        <input 
                          type="file" 
                          className="block w-full text-sm text-dark-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-medium
                            file:bg-primary-50 file:text-primary-700
                            hover:file:bg-primary-100
                            cursor-pointer
                          "
                          onChange={handleFileChange}
                        />
                        {fileName && (
                          <p className="mt-1 text-xs text-dark-500">
                            Selected: {fileName}
                          </p>
                        )}
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-dark-500">
                      Accepted file formats: PDF, DOC, DOCX, JPG, PNG (max 5MB)
                    </p>
                  </div>
                  
                  <div>
                    <Button type="submit" disabled={isSubmitting} className="flex items-center">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Section>

      {/* Interactive Map Section */}
      <Section bg="white" padding="none" className="mt-8">
        <div className="rounded-lg overflow-hidden shadow-medium bg-white">
          <div className="aspect-[16/9] w-full h-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25350.291719233564!2d-122.42153532265532!3d37.77492949696791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858085a79e9635%3A0x7ee1c53c858ae257!2sSoMa%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1686886515120!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy"
              title="NexusConsult Office Location"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-display font-semibold text-dark-800 text-xl mb-2">Visit Our Office</h3>
                <p className="text-dark-600">123 Innovation Drive, San Francisco, CA 94103</p>
              </div>
              <Button href="https://maps.google.com" external variant="outline" className="whitespace-nowrap">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Office Information with Gallery */}
      <Section bg="light">
        <SectionTitle
          title="Our Work Environment"
          subtitle="Take a peek at our modern office space where innovation and collaboration thrive."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="rounded-lg overflow-hidden shadow-medium">
              <img 
                src="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Office Space" 
                className="w-full h-60 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-medium text-dark-800">Modern Workspace</h3>
                <p className="text-dark-500 text-sm">Open-plan office designed for collaboration and creativity.</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="rounded-lg overflow-hidden shadow-medium">
              <img 
                src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Meeting Area" 
                className="w-full h-60 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-medium text-dark-800">Meeting Spaces</h3>
                <p className="text-dark-500 text-sm">Comfortable meeting rooms for client consultations and team discussions.</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="rounded-lg overflow-hidden shadow-medium">
              <img 
                src="https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team Collaboration" 
                className="w-full h-60 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-medium text-dark-800">Collaborative Environment</h3>
                <p className="text-dark-500 text-sm">Our team works together to deliver exceptional results for our clients.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default Contact;