'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, Globe, Heart, Scale, Users } from 'lucide-react';
import { UserProfile } from '@/app/page';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ar', name: 'العربية' },
  { code: 'uk', name: 'Українська' },
];

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Spain', 
  'Italy', 'Netherlands', 'Sweden', 'Norway', 'Australia', 'New Zealand'
];

const interests = [
  { id: 'legal', label: 'Legal Help', icon: Scale, description: 'Immigration, asylum, and legal guidance' },
  { id: 'healthcare', label: 'Healthcare Support', icon: Heart, description: 'Find clinics and understand healthcare systems' },
  { id: 'culture', label: 'Cultural Tips', icon: Users, description: 'Learn local customs and social norms' },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    language: '',
    currentCountry: '',
    originCountry: '',
    interests: [] as string[],
  });

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.language;
      case 2:
        return formData.currentCountry && formData.originCountry;
      case 3:
        return formData.interests.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to WelcomeAI</h1>
          <p className="text-xl text-gray-600">Your AI companion for navigating life in a new country</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl">Step {step} of 3</CardTitle>
            <CardDescription className="text-lg">
              {step === 1 && "Let's start with your language preference"}
              {step === 2 && "Tell us about your location"}
              {step === 3 && "What would you like help with?"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Preferred Language
                  </label>
                  <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Select your preferred language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Current Country
                  </label>
                  <Select value={formData.currentCountry} onValueChange={(value) => setFormData(prev => ({ ...prev, currentCountry: value }))}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Where are you currently living?" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Country of Origin
                  </label>
                  <Select value={formData.originCountry} onValueChange={(value) => setFormData(prev => ({ ...prev, originCountry: value }))}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Where are you originally from?" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-700">
                  Select the areas where you'd like assistance (choose at least one):
                </p>
                <div className="grid gap-4">
                  {interests.map((interest) => {
                    const Icon = interest.icon;
                    return (
                      <div
                        key={interest.id}
                        className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                          formData.interests.includes(interest.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInterestToggle(interest.id)}
                      >
                        <Checkbox
                          checked={formData.interests.includes(interest.id)}
                          onChange={() => handleInterestToggle(interest.id)}
                          className="mt-1"
                        />
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`p-2 rounded-lg ${
                            formData.interests.includes(interest.id) ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              formData.interests.includes(interest.id) ? 'text-blue-600' : 'text-gray-600'
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{interest.label}</h3>
                            <p className="text-sm text-gray-600">{interest.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-6">
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {step === 3 ? 'Get Started' : 'Next'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === step ? 'bg-blue-600' : i < step ? 'bg-teal-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}