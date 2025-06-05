import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  socialLinks: {
    email?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: "tm1",
    name: "David Chen",
    role: "CEO & Founder",
    department: "Leadership",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "David founded NexusConsult with a vision to help businesses leverage technology and creative solutions to achieve their goals. With over 15 years of experience in technology consulting, he leads the company's strategic direction.",
    socialLinks: {
      email: "david@nexusconsult.com",
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/"
    }
  },
  {
    id: "tm2",
    name: "Sarah Johnson",
    role: "CTO",
    department: "Technology",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Sarah oversees the technology department, ensuring our software solutions are innovative, scalable, and built with the highest standards. Her expertise in software architecture and emerging technologies drives our technical excellence.",
    socialLinks: {
      email: "sarah@nexusconsult.com",
      linkedin: "https://linkedin.com/",
      website: "https://sarahjohnson.dev"
    }
  },
  {
    id: "tm3",
    name: "Michael Rodriguez",
    role: "Marketing Director",
    department: "Marketing",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Michael leads our marketing department, developing strategic campaigns that deliver measurable results. His data-driven approach and creative vision help our clients achieve significant growth in their digital presence.",
    socialLinks: {
      email: "michael@nexusconsult.com",
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/"
    }
  },
  {
    id: "tm4",
    name: "Emily Chen",
    role: "Creative Director",
    department: "Design",
    image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Emily directs our design team, bringing brands to life through compelling visual identities and user experiences. Her background in brand strategy and UX/UI design ensures our clients receive designs that are both beautiful and effective.",
    socialLinks: {
      email: "emily@nexusconsult.com",
      linkedin: "https://linkedin.com/",
      website: "https://emilychen.design"
    }
  },
  {
    id: "tm5",
    name: "James Wilson",
    role: "Lead Developer",
    department: "Technology",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "James leads our development team, building robust software solutions that solve complex business challenges. His expertise in full-stack development and DevOps practices ensures our clients receive high-quality, maintainable code.",
    socialLinks: {
      email: "james@nexusconsult.com",
      linkedin: "https://linkedin.com/",
      github: "https://github.com/"
    }
  },
  {
    id: "tm6",
    name: "Sophia Kim",
    role: "UX/UI Designer",
    department: "Design",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Sophia creates intuitive and engaging user experiences that drive results. Her user-centered design approach and attention to detail ensure our digital products are both beautiful and functional.",
    socialLinks: {
      email: "sophia@nexusconsult.com",
      linkedin: "https://linkedin.com/",
      website: "https://sophiakim.design"
    }
  },
  {
    id: "tm7",
    name: "Daniel Martinez",
    role: "SEO Specialist",
    department: "Marketing",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Daniel helps our clients improve their search visibility and drive organic traffic. His deep knowledge of SEO best practices and search algorithms delivers measurable improvements in rankings and conversions.",
    socialLinks: {
      email: "daniel@nexusconsult.com",
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/"
    }
  },
  {
    id: "tm8",
    name: "Olivia Taylor",
    role: "Project Manager",
    department: "Operations",
    image: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Olivia ensures our projects are delivered on time, within scope, and to the highest quality. Her organizational skills and client-focused approach ensure smooth project execution and client satisfaction.",
    socialLinks: {
      email: "olivia@nexusconsult.com",
      linkedin: "https://linkedin.com/"
    }
  }
];

const departments = ["All", "Leadership", "Technology", "Marketing", "Design", "Operations"];

const Team = () => {
  const [activeDepartment, setActiveDepartment] = useState("All");
  
  const filteredMembers = activeDepartment === "All"
    ? teamMembers
    : teamMembers.filter(member => member.department === activeDepartment);

  useEffect(() => {
    document.title = 'Our Team | NexusConsult';
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Team | NexusConsult</title>
        <meta name="description" content="Meet the talented individuals behind NexusConsult who deliver exceptional consulting services." />
      </Helmet>
      
      {/* Hero Section */}
      <Section bg="gradient" spacing="large" className="pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Meet Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-dark-100 mb-8"
          >
            We're a diverse group of passionate experts committed to delivering exceptional results for our clients.
          </motion.p>
        </div>
      </Section>

      {/* Team Members Section */}
      <Section bg="white">
        {/* Department Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {departments.map(department => (
            <button
              key={department}
              onClick={() => setActiveDepartment(department)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeDepartment === department
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-50 text-dark-600 hover:bg-dark-100'
              }`}
            >
              {department}
            </button>
          ))}
        </div>
        
        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group"
            >
              <Card padding="none" className="h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <div className="aspect-[3/4]">
                    <LazyLoadImage
                      src={member.image}
                      alt={member.name}
                      effect="blur"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  {/* Overlay with social links */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex justify-center space-x-3">
                        {member.socialLinks.email && (
                          <a href={`mailto:${member.socialLinks.email}`} className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors" aria-label={`Email ${member.name}`}>
                            <Mail size={18} />
                          </a>
                        )}
                        {member.socialLinks.linkedin && (
                          <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors" aria-label={`${member.name}'s LinkedIn`}>
                            <Linkedin size={18} />
                          </a>
                        )}
                        {member.socialLinks.twitter && (
                          <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors" aria-label={`${member.name}'s Twitter`}>
                            <Twitter size={18} />
                          </a>
                        )}
                        {member.socialLinks.website && (
                          <a href={member.socialLinks.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors" aria-label={`${member.name}'s Website`}>
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Info */}
                <div className="p-4 flex-grow">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full mb-2">
                      {member.department}
                    </span>
                    <h3 className="text-lg font-display font-semibold text-dark-800">{member.name}</h3>
                    <p className="text-primary-600 font-medium text-sm">{member.role}</p>
                  </div>
                  <p className="text-dark-600 text-sm">{member.bio}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Join Our Team CTA */}
      <Section bg="light">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle
            title="Join Our Team"
            subtitle="We're always looking for talented individuals to join our team. Check out our current openings and become part of our success story."
            centered
          />
          <div className="mt-8">
            <Button href="/careers" size="lg">
              View Open Positions
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Team;