import { useState } from "react";
import { Brain, Upload, FileText, Zap, Target, TrendingUp, BookOpen, Video, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UploadSection } from "@/components/UploadSection";
import { StudyDashboard } from "@/components/StudyDashboard";
import { FeatureCard } from "@/components/FeatureCard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'upload' | 'dashboard'>('landing');
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);

  const features = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Smart Summaries",
      description: "AI-powered summaries of your notes and videos in seconds",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Flashcards",
      description: "Generate flashcards automatically from any content",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Smart Quizzes",
      description: "Test your knowledge with AI-generated questions",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Progress Tracking",
      description: "Monitor your learning progress and weak areas",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { label: "Students Helped", value: "10,000+", icon: <Users className="h-5 w-5" /> },
    { label: "Study Hours Saved", value: "50,000+", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Success Rate", value: "94%", icon: <Award className="h-5 w-5" /> }
  ];

  if (currentView === 'upload') {
    return <UploadSection 
      onBack={() => setCurrentView('landing')} 
      onComplete={(results) => {
        setAnalysisResults(results);
        setCurrentView('dashboard');
      }} 
    />;
  }

  if (currentView === 'dashboard') {
    return <StudyDashboard 
      onBack={() => setCurrentView('landing')} 
      analysisResults={analysisResults}
    />;
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">StudyBuddy AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setCurrentView('dashboard')}>
              Dashboard
            </Button>
            <Button variant="gradient" onClick={() => setCurrentView('upload')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-accent text-accent-foreground">
              🚀 Your Personal Learning Buddy
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 bg-gradient-primary bg-clip-text text-transparent">
              AI-Powered Study Assistant
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your notes and videos into summaries, flashcards, and quizzes. 
              Study smarter, not harder with AI that understands how you learn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="gradient" 
                size="xl" 
                onClick={() => setCurrentView('upload')}
                className="animate-scale-in"
              >
                <Upload className="mr-2 h-5 w-5" />
                Start Learning Now
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => setCurrentView('dashboard')}
                className="animate-scale-in"
              >
                <Video className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-gradient-card border-0 shadow-elegant animate-slide-up">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-4 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful AI tools designed to make studying more efficient and effective
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index} 
                {...feature} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How StudyBuddy AI Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to transform your learning experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Content",
                description: "Add your notes, PDFs, or YouTube video links",
                icon: <Upload className="h-8 w-8" />
              },
              {
                step: "02", 
                title: "AI Processing",
                description: "Our AI analyzes and structures your content",
                icon: <Brain className="h-8 w-8" />
              },
              {
                step: "03",
                title: "Study Tools",
                description: "Get summaries, flashcards, and personalized quizzes",
                icon: <Target className="h-8 w-8" />
              }
            ].map((item, index) => (
              <Card key={index} className="text-center bg-gradient-card border-0 shadow-elegant animate-slide-up">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center text-primary-foreground">
                    {item.icon}
                  </div>
                  <div className="text-6xl font-bold text-primary/20 mb-2">{item.step}</div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="bg-gradient-primary border-0 text-primary-foreground shadow-glow">
            <CardContent className="py-16">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Transform Your Study Experience?
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Join thousands of students who are already studying smarter with AI
              </p>
              <Button 
                variant="secondary" 
                size="xl"
                onClick={() => setCurrentView('upload')}
                className="animate-scale-in"
              >
                Start Your Free Trial
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 StudyBuddy AI. Empowering students worldwide.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;