'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Scale, Heart, Users, ArrowRight, Bell, Settings, Globe } from 'lucide-react';
import { UserProfile, AppView } from '@/app/page';
import NotificationCenter from './NotificationCenter';
import SettingsPanel from './SettingsPanel';
import ProfileModal from './ProfileModal';

interface DashboardProps {
  userProfile: UserProfile | null;
  onNavigate: (view: AppView) => void;
}

const modules = [
  {
    id: 'legal' as AppView,
    title: 'Legal Buddy',
    description: 'Get guidance on immigration, asylum applications, and legal processes',
    icon: Scale,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    features: ['Immigration guidance', 'Document help', 'Lawyer referrals'],
  },
  {
    id: 'health' as AppView,
    title: 'Health Access',
    description: 'Find healthcare providers and understand medical systems',
    icon: Heart,
    color: 'from-red-500 to-pink-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    features: ['Clinic finder', 'Symptom checker', 'Medical translation'],
  },
  {
    id: 'culture' as AppView,
    title: 'CultureSync Coach',
    description: 'Learn local customs and build cultural understanding',
    icon: Users,
    color: 'from-green-500 to-teal-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    features: ['Daily tips', 'Social norms', 'Language help'],
  },
];

export default function Dashboard({ userProfile, onNavigate }: DashboardProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const getInitials = (country: string) => {
    return country.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    // This would typically update the profile in the parent component
    console.log('Profile updated:', updatedProfile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">WelcomeAI</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowNotifications(true)}
                className="relative hover:bg-gray-100"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  2
                </span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSettings(true)}
                className="hover:bg-gray-100"
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar 
                className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                onClick={() => setShowProfile(true)}
              >
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-500 text-white">
                  {userProfile ? getInitials(userProfile.originCountry) : 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {getGreeting()}! Welcome to your new home.
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Here's your personalized dashboard to help you navigate life in {userProfile?.currentCountry}.
          </p>
          
          {userProfile && (
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="px-3 py-1">
                📍 {userProfile.currentCountry}
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                🏠 From {userProfile.originCountry}
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                🌐 {userProfile.language}
              </Badge>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Active Chats</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Scale className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Cultural Streak</p>
                  <p className="text-2xl font-bold">7 days</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Saved Clinics</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {modules.map((module) => {
            const Icon = module.icon;
            const isRelevant = !userProfile || userProfile.interests.includes(module.id);
            
            return (
              <Card 
                key={module.id} 
                className={`group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm ${
                  !isRelevant ? 'opacity-60' : ''
                }`}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {module.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${module.color}`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => onNavigate(module.id)}
                    className={`w-full bg-gradient-to-r ${module.color} hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform group-hover:scale-105`}
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="mt-8 bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions and saved items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Legal consultation about work permits', time: '2 hours ago', type: 'legal' },
                { title: 'Saved St. Mary\'s Medical Center', time: '1 day ago', type: 'health' },
                { title: 'Completed daily cultural tip', time: '1 day ago', type: 'culture' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'legal' ? 'bg-blue-500' :
                    activity.type === 'health' ? 'bg-red-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <NotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
      
      <SettingsPanel 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)}
        userProfile={userProfile}
        onProfileUpdate={handleProfileUpdate}
      />
      
      <ProfileModal 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)}
        userProfile={userProfile}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
}