import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FileText, Clock, CheckCircle, XCircle, AlertTriangle, ChevronDown, Upload, Download, ExternalLink, Calendar, MessageSquare } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

// Application statuses and their corresponding colors
const statusColors = {
  pending: { bg: 'bg-dark-100', text: 'text-dark-600', icon: Clock },
  reviewing: { bg: 'bg-primary-100', text: 'text-primary-800', icon: FileText },
  interview: { bg: 'bg-secondary-100', text: 'text-secondary-800', icon: Calendar },
  task: { bg: 'bg-warning-100', text: 'text-warning-700', icon: AlertTriangle },
  accepted: { bg: 'bg-success-100', text: 'text-success-700', icon: CheckCircle },
  rejected: { bg: 'bg-error-100', text: 'text-error-700', icon: XCircle },
};

interface Application {
  id: string;
  position: string;
  department: string;
  dateApplied: string;
  status: keyof typeof statusColors;
  lastUpdated: string;
  nextStep?: string;
  feedback?: string;
  task?: {
    description: string;
    dueDate: string;
    submitted: boolean;
  };
}

const mockApplications: Application[] = [
  {
    id: "app1",
    position: "Software Development Intern",
    department: "Technology",
    dateApplied: "2023-06-10",
    status: "interview",
    lastUpdated: "2023-06-15",
    nextStep: "Technical Interview scheduled for June 20, 2023 at 2:00 PM"
  },
  {
    id: "app2",
    position: "Digital Marketing Intern",
    department: "Marketing",
    dateApplied: "2023-06-08",
    status: "task",
    lastUpdated: "2023-06-12",
    task: {
      description: "Create a sample social media campaign for a fictional eco-friendly product",
      dueDate: "2023-06-25",
      submitted: false
    }
  },
  {
    id: "app3",
    position: "UX/UI Designer",
    department: "Design",
    dateApplied: "2023-05-28",
    status: "rejected",
    lastUpdated: "2023-06-05",
    feedback: "Thank you for your interest. While we were impressed with your portfolio, we've decided to move forward with candidates who have more experience with design systems."
  },
  {
    id: "app4",
    position: "Product Manager",
    department: "Technology",
    dateApplied: "2023-06-01",
    status: "reviewing",
    lastUpdated: "2023-06-01"
  }
];

interface Message {
  id: string;
  applicationId: string;
  sender: 'user' | 'company';
  content: string;
  timestamp: string;
  read: boolean;
}

const mockMessages: Message[] = [
  {
    id: "msg1",
    applicationId: "app1",
    sender: "company",
    content: "Hi there! We've reviewed your application and would like to schedule a technical interview. Please let us know your availability for next week.",
    timestamp: "2023-06-15T10:30:00",
    read: true
  },
  {
    id: "msg2",
    applicationId: "app1",
    sender: "user",
    content: "Thank you for considering my application! I'm available on Monday or Wednesday afternoon next week.",
    timestamp: "2023-06-15T14:45:00",
    read: true
  },
  {
    id: "msg3",
    applicationId: "app1",
    sender: "company",
    content: "Great! We've scheduled your interview for Wednesday at 2:00 PM. You'll receive a calendar invite with the meeting details shortly.",
    timestamp: "2023-06-16T09:15:00",
    read: false
  },
  {
    id: "msg4",
    applicationId: "app2",
    sender: "company",
    content: "Hello! As part of our selection process, we'd like you to complete a small task. Please create a sample social media campaign for a fictional eco-friendly product and submit it by June 25.",
    timestamp: "2023-06-12T11:20:00",
    read: true
  }
];

const ApplicationDashboard = () => {
  const [activeTab, setActiveTab] = useState<'applications' | 'messages'>('applications');
  const [expandedApplication, setExpandedApplication] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [applicationMessages, setApplicationMessages] = useState<Message[]>([]);

  const toggleExpandApplication = (id: string) => {
    setExpandedApplication(expandedApplication === id ? null : id);
  };
  
  const handleSelectApplication = (id: string) => {
    setSelectedApplication(id);
    // Filter messages for the selected application
    const messages = mockMessages.filter(msg => msg.applicationId === id);
    setApplicationMessages(messages);
    setActiveTab('messages');
  };

  useEffect(() => {
    document.title = 'Application Dashboard | NexusConsult';
  }, []);

  return (
    <>
      <Helmet>
        <title>Application Dashboard | NexusConsult</title>
        <meta name="description" content="Track your job applications and internship opportunities at NexusConsult." />
      </Helmet>

      {/* Hero Section */}
      <Section bg="gradient" spacing="medium" className="pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
          >
            Application Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-dark-100"
          >
            Track your application status and manage your interactions with our team.
          </motion.p>
        </div>
      </Section>

      {/* Dashboard Section */}
      <Section bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              {/* User Profile Summary */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg mr-3">
                  JD
                </div>
                <div>
                  <h2 className="font-medium text-dark-800">John Doe</h2>
                  <p className="text-dark-500 text-sm">john.doe@example.com</p>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                    activeTab === 'applications'
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-dark-600 hover:bg-dark-50'
                  }`}
                >
                  <FileText className="h-5 w-5 mr-2" />
                  <span>My Applications</span>
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                    activeTab === 'messages'
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-dark-600 hover:bg-dark-50'
                  }`}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span>Messages</span>
                </button>
              </div>
              
              <div className="border-t border-dark-100 my-6 pt-6">
                <Button href="/careers" variant="outline" fullWidth>
                  Browse More Opportunities
                </Button>
              </div>
              
              <div className="text-center mt-4">
                <Button href="/login" variant="ghost" size="sm">
                  Sign Out
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'applications' ? (
              <div>
                <h2 className="text-2xl font-display font-semibold text-dark-800 mb-6">My Applications</h2>
                
                {mockApplications.length === 0 ? (
                  <Card className="text-center p-8">
                    <div className="flex flex-col items-center">
                      <FileText className="h-16 w-16 text-dark-300 mb-4" />
                      <h3 className="text-lg font-medium text-dark-700 mb-2">No Applications Yet</h3>
                      <p className="text-dark-500 mb-6">You haven't submitted any applications yet. Start by exploring our open positions.</p>
                      <Button href="/careers">
                        Browse Opportunities
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {mockApplications.map((application) => (
                      <motion.div
                        key={application.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border border-dark-200 rounded-lg overflow-hidden bg-white shadow-soft"
                      >
                        <div 
                          className="p-4 cursor-pointer hover:bg-dark-50 transition-colors"
                          onClick={() => toggleExpandApplication(application.id)}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <div className="flex items-start">
                              <div className={`p-2 ${statusColors[application.status].bg} rounded-full mr-3`}>
                                {React.createElement(statusColors[application.status].icon, { 
                                  className: `h-5 w-5 ${statusColors[application.status].text}`
                                })}
                              </div>
                              <div>
                                <h3 className="font-medium text-dark-800">{application.position}</h3>
                                <p className="text-dark-500 text-sm">{application.department}</p>
                              </div>
                            </div>
                            <div className="flex items-center mt-2 sm:mt-0">
                              <div className="mr-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[application.status].bg} ${statusColors[application.status].text}`}>
                                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                </span>
                              </div>
                              <ChevronDown className={`h-5 w-5 text-dark-400 transition-transform ${
                                expandedApplication === application.id ? 'rotate-180' : ''
                              }`} />
                            </div>
                          </div>
                        </div>
                        
                        {/* Expanded Application Details */}
                        {expandedApplication === application.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="border-t border-dark-100 p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-sm text-dark-500">Date Applied</p>
                                  <p className="font-medium text-dark-800">{new Date(application.dateApplied).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-dark-500">Last Updated</p>
                                  <p className="font-medium text-dark-800">{new Date(application.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                              </div>
                              
                              {application.nextStep && (
                                <div className="mb-4 p-3 bg-primary-50 rounded-md">
                                  <p className="text-sm font-medium text-primary-800">Next Step</p>
                                  <p className="text-dark-700">{application.nextStep}</p>
                                </div>
                              )}
                              
                              {application.feedback && (
                                <div className="mb-4 p-3 bg-dark-50 rounded-md">
                                  <p className="text-sm font-medium text-dark-700">Feedback</p>
                                  <p className="text-dark-600">{application.feedback}</p>
                                </div>
                              )}
                              
                              {application.task && (
                                <div className="mb-4 p-3 bg-warning-50 border border-warning-100 rounded-md">
                                  <p className="text-sm font-medium text-warning-700 mb-2">Required Task</p>
                                  <p className="text-dark-700 mb-2">{application.task.description}</p>
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm text-dark-500">
                                      Due: {new Date(application.task.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                    {application.task.submitted ? (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-700">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Submitted
                                      </span>
                                    ) : (
                                      <Button size="sm" variant="outline">
                                        <Upload className="h-4 w-4 mr-1" />
                                        Submit Task
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex justify-between mt-4">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  href="#"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download Resume
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleSelectApplication(application.id)}
                                >
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  Messages
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-display font-semibold text-dark-800 mb-6">Messages</h2>
                
                {!selectedApplication ? (
                  <div className="bg-white border border-dark-200 rounded-lg p-4">
                    <p className="text-dark-600 text-center py-8">Please select an application to view messages.</p>
                  </div>
                ) : (
                  <Card>
                    <div className="mb-4 pb-4 border-b border-dark-100">
                      <h3 className="font-medium text-dark-800">
                        {mockApplications.find(app => app.id === selectedApplication)?.position}
                      </h3>
                      <p className="text-dark-500 text-sm">
                        {mockApplications.find(app => app.id === selectedApplication)?.department}
                      </p>
                    </div>
                    
                    <div className="space-y-4 mb-4 max-h-96 overflow-y-auto p-2">
                      {applicationMessages.length === 0 ? (
                        <p className="text-center text-dark-500 py-8">No messages yet for this application.</p>
                      ) : (
                        applicationMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`rounded-lg p-3 max-w-[80%] ${
                                message.sender === 'user' 
                                  ? 'bg-primary-500 text-white' 
                                  : 'bg-dark-50 text-dark-700'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-100' : 'text-dark-400'}`}>
                                {new Date(message.timestamp).toLocaleString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    <div className="border-t border-dark-100 pt-4">
                      <form className="flex">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className="flex-grow px-4 py-2 rounded-l-md border border-dark-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                        <Button type="submit" className="rounded-l-none">
                          Send
                        </Button>
                      </form>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
};

export default ApplicationDashboard;