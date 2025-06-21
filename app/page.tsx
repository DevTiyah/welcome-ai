'use client';

import { useState } from 'react';
import Onboarding from '@/components/Onboarding';
import Dashboard from '@/components/Dashboard';
import LegalBuddy from '@/components/LegalBuddy';
import HealthAccess from '@/components/HealthAccess';
import CultureSync from '@/components/CultureSync';

export type AppView = 'onboarding' | 'dashboard' | 'legal' | 'health' | 'culture';

export interface UserProfile {
  language: string;
  currentCountry: string;
  originCountry: string;
  interests: string[];
}

export default function Home() {
  const [currentView, setCurrentView] = useState<AppView>('onboarding');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentView('dashboard');
  };

  const navigateToView = (view: AppView) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'dashboard':
        return <Dashboard userProfile={userProfile} onNavigate={navigateToView} />;
      case 'legal':
        return <LegalBuddy userProfile={userProfile} onBack={() => setCurrentView('dashboard')} />;
      case 'health':
        return <HealthAccess userProfile={userProfile} onBack={() => setCurrentView('dashboard')} />;
      case 'culture':
        return <CultureSync userProfile={userProfile} onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard userProfile={userProfile} onNavigate={navigateToView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {renderCurrentView()}
    </div>
  );
}