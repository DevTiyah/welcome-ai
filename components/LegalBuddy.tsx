'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Upload, Phone, Mail, FileText, MessageCircle, Bot, User } from 'lucide-react';
import { UserProfile } from '@/app/page';

interface LegalBuddyProps {
  userProfile: UserProfile | null;
  onBack: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  attachments?: string[];
}

const quickQuestions = [
  "How do I apply for asylum?",
  "What documents do I need for work permit?",
  "How to find legal aid services?",
  "What are my rights during deportation proceedings?",
];

const sampleResponses: Record<string, string> = {
  "How do I apply for asylum?": "To apply for asylum, you need to file Form I-589 within one year of your arrival (with some exceptions). Here's a step-by-step guide:\n\n1. Gather supporting documents\n2. Complete Form I-589\n3. Submit to the appropriate asylum office\n4. Attend your interview\n\nWould you like me to help you find the specific forms for your location?",
  "What documents do I need for work permit?": "For a work permit (Employment Authorization Document), you typically need:\n\n• Form I-765 (Application for Employment Authorization)\n• Supporting documents based on your category\n• Passport-style photos\n• Filing fee or fee waiver request\n\nThe specific requirements depend on your immigration status. What's your current status?",
};

export default function LegalBuddy({ userProfile, onBack }: LegalBuddyProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm your Legal Buddy AI assistant. I'm here to help you navigate legal processes in ${userProfile?.currentCountry || 'your new country'}. You can ask me questions about immigration, asylum, work permits, and more. How can I assist you today?`,
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response = sampleResponses[message] || "I understand you're asking about legal matters. While I can provide general guidance, I recommend consulting with a qualified attorney for specific legal advice. Would you like me to help you find legal aid services in your area?";
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputMessage.trim()) {
        handleSendMessage(inputMessage);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="hover:bg-gray-100">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Legal Buddy</h1>
                  <p className="text-sm text-gray-600">AI Legal Assistant</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Online
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <span>Legal Consultation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className={message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}>
                            {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.sender === 'user'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          <p className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gray-200">
                            <Bot className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-100 rounded-2xl px-4 py-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Questions */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickQuestion(question)}
                        className="text-xs hover:bg-blue-50 hover:border-blue-300"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="px-3">
                    <Upload className="w-4 h-4" />
                  </Button>
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a legal question..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={() => inputMessage.trim() && handleSendMessage(inputMessage)}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Upload */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>Documents</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
                <div className="text-sm text-gray-600">
                  Upload forms, letters, or documents for review and guidance.
                </div>
              </CardContent>
            </Card>

            {/* Legal Resources */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Legal Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <a href="#" className="block text-sm text-blue-600 hover:underline">
                    Free Legal Aid Directory
                  </a>
                  <a href="#" className="block text-sm text-blue-600 hover:underline">
                    Immigration Forms Library
                  </a>
                  <a href="#" className="block text-sm text-blue-600 hover:underline">
                    Know Your Rights Guide
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-red-600">Emergency Legal Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Legal Hotline
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Legal Aid
                </Button>
                <div className="text-xs text-gray-600">
                  Available 24/7 for urgent legal matters
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}