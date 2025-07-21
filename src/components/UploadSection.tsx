import { useState } from "react";
import { ArrowLeft, Upload, FileText, Link, Video, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface UploadSectionProps {
  onBack: () => void;
  onComplete: () => void;
}

export const UploadSection = ({ onBack, onComplete }: UploadSectionProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
      toast({
        title: "Files uploaded successfully!",
        description: `${files.length} file(s) ready for processing.`,
      });
    }
  };

  const handleYouTubeSubmit = () => {
    if (!youtubeUrl.trim()) return;
    
    setUploadedFiles(prev => [...prev, `YouTube: ${youtubeUrl}`]);
    setYoutubeUrl("");
    toast({
      title: "YouTube link added!",
      description: "Video ready for AI processing.",
    });
  };

  const handleNotesSubmit = () => {
    if (!notes.trim()) return;
    
    setUploadedFiles(prev => [...prev, "Text Notes"]);
    setNotes("");
    toast({
      title: "Notes added!",
      description: "Your notes are ready for processing.",
    });
  };

  const processContent = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No content to process",
        description: "Please upload files, add YouTube links, or enter notes first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: "Content processed successfully! ✨",
      description: "Your study materials are ready in the dashboard.",
    });
    
    setIsProcessing(false);
    onComplete();
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
          <h1 className="text-xl font-semibold">Upload Study Materials</h1>
          <div></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Step 1: Upload Content</span>
              <span>Step 2: AI Processing</span>
              <span>Step 3: Study Dashboard</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-gradient-primary h-2 rounded-full transition-all duration-300" style={{ width: '33%' }}></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-card border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-6 w-6" />
                    Add Your Study Materials
                  </CardTitle>
                  <CardDescription>
                    Upload files, paste YouTube links, or add your notes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="files" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="files" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Files
                      </TabsTrigger>
                      <TabsTrigger value="youtube" className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        YouTube
                      </TabsTrigger>
                      <TabsTrigger value="notes" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Notes
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="files" className="space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">Drag and drop your files</h3>
                        <p className="text-muted-foreground mb-4">
                          Support for PDF, DOCX, TXT, and more
                        </p>
                        <Label htmlFor="file-upload">
                          <Button variant="outline" className="cursor-pointer">
                            Choose Files
                          </Button>
                        </Label>
                        <Input
                          id="file-upload"
                          type="file"
                          multiple
                          accept=".pdf,.docx,.txt,.pptx"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="youtube" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="youtube-url">YouTube Video URL</Label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              id="youtube-url"
                              placeholder="https://www.youtube.com/watch?v=..."
                              value={youtubeUrl}
                              onChange={(e) => setYoutubeUrl(e.target.value)}
                            />
                            <Button onClick={handleYouTubeSubmit} disabled={!youtubeUrl.trim()}>
                              Add
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>📺 Add educational videos, lectures, or tutorials</p>
                          <p>🎯 AI will extract key concepts and create study materials</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="notes" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="notes-input">Your Notes</Label>
                          <Textarea
                            id="notes-input"
                            placeholder="Paste your class notes, research, or any text content here..."
                            className="min-h-[200px] mt-1"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                          />
                        </div>
                        <Button onClick={handleNotesSubmit} disabled={!notes.trim()}>
                          Add Notes
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Upload Summary */}
            <div className="space-y-6">
              <Card className="bg-gradient-card border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-lg">Uploaded Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {uploadedFiles.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No content uploaded yet</p>
                    ) : (
                      uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-accent/50 rounded-md">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-sm truncate">{file}</span>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-primary border-0 text-primary-foreground shadow-glow">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Ready to Process?</h3>
                  <p className="text-sm text-primary-foreground/90 mb-4">
                    AI will generate summaries, flashcards, and quizzes from your content.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full" 
                    onClick={processContent}
                    disabled={isProcessing || uploadedFiles.length === 0}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Process Content
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-accent/50 border-0">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">💡 Pro Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Upload multiple files for comprehensive study guides</li>
                    <li>• YouTube lectures work great for video summaries</li>
                    <li>• Mix different content types for better learning</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};