'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Users, Lightbulb, Flame, Trophy, MessageSquare, Clock, Star } from 'lucide-react';
import { UserProfile } from '@/app/page';

interface CultureSyncProps {
  userProfile: UserProfile | null;
  onBack: () => void;
}

const dailyTips = [
  {
    id: 1,
    title: "Greeting Etiquette",
    content: "In professional settings, a firm handshake and direct eye contact are important. It shows confidence and respect.",
    category: "Social",
    difficulty: "Beginner",
    country: "United States",
  },
  {
    id: 2,
    title: "Public Transportation",
    content: "Offer your seat to elderly, pregnant, or disabled passengers. It's considered polite and shows good citizenship.",
    category: "Daily Life",
    difficulty: "Beginner",
    country: "United States",
  },
  {
    id: 3,
    title: "Restaurant Tipping",
    content: "Standard tip is 18-20% of the bill before tax. You can adjust based on service quality, but 15% is the minimum.",
    category: "Dining",
    difficulty: "Intermediate",
    country: "United States",
  },
];

const situationalHelp = [
  {
    situation: "Job Interview",
    tips: [
      "Arrive 10-15 minutes early",
      "Bring printed copies of your resume",
      "Ask questions about the company",
      "Send a thank-you email within 24 hours"
    ]
  },
  {
    situation: "Grocery Shopping",
    tips: [
      "Bring a quarter for the shopping cart",
      "Bag your own groceries in some stores",
      "Check store hours - many close early on Sundays",
      "Keep receipts for returns"
    ]
  },
  {
    situation: "Meeting Neighbors",
    tips: [
      "A simple wave and smile is often enough",
      "Introduce yourself when moving in",
      "Respect quiet hours (usually after 10 PM)",
      "Offer help during emergencies or bad weather"
    ]
  },
];

const achievements = [
  { id: 1, title: "First Week", description: "Completed 7 daily tips", earned: true },
  { id: 2, title: "Social Butterfly", description: "Learned 10 social customs", earned: true },
  { id: 3, title: "Local Expert", description: "30-day learning streak", earned: false },
  { id: 4, title: "Culture Ambassador", description: "Helped others in community", earned: false },
];

export default function CultureSync({ userProfile, onBack }: CultureSyncProps) {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalTips, setTotalTips] = useState(23);
  const [currentTab, setCurrentTab] = useState('tips');
  const [situationQuery, setSituationQuery] = useState('');
  const [todayTipViewed, setTodayTipViewed] = useState(false);

  const todaysTip = dailyTips[0];
  const progress = Math.min((currentStreak / 30) * 100, 100);

  const handleViewTip = () => {
    if (!todayTipViewed) {
      setTodayTipViewed(true);
      setCurrentStreak(prev => prev + 1);
      setTotalTips(prev => prev + 1);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Social': return 'bg-blue-100 text-blue-700';
      case 'Daily Life': return 'bg-purple-100 text-purple-700';
      case 'Dining': return 'bg-orange-100 text-orange-700';
      case 'Work': return 'bg-teal-100 text-teal-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="hover:bg-gray-100">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">CultureSync Coach</h1>
                  <p className="text-sm text-gray-600">Learn local customs and culture</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-bold text-lg">{currentStreak}</span>
                <span className="text-sm text-gray-600">day streak</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Learning Streak</p>
                  <p className="text-2xl font-bold">{currentStreak} days</p>
                </div>
                <Flame className="w-12 h-12 text-orange-300" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Tips Learned</p>
                  <p className="text-2xl font-bold">{totalTips}</p>
                </div>
                <Lightbulb className="w-12 h-12 text-yellow-300" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Progress to Expert</p>
                  <p className="text-2xl font-bold">{Math.round(progress)}%</p>
                </div>
                <Trophy className="w-12 h-12 text-yellow-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="tips">Daily Tips</TabsTrigger>
            <TabsTrigger value="situations">Situational Help</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="tips" className="space-y-6">
            {/* Today's Tip */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>Today's Cultural Tip</span>
                  {!todayTipViewed && (
                    <Badge className="bg-green-500 text-white">New</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={getCategoryColor(todaysTip.category)}>
                    {todaysTip.category}
                  </Badge>
                  <Badge className={getDifficultyColor(todaysTip.difficulty)}>
                    {todaysTip.difficulty}
                  </Badge>
                  <Badge variant="outline">{todaysTip.country}</Badge>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{todaysTip.title}</h3>
                <p className="text-gray-700 leading-relaxed">{todaysTip.content}</p>
                
                <div className="flex space-x-3 pt-4">
                  <Button 
                    onClick={handleViewTip}
                    className={`${todayTipViewed ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    disabled={todayTipViewed}
                  >
                    {todayTipViewed ? 'Completed' : 'Mark as Read'}
                  </Button>
                  <Button variant="outline">
                    Share Tip
                  </Button>
                  <Button variant="outline">
                    Save for Later
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Previous Tips */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Previous Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyTips.slice(1).map((tip) => (
                    <div key={tip.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge className={getCategoryColor(tip.category)}>
                              {tip.category}
                            </Badge>
                            <Badge className={getDifficultyColor(tip.difficulty)}>
                              {tip.difficulty}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                          <p className="text-sm text-gray-600">{tip.content}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="situations" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  <span>Situational Help</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Input
                    placeholder="Describe your situation or ask a question..."
                    value={situationQuery}
                    onChange={(e) => setSituationQuery(e.target.value)}
                    className="mb-4"
                  />
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    Get Cultural Advice
                  </Button>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Common Situations</h3>
                  {situationalHelp.map((help, index) => (
                    <Card key={index} className="bg-gray-50">
                      <CardContent className="p-6">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
                          <Clock className="w-5 h-5 text-green-600" />
                          <span>{help.situation}</span>
                        </h4>
                        <ul className="space-y-2">
                          {help.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            {/* Progress to Expert */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Your Cultural Learning Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress to Cultural Expert</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-sm text-gray-600 mt-2">
                    {Math.round(30 - currentStreak)} more days to become a cultural expert!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-1">Strengths</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Consistent daily learning</li>
                      <li>• Strong in social customs</li>
                      <li>• Great workplace etiquette</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-1">Areas to Improve</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Dining etiquette</li>
                      <li>• Holiday traditions</li>
                      <li>• Regional differences</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 ${
                        achievement.earned
                          ? 'border-yellow-300 bg-yellow-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.earned ? 'bg-yellow-500' : 'bg-gray-300'
                        }`}>
                          <Trophy className={`w-6 h-6 ${
                            achievement.earned ? 'text-white' : 'text-gray-500'
                          }`} />
                        </div>
                        <div>
                          <h4 className={`font-bold ${
                            achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                          }`}>
                            {achievement.title}
                          </h4>
                          <p className={`text-sm ${
                            achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                          }`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}