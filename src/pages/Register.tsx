import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Lock, Mail, Check, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    resume: null as File | null,
    agreeTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFileName, setResumeFileName] = useState('');
  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
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
      setFormData(prev => ({ ...prev, resume: file }));
      setResumeFileName(file.name);
      
      // Clear error if exists
      if (errors.resume) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.resume;
          return newErrors;
        });
      }
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.resume) {
      newErrors.resume = 'Please upload your resume';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };
  
  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      handleNextStep();
      return;
    }
    
    if (validateStep2()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        // Redirect to dashboard after successful registration
        navigate('/application-dashboard');
      }, 1500);
    }
  };

  useEffect(() => {
    document.title = 'Create Account | NexusConsult';
  }, []);

  return (
    <>
      <Helmet>
        <title>Create Account | NexusConsult</title>
        <meta name="description" content="Register for an account to apply for positions and track your applications." />
      </Helmet>
      
      <Section bg="white" className="min-h-screen flex items-center justify-center pt-24 pb-16">
        <div className="w-full max-w-md">
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: step === 1 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <div className="mb-6">
                {/* Progress indicator */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center w-full max-w-xs">
                    <div className="relative flex-1">
                      <div className="h-1 bg-primary-500 rounded-l-full"></div>
                      <div className="absolute -top-2 -left-1">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          'bg-primary-500 text-white'
                        }`}>
                          <Check className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <div className={`h-1 ${step >= 2 ? 'bg-primary-500' : 'bg-dark-200'} rounded-r-full`}></div>
                      <div className="absolute -top-2 -right-1">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          step >= 2 ? 'bg-primary-500 text-white' : 'bg-dark-200 text-white'
                        }`}>
                          {step >= 2 ? <Check className="h-3 w-3" /> : <span className="text-xs">2</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h1 className="text-2xl font-display font-bold text-dark-800 mb-2 text-center">
                  {step === 1 ? 'Create Your Account' : 'Complete Your Profile'}
                </h1>
                <p className="text-dark-500 text-center">
                  {step === 1
                    ? 'Sign up to apply for positions and track your applications'
                    : 'Upload your resume and complete your registration'}
                </p>
              </div>
              
              <form onSubmit={handleSubmit}>
                {step === 1 ? (
                  <>
                    <div className="mb-4">
                      <label htmlFor="name\" className="block text-sm font-medium text-dark-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User className="h-5 w-5 text-dark-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                            errors.name ? 'border-error-500 ring-1 ring-error-500' : 'border-dark-200'
                          } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-error-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="h-5 w-5 text-dark-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                            errors.email ? 'border-error-500 ring-1 ring-error-500' : 'border-dark-200'
                          } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
                          placeholder="you@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-error-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-sm font-medium text-dark-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="h-5 w-5 text-dark-400" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-10 py-2 rounded-lg border ${
                            errors.password ? 'border-error-500 ring-1 ring-error-500' : 'border-dark-200'
                          } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-dark-400 hover:text-dark-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-sm text-error-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.password}
                        </p>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-700 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="h-5 w-5 text-dark-400" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                            errors.confirmPassword ? 'border-error-500 ring-1 ring-error-500' : 'border-dark-200'
                          } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
                          placeholder="••••••••"
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-error-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-6">
                      <label htmlFor="resume" className="block text-sm font-medium text-dark-700 mb-1">
                        Upload Resume/CV
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-dark-200 hover:border-primary-500 transition-colors">
                        <div className="space-y-1 text-center">
                          <svg className="mx-auto h-12 w-12 text-dark-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H8m36-12h-4m4 0H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="flex text-sm text-dark-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                              <span>Upload a file</span>
                              <input 
                                id="file-upload" 
                                name="resume" 
                                type="file" 
                                className="sr-only" 
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-dark-500">PDF, DOC, or DOCX up to 10MB</p>
                          {resumeFileName && (
                            <p className="text-sm text-primary-600 font-medium mt-2">{resumeFileName}</p>
                          )}
                        </div>
                      </div>
                      {errors.resume && (
                        <p className="mt-1 text-sm text-error-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.resume}
                        </p>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="terms"
                            name="agreeTerms"
                            type="checkbox"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-dark-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="terms" className="font-medium text-dark-700">
                            I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms and Conditions</a> and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
                          </label>
                        </div>
                      </div>
                      {errors.agreeTerms && (
                        <p className="mt-1 text-sm text-error-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.agreeTerms}
                        </p>
                      )}
                    </div>
                  </>
                )}
                
                <div className={`flex ${step === 1 ? 'justify-end' : 'justify-between'} mt-6`}>
                  {step === 2 && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      Back
                    </Button>
                  )}
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      step === 1 ? "Continue" : "Create Account"
                    )}
                  </Button>
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-dark-600">
                  Already have an account?
                  <Link to="/login" className="ml-1 font-medium text-primary-600 hover:text-primary-500 focus:outline-none">
                    Log in
                  </Link>
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default Register;