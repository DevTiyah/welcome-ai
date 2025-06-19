'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MapPin, Search, Star, Phone, Clock, Languages, Heart, Thermometer, Headphones } from 'lucide-react';
import { UserProfile } from '@/app/page';

interface HealthAccessProps {
  userProfile: UserProfile | null;
  onBack: () => void;
}

const clinics = [
  {
    id: 1,
    name: "Community Health Center",
    address: "123 Main St, Downtown",
    distance: "0.8 miles",
    rating: 4.5,
    specialties: ["General Medicine", "Mental Health"],
    languages: ["English", "Spanish", "Arabic"],
    insurance: ["Medicaid", "Uninsured Accepted"],
    phone: "(555) 123-4567",
    hours: "Mon-Fri 8AM-6PM",
    waitTime: "~30 min",
  },
  {
    id: 2,
    name: "St. Mary's Medical Center",
    address: "456 Oak Ave, Midtown",
    distance: "1.2 miles",
    rating: 4.2,
    specialties: ["Emergency", "Cardiology", "Pediatrics"],
    languages: ["English", "French", "German"],
    insurance: ["Most Insurance Accepted"],
    phone: "(555) 987-6543",
    hours: "24/7",
    waitTime: "~45 min",
  },
  {
    id: 3,
    name: "Refugee Health Services",
    address: "789 Pine St, Eastside",
    distance: "2.1 miles",
    rating: 4.8,
    specialties: ["Refugee Care", "Translation Services"],
    languages: ["Multiple Languages"],
    insurance: ["Free Care Available"],
    phone: "(555) 456-7890",
    hours: "Mon-Sat 9AM-5PM",
    waitTime: "~20 min",
  },
];

const symptoms = [
  { id: 'fever', label: 'Fever', icon: Thermometer },
  { id: 'headache', label: 'Headache', icon: Headphones },
  { id: 'chest-pain', label: 'Chest Pain', icon: Heart },
  { id: 'cough', label: 'Cough', icon: Headphones },
];

const commonPhrases = [
  { english: "I need to see a doctor", translation: "Necesito ver a un médico" },
  { english: "I have chest pain", translation: "Tengo dolor en el pecho" },
  { english: "Where is the emergency room?", translation: "¿Dónde está la sala de emergencias?" },
  { english: "I don't speak English well", translation: "No hablo inglés muy bien" },
  { english: "Do you accept my insurance?", translation: "¿Aceptan mi seguro?" },
];

export default function HealthAccess({ userProfile, onBack }: HealthAccessProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState('finder');

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const getSymptomAdvice = () => {
    if (selectedSymptoms.length === 0) return '';
    
    if (selectedSymptoms.includes('chest-pain')) {
      return 'Chest pain can be serious. Consider visiting an emergency room immediately or calling emergency services.';
    }
    
    if (selectedSymptoms.includes('fever') && selectedSymptoms.includes('headache')) {
      return 'Fever with headache may indicate an infection. Consider visiting a general practitioner or urgent care.';
    }
    
    return 'Based on your symptoms, we recommend consulting with a healthcare provider for proper evaluation.';
  };

  const filteredClinics = clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    clinic.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="hover:bg-gray-100">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Health Access</h1>
                  <p className="text-sm text-gray-600">Find care and get health guidance</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-red-100 text-red-700">
              {userProfile?.currentCountry || 'Current Location'}
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="finder">Clinic Finder</TabsTrigger>
            <TabsTrigger value="symptoms">Symptom Checker</TabsTrigger>
            <TabsTrigger value="translate">Medical Phrases</TabsTrigger>
          </TabsList>

          <TabsContent value="finder" className="space-y-6">
            {/* Search */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span>Find Healthcare Providers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by clinic name or specialty..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <Button className="bg-red-500 hover:bg-red-600 text-white px-6">
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Clinic List */}
            <div className="space-y-4">
              {filteredClinics.map((clinic) => (
                <Card key={clinic.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{clinic.name}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{clinic.rating}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{clinic.address} • {clinic.distance}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{clinic.hours} • Wait: {clinic.waitTime}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>{clinic.phone}</span>
                          </div>
                        </div>

                        <div className="mt-3 space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {clinic.specialties.map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="bg-red-100 text-red-700">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Languages className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {clinic.languages.join(', ')}
                            </span>
                          </div>
                          
                          <div className="text-sm text-green-600 font-medium">
                            {clinic.insurance.join(', ')}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 lg:ml-6">
                        <Button className="bg-red-500 hover:bg-red-600 text-white">
                          Call Now
                        </Button>
                        <Button variant="outline">
                          Save Clinic
                        </Button>
                        <Button variant="outline">
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="symptoms" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Thermometer className="w-5 h-5 text-red-600" />
                  <span>Symptom Checker</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-gray-600 mb-4">
                    Select your symptoms to get initial guidance. This is not a substitute for professional medical advice.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {symptoms.map((symptom) => {
                      const Icon = symptom.icon;
                      const isSelected = selectedSymptoms.includes(symptom.id);
                      
                      return (
                        <button
                          key={symptom.id}
                          onClick={() => handleSymptomToggle(symptom.id)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            isSelected
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className={`w-8 h-8 mx-auto mb-2 ${
                            isSelected ? 'text-red-600' : 'text-gray-500'
                          }`} />
                          <p className={`text-sm font-medium ${
                            isSelected ? 'text-red-700' : 'text-gray-700'
                          }`}>
                            {symptom.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedSymptoms.length > 0 && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Recommendation</h4>
                      <p className="text-blue-800">{getSymptomAdvice()}</p>
                      <div className="mt-4 flex space-x-3">
                        <Button className="bg-red-500 hover:bg-red-600 text-white">
                          Find Emergency Care
                        </Button>
                        <Button variant="outline">
                          Find General Care
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="translate" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Languages className="w-5 h-5 text-red-600" />
                  <span>Medical Translation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Common medical phrases translated to help you communicate with healthcare providers.
                </p>
                
                <div className="space-y-4">
                  {commonPhrases.map((phrase, index) => (
                    <Card key={index} className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div>
                            <p className="font-medium text-gray-900">{phrase.english}</p>
                            <p className="text-lg text-blue-600 font-semibold">{phrase.translation}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Headphones className="w-4 h-4 mr-2" />
                            Play Audio
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
                    <p className="text-blue-800 mb-3">
                      Many healthcare facilities offer interpreter services. Don't hesitate to ask!
                    </p>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      Find Interpreter Services
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}