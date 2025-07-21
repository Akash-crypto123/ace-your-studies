import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, type } = await req.json();
    
    if (!content) {
      return new Response(
        JSON.stringify({ error: 'Content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare prompt based on content type
    let prompt = '';
    if (type === 'youtube') {
      prompt = `Analyze this YouTube video URL and provide a comprehensive study summary. Extract key concepts, main points, and learning objectives: ${content}`;
    } else if (type === 'notes') {
      prompt = `Analyze these study notes and create a comprehensive summary with key concepts, important points, and main takeaways: ${content}`;
    } else {
      prompt = `Analyze this study material and provide a comprehensive summary with key concepts, important points, and main takeaways: ${content}`;
    }

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to analyze content with Gemini AI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const summary = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No summary generated';

    // Generate flashcards
    const flashcardPrompt = `Based on this content, create 5-7 educational flashcards in JSON format. Each flashcard should have a "front" (question) and "back" (answer). Format as: {"flashcards": [{"front": "question", "back": "answer"}]}. Content: ${summary}`;
    
    const flashcardResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: flashcardPrompt
          }]
        }]
      }),
    });

    let flashcards = [];
    if (flashcardResponse.ok) {
      const flashcardData = await flashcardResponse.json();
      const flashcardText = flashcardData.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      try {
        const parsed = JSON.parse(flashcardText);
        flashcards = parsed.flashcards || [];
      } catch (e) {
        console.log('Failed to parse flashcards:', e);
      }
    }

    // Generate quiz questions
    const quizPrompt = `Based on this content, create 3-5 multiple choice quiz questions in JSON format. Each question should have a "question", "options" array with 4 choices, and "correctAnswer" (0-3 index). Format as: {"questions": [{"question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": 0}]}. Content: ${summary}`;
    
    const quizResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: quizPrompt
          }]
        }]
      }),
    });

    let quizQuestions = [];
    if (quizResponse.ok) {
      const quizData = await quizResponse.json();
      const quizText = quizData.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      try {
        const parsed = JSON.parse(quizText);
        quizQuestions = parsed.questions || [];
      } catch (e) {
        console.log('Failed to parse quiz questions:', e);
      }
    }

    return new Response(
      JSON.stringify({
        summary,
        flashcards,
        quizQuestions,
        originalContent: content,
        contentType: type
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in analyze-content function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});