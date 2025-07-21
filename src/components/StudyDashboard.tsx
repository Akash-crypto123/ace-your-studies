import { useState } from "react";
import { ArrowLeft, Brain, FileText, Zap, Target, BookOpen, Clock, TrendingUp, Play, RotateCcw, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StudyDashboardProps {
  onBack: () => void;
}

export const StudyDashboard = ({ onBack }: StudyDashboardProps) => {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Mock data - in real app this would come from AI processing
  const studyData = {
    summaries: [
      {
        title: "Introduction to Machine Learning",
        source: "lecture_notes.pdf",
        content: "Machine Learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed...",
        readTime: "3 min",
        keyPoints: ["Supervised Learning", "Unsupervised Learning", "Neural Networks", "Deep Learning"]
      },
      {
        title: "Python Fundamentals",
        source: "YouTube: Python Tutorial",
        content: "Python is a high-level programming language known for its simplicity and readability. Key concepts include variables, data types, functions...",
        readTime: "4 min",
        keyPoints: ["Variables", "Functions", "Loops", "Data Structures"]
      }
    ],
    flashcards: [
      {
        id: 1,
        front: "What is Machine Learning?",
        back: "A subset of AI that enables computers to learn and improve from experience without being explicitly programmed.",
        difficulty: "Easy",
        mastered: false
      },
      {
        id: 2,
        front: "What are the main types of Machine Learning?",
        back: "Supervised Learning, Unsupervised Learning, and Reinforcement Learning.",
        difficulty: "Medium",
        mastered: true
      },
      {
        id: 3,
        front: "What is a Neural Network?",
        back: "A computing system inspired by biological neural networks that learns from data through interconnected nodes (neurons).",
        difficulty: "Hard",
        mastered: false
      }
    ],
    quizzes: [
      {
        title: "Machine Learning Basics",
        questions: 10,
        completed: 7,
        score: 85,
        difficulty: "Beginner",
        timeEstimate: "15 min"
      },
      {
        title: "Python Programming",
        questions: 8,
        completed: 0,
        score: null,
        difficulty: "Intermediate",
        timeEstimate: "12 min"
      }
    ],
    progress: {
      totalTopics: 5,
      masteredTopics: 2,
      weakAreas: ["Neural Networks", "Advanced Python"],
      studyStreak: 7,
      totalStudyTime: "12h 30m"
    }
  };

  const progressPercentage = (studyData.progress.masteredTopics / studyData.progress.totalTopics) * 100;

  const nextFlashcard = () => {
    setIsFlipped(false);
    setCurrentFlashcard((prev) => (prev + 1) % studyData.flashcards.length);
  };

  const prevFlashcard = () => {
    setIsFlipped(false);
    setCurrentFlashcard((prev) => (prev - 1 + studyData.flashcards.length) % studyData.flashcards.length);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-xl font-semibold">Study Dashboard</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline">🔥 {studyData.progress.studyStreak} day streak</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Topics Mastered</p>
                  <p className="text-2xl font-bold">{studyData.progress.masteredTopics}/{studyData.progress.totalTopics}</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
              <Progress value={progressPercentage} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Study Time</p>
                  <p className="text-2xl font-bold">{studyData.progress.totalStudyTime}</p>
                </div>
                <Clock className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Study Streak</p>
                  <p className="text-2xl font-bold">{studyData.progress.studyStreak} days</p>
                </div>
                <TrendingUp className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weak Areas</p>
                  <p className="text-2xl font-bold">{studyData.progress.weakAreas.length}</p>
                </div>
                <Brain className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Study Tools */}
        <Tabs defaultValue="summaries" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summaries" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Summaries
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Flashcards
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Quizzes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summaries" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {studyData.summaries.map((summary, index) => (
                <Card key={index} className="bg-gradient-card border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{summary.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <BookOpen className="h-4 w-4" />
                          {summary.source} • {summary.readTime}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{summary.readTime}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{summary.content}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Key Points:</p>
                      <div className="flex flex-wrap gap-2">
                        {summary.keyPoints.map((point, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {point}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Read Full Summary
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="flashcards" className="mt-6">
            <div className="max-w-2xl mx-auto">
              <div className="mb-6 text-center">
                <p className="text-muted-foreground">
                  Card {currentFlashcard + 1} of {studyData.flashcards.length}
                </p>
                <Progress value={((currentFlashcard + 1) / studyData.flashcards.length) * 100} className="mt-2" />
              </div>

              <Card className="bg-gradient-card border-0 shadow-glow min-h-[300px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                <CardContent className="flex items-center justify-center h-full p-8">
                  <div className="text-center">
                    <div className="mb-4">
                      <Badge variant={
                        studyData.flashcards[currentFlashcard].difficulty === 'Easy' ? 'default' :
                        studyData.flashcards[currentFlashcard].difficulty === 'Medium' ? 'secondary' : 'destructive'
                      }>
                        {studyData.flashcards[currentFlashcard].difficulty}
                      </Badge>
                      {studyData.flashcards[currentFlashcard].mastered && (
                        <Badge variant="outline" className="ml-2">
                          <Check className="h-3 w-3 mr-1" />
                          Mastered
                        </Badge>
                      )}
                    </div>
                    <div className="text-lg leading-relaxed">
                      {isFlipped 
                        ? studyData.flashcards[currentFlashcard].back 
                        : studyData.flashcards[currentFlashcard].front
                      }
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      {isFlipped ? "Answer" : "Click to reveal answer"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between items-center mt-6">
                <Button variant="outline" onClick={prevFlashcard}>
                  Previous
                </Button>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setIsFlipped(!isFlipped)}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button variant="outline" onClick={nextFlashcard}>
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quizzes" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyData.quizzes.map((quiz, index) => (
                <Card key={index} className="bg-gradient-card border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {quiz.questions} questions • {quiz.timeEstimate}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{quiz.difficulty}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{quiz.completed}/{quiz.questions}</span>
                        </div>
                        <Progress value={(quiz.completed / quiz.questions) * 100} />
                      </div>

                      {quiz.score && (
                        <div className="text-center p-3 bg-success/10 rounded-lg">
                          <p className="text-2xl font-bold text-success">{quiz.score}%</p>
                          <p className="text-sm text-muted-foreground">Last Score</p>
                        </div>
                      )}

                      <Button variant={quiz.completed === 0 ? "gradient" : "outline"} className="w-full">
                        <Play className="h-4 w-4 mr-2" />
                        {quiz.completed === 0 ? "Start Quiz" : "Continue Quiz"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Weak Areas Section */}
        <Card className="mt-8 bg-gradient-card border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Areas to Focus On
            </CardTitle>
            <CardDescription>
              AI-identified topics that need more attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studyData.progress.weakAreas.map((area, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span className="font-medium">{area}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Study Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};