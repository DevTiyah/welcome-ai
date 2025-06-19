'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  Download,
  Trash2,
  Eye,
  EyeOff,
  Save,
  RefreshCw
} from 'lucide-react';
import { UserProfile } from '@/app/page';

interface SettingsPanelProps {
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

const themes = [
  { id: 'light', name: 'Light', description: 'Clean and bright interface' },
  { id: 'dark', name: 'Dark', description: 'Easy on the eyes' },
  { id: 'auto', name: 'Auto', description: 'Matches your system preference' },
];

export default function SettingsPanel({ isOpen, onClose, userProfile, onProfileUpdate }: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light',
    language: userProfile?.language || 'en',
    notifications: {
      legal: true,
      health: true,
      culture: true,
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      shareData: false,
      analytics: true,
      locationTracking: true
    },
    accessibility: {
      highContrast: false,
      largeText: false,
      reduceMotion: false
    }
  });

  const [profileData, setProfileData] = useState({
    email: 'user@example.com',
    phone: '+1 (555) 123-4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = () => {
    if (userProfile) {
      onProfileUpdate({
        ...userProfile,
        language: settings.language
      });
    }
    // Show success message
    console.log('Profile updated successfully');
  };

  const handleExportData = () => {
    // Mock data export
    const data = {
      profile: userProfile,
      settings: settings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'welcomeai-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Handle account deletion
      console.log('Account deletion requested');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
                <p className="text-sm text-gray-600">Manage your account and preferences</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="hover:bg-gray-100">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-4 mx-6 mt-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto p-6">
                <TabsContent value="profile" className="space-y-6 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-blue-600" />
                        <span>Profile Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="current-country">Current Country</Label>
                          <Select value={userProfile?.currentCountry || ''}>
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
                          <Select value={userProfile?.originCountry || ''}>
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
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="language">Preferred Language</Label>
                        <Select 
                          value={settings.language} 
                          onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}
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

                      <Button onClick={handleSaveProfile} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                        <Save className="w-4 h-4 mr-2" />
                        Save Profile
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="current-password">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showPassword ? 'text' : 'password'}
                            value={profileData.currentPassword}
                            onChange={(e) => setProfileData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type={showPassword ? 'text' : 'password'}
                          value={profileData.newPassword}
                          onChange={(e) => setProfileData(prev => ({ ...prev, newPassword: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type={showPassword ? 'text' : 'password'}
                          value={profileData.confirmPassword}
                          onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        />
                      </div>

                      <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                        Update Password
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Palette className="w-5 h-5 text-purple-600" />
                        <span>Appearance</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Theme</Label>
                        <div className="grid grid-cols-3 gap-3 mt-2">
                          {themes.map((theme) => (
                            <button
                              key={theme.id}
                              onClick={() => setSettings(prev => ({ ...prev, theme: theme.id }))}
                              className={`p-3 rounded-lg border-2 text-left transition-all ${
                                settings.theme === theme.id
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="font-medium text-sm">{theme.name}</div>
                              <div className="text-xs text-gray-600 mt-1">{theme.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Globe className="w-5 h-5 text-green-600" />
                        <span>Localization</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="app-language">App Language</Label>
                        <Select 
                          value={settings.language} 
                          onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}
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
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Accessibility</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">High Contrast</p>
                          <p className="text-sm text-gray-600">Increase contrast for better visibility</p>
                        </div>
                        <Switch
                          checked={settings.accessibility.highContrast}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({ 
                              ...prev, 
                              accessibility: { ...prev.accessibility, highContrast: checked }
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Large Text</p>
                          <p className="text-sm text-gray-600">Increase text size throughout the app</p>
                        </div>
                        <Switch
                          checked={settings.accessibility.largeText}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({ 
                              ...prev, 
                              accessibility: { ...prev.accessibility, largeText: checked }
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Reduce Motion</p>
                          <p className="text-sm text-gray-600">Minimize animations and transitions</p>
                        </div>
                        <Switch
                          checked={settings.accessibility.reduceMotion}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({ 
                              ...prev, 
                              accessibility: { ...prev.accessibility, reduceMotion: checked }
                            }))
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="privacy" className="space-y-6 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-red-600" />
                        <span>Privacy Settings</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Share Usage Data</p>
                          <p className="text-sm text-gray-600">Help improve the app by sharing anonymous usage data</p>
                        </div>
                        <Switch
                          checked={settings.privacy.shareData}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({ 
                              ...prev, 
                              privacy: { ...prev.privacy, shareData: checked }
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Analytics</p>
                          <p className="text-sm text-gray-600">Allow analytics to help us understand app usage</p>
                        </div>
                        <Switch
                          checked={settings.privacy.analytics}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({ 
                              ...prev, 
                              privacy: { ...prev.privacy, analytics: checked }
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Location Tracking</p>
                          <p className="text-sm text-gray-600">Allow location access for finding nearby services</p>
                        </div>
                        <Switch
                          checked={settings.privacy.locationTracking}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({ 
                              ...prev, 
                              privacy: { ...prev.privacy, locationTracking: checked }
                            }))
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Data Management</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button 
                        onClick={handleExportData}
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export My Data
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Clear Cache
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="account" className="space-y-6 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Account Created</p>
                          <p className="font-medium">January 15, 2024</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Last Login</p>
                          <p className="font-medium">Today, 2:30 PM</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Account Type</p>
                          <p className="font-medium">Free</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Data Usage</p>
                          <p className="font-medium">2.3 MB</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        Help Center
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Contact Support
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Report a Bug
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-800 mb-3">
                          Deleting your account will permanently remove all your data, including saved clinics, 
                          chat history, and cultural progress. This action cannot be undone.
                        </p>
                        <Button 
                          onClick={handleDeleteAccount}
                          variant="destructive" 
                          className="w-full"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}