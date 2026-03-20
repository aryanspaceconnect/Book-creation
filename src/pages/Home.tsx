import React, { useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BookOpen, PenTool, Layout, CheckCircle } from 'lucide-react';

export default function Home() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Create Books with <span className="text-zinc-500 dark:text-zinc-400">AI Precision</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          An end-to-end pipeline for brainstorming, writing, editing, and validating your manuscript. Powered by advanced AI models.
        </p>
        
        <div className="pt-8">
          <Button size="lg" onClick={login} className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all">
            Log In / Sign Up with Google
          </Button>
          <p className="mt-4 text-sm text-zinc-500">
            Sign in to save your projects, access the AI brainstorming agent, and use the visual canvas editor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-16">
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <PenTool className="w-8 h-8 mb-4 text-zinc-700 dark:text-zinc-300" />
            <h3 className="text-lg font-semibold mb-2">AI Brainstorming</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Develop ideas, characters, and outlines with an AI that remembers your style and preferences.</p>
          </div>
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <Layout className="w-8 h-8 mb-4 text-zinc-700 dark:text-zinc-300" />
            <h3 className="text-lg font-semibold mb-2">Visual Canvas Editor</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Design your book layout, adjust margins, and place images with a smart visual editor.</p>
          </div>
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CheckCircle className="w-8 h-8 mb-4 text-zinc-700 dark:text-zinc-300" />
            <h3 className="text-lg font-semibold mb-2">Validation Pipeline</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Automated proofreading, grammar checks, and layout validation using Gemini AI.</p>
          </div>
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <BookOpen className="w-8 h-8 mb-4 text-zinc-700 dark:text-zinc-300" />
            <h3 className="text-lg font-semibold mb-2">Research & Compliance</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Instantly research publishing policies (like Amazon KDP) and ensure your book complies.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
