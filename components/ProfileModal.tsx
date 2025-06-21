'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  X, 
  User, 
  Edit3, 
  Save, 
  MapPin, 
  Globe, 
  Calendar,
  Award,
  Target,
  Camera
} from 'lucide-react';
import { UserProfile } from '@/app/page';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  onProfileUpdate: (profile: UserProfile) => void;
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
  'Legal Help', 'Healthcare Support', 'Cultural Tips', 'Language Learning',
  'Employment', 'Housing', 'Education', 'Community Events'
];

export default function ProfileModal({ isOpen, onClose, userProfile, onProfileUpdate }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    language: userProfile?.language || 'en',
    currentCountry: userProfile?.currentCountry || '',
    originCountry: userProfile?.originCountry || '',
    interests: userProfile?.interests || [],
    bio: 'New to the country and eager to learn about local customs and navigate the legal system.',
    joinDate: 'January 2024',
    goals: ['Learn local customs', 'Find healthcare providers', 'Understand legal processes']
  });

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Completed onboarding', earned: true, date: 'Jan 15, 2024' },
    { id: 2, title: 'Legal Explorer', description: 'Asked first legal question', earned: true, date: 'Jan 16, 2024' },
    { id: 3, title: 'Health Seeker', description: 'Found first clinic', earned: true, date: 'Jan 18, 2024' },
    { id: 4, title: 'Culture Enthusiast', description: '7-day learning streak', earned: true, date: 'Jan 22, 2024' },
    { id: 5, title: 'Community Helper', description: 'Helped another user', earned: false, date: null },
    { id: 6, title: 'Expert Navigator', description: '30-day active streak', earned: false, date: null },
  ];

  const stats = [
    { label: 'Days Active', value: '8', icon: Calendar },
    { label: 'Questions Asked', value: '12', icon: Target },
    { label: 'Clinics Saved', value: '3', icon: MapPin },
    { label: 'Cultural Tips', value: '15', icon: Award },
  ];

  const getInitials = (country: string) => {
    return country.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const handleSave = () => {
    if (userProfile) {
      const updatedProfile: UserProfile = {
        language: formData.language,
        currentCountry: formData.currentCountry,
        originCountry: formData.originCountry,
        interests: formData.interests
      };
      onProfileUpdate(updatedProfile);
    }
    setIsEditing(false);
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed inset-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-500 to-teal-500 p-6 text-white">
            <Button 
              variant="ghost" 
              onClick={onClose} 
              className="absolute right-4 top-4 text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-white/20">
                  <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                    {userProfile ? getInitials(userProfile.originCountry) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-blue-600 hover:bg-gray-100"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold">Your Profile</h2>
                <p className="text-blue-100">
                  From {userProfile?.originCountry} • Living in {userProfile?.currentCountry}
                </p>
                <p className="text-blue-100 text-sm mt-1">
                  Member since {formData.joinDate}
                </p>
              </div>
              
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="secondary"
                className="bg-white/20 text-white hover:bg-white/30 border-white/30"
              >
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Profile Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <Card key={index} className="text-center">
                        <CardContent className="p-4">
                          <Icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Profile Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-blue-600" />
                      <span>Profile Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="current-country">Current Country</Label>
                            <Select 
                              value={formData.currentCountry} 
                              onValueChange={(value) => setFormData(prev => ({ ...prev, currentCountry: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
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
                            <Label htmlFor="origin-country">Country of Origin</Label>
                            <Select 
                              value={formData.originCountry} 
                              onValueChange={(value) => setFormData(prev => ({ ...prev, originCountry: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
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

                        <div>
                          <Label htmlFor="language">Preferred Language</Label>
                          <Select 
                            value={formData.language} 
                            onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
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

                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                            placeholder="Tell us about yourself..."
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label>Interests</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {interests.map((interest) => (
                              <button
                                key={interest}
                                onClick={() => handleInterestToggle(interest)}
                                className={`px-3 py-1 rounded-full text-sm transition-all ${
                                  formData.interests.includes(interest)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {interest}
                              </button>
                            ))}
                          </div>
                        </div>

                        <Button onClick={handleSave} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Current Country</p>
                            <p className="font-medium flex items-center">
                              <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                              {formData.currentCountry}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Country of Origin</p>
                            <p className="font-medium flex items-center">
                              <Globe className="w-4 h-4 mr-1 text-green-600" />
                              {formData.originCountry}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-gray-600 text-sm">Bio</p>
                          <p className="text-gray-900">{formData.bio}</p>
                        </div>

                        <div>
                          <p className="text-gray-600 text-sm mb-2">Interests</p>
                          <div className="flex flex-wrap gap-2">
                            {formData.interests.map((interest, index) => (
                              <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Goals */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-green-600" />
                      <span>Current Goals</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {formData.goals.map((goal, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-gray-700">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Achievements Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-yellow-600" />
                      <span>Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-3 rounded-lg border ${
                          achievement.earned
                            ? 'border-yellow-200 bg-yellow-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            achievement.earned ? 'bg-yellow-500' : 'bg-gray-300'
                          }`}>
                            <Award className={`w-5 h-5 ${
                              achievement.earned ? 'text-white' : 'text-gray-500'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium text-sm ${
                              achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                            }`}>
                              {achievement.title}
                            </h4>
                            <p className={`text-xs ${
                              achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                            }`}>
                              {achievement.description}
                            </p>
                            {achievement.earned && achievement.date && (
                              <p className="text-xs text-yellow-600 mt-1">{achievement.date}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}