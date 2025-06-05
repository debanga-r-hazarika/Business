import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Check, ChevronDown } from 'lucide-react';
import Section from '../components/ui/Section';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isExpanded: boolean;
}

interface InternshipProgram {
  id: string;
  title: string;
  duration: string;
  department: string;
  description: string;
}

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "j1",
      title: "Senior Software Developer",
      department: "Technology",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "We're looking for an experienced software developer to lead the development of innovative solutions for our clients. You'll work with cutting-edge technologies and collaborate with a talented team of professionals.",
      requirements: [
        "5+ years of experience in software development",
        "Proficiency in JavaScript, TypeScript, and React",
        "Experience with Node.js and backend frameworks",
        "Knowledge of CI/CD and cloud platforms",
        "Strong problem-solving skills and attention to detail"
      ],
      isExpanded: false,
    },
    {
      id: "j2",
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Join our marketing team to develop and implement data-driven marketing strategies for our clients. You'll be responsible for creating engaging campaigns across various digital platforms to drive measurable results.",
      requirements: [
        "3+ years of experience in digital marketing",
        "Experience with SEO, SEM, and social media marketing",
        "Knowledge of analytics tools and data interpretation",
        "Excellent communication and project management skills",
        "Creative thinking and problem-solving abilities"
      ],
      isExpanded: false,
    },
    {
      id: "j3",
      title: "UX/UI Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      description: "We're seeking a talented UX/UI designer to create intuitive and visually appealing interfaces for web and mobile applications. You'll work closely with clients and development teams to deliver exceptional user experiences.",
      requirements: [
        "3+ years of experience in UX/UI design",
        "Proficiency in design tools like Figma, Sketch, Adobe XD",
        "Strong portfolio demonstrating user-centered design",
        "Experience with design systems and component libraries",
        "Understanding of accessibility standards and best practices"
      ],
      isExpanded: false,
    },
  ]);

  const internships: InternshipProgram[] = [
    {
      id: "i1",
      title: "Software Development Internship",
      duration: "3-6 months",
      department: "Technology",
      description: "Gain hands-on experience in software development working alongside our experienced team. Learn modern development practices and contribute to real client projects."
    },
    {
      id: "i2",
      title: "Digital Marketing Internship",
      duration: "3-6 months",
      department: "Marketing",
      description: "Develop practical marketing skills by assisting with campaign planning, execution, and analysis. Experience the full marketing lifecycle and learn industry best practices."
    },
    {
      id: "i3",
      title: "Graphic Design Internship",
      duration: "3-6 months",
      department: "Design",
      description: "Build your design portfolio while working on real client projects. Learn about brand identity, visual communication, and design processes in a professional environment."
    }
  ];

  const toggleJobExpansion = (id: string) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, isExpanded: !job.isExpanded } : job
    ));
  };

  useEffect(() => {
    document.title = 'Careers | NexusConsult';
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
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-dark-100 mb-8"
          >
            Be part of a creative, innovative team that's shaping the future of digital consulting.
          </motion.p>
        </div>
      </Section>

      {/* Jobs Section */}
      <Section bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Briefcase className="h-12 w-12 text-primary-500 mb-4" />
              <h2 className="text-2xl font-display font-bold text-dark-800 mb-4">Open Positions</h2>
              <p className="text-dark-600 mb-6">
                We're always looking for talented professionals to join our growing team. Explore our current openings and find your next opportunity.
              </p>
              <Button href="#internships">
                View Internships
              </Button>
            </div>
          </div>
          <div className="lg:col-span-2">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-6"
              >
                <Card className="overflow-hidden">
                  <div
                    className="cursor-pointer"
                    onClick={() => toggleJobExpansion(job.id)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-display font-semibold text-dark-800">
                        {job.title}
                      </h3>
                      <ChevronDown
                        className={`h-5 w-5 text-dark-400 transition-transform ${
                          job.isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {job.department}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-100 text-dark-800">
                        {job.location}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                        {job.type}
                      </span>
                    </div>
                  </div>

                  {job.isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-dark-100"
                    >
                      <p className="text-dark-600 mb-4">{job.description}</p>
                      <h4 className="font-medium text-dark-800 mb-2">Requirements:</h4>
                      <ul className="space-y-2 mb-6">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-primary-500 mr-2 mt-0.5 shrink-0" />
                            <span className="text-dark-600">{req}</span>
                          </li>
                        ))}
                      </ul>
                      <Button href="/contact">
                        Apply Now
                      </Button>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Internships Section */}
      <Section bg="light" id="internships">
        <SectionTitle
          title="Internship Opportunities"
          subtitle="Kickstart your career with hands-on experience and mentorship in a collaborative environment."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {internships.map((internship, index) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card hoverEffect className="h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary-50 rounded-full mr-4">
                    <GraduationCap className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-dark-800">{internship.title}</h3>
                    <p className="text-dark-500">{internship.duration}</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mb-4 self-start">
                  {internship.department}
                </span>
                <p className="text-dark-600 mb-6 flex-grow">{internship.description}</p>
                <Button href="/login" className="mt-auto">
                  Apply Now
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle
            title="Don't See the Perfect Fit?"
            subtitle="We're always looking for talented individuals to join our team. Send us your resume and let us know how you can contribute."
            centered
          />
          <div className="mt-8">
            <Button href="/contact" size="lg">
              Send Open Application
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Careers;