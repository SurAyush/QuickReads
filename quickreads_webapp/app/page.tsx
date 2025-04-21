import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

function App() {

  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            QuickReads
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* GitHub Card */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-blue-900/20 transition-shadow duration-300 transform hover:translate-y-[-5px] border border-gray-700">
            <div className="flex items-center mb-6">
              <Github className="h-10 w-10 text-blue-400 mr-4" />
              <h2 className="text-2xl font-semibold text-white">GitHub</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Explore our open-source code and contribute to our project.
            </p>
            <a 
              href="https://github.com/SurAyush/QuickReads" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <span>Visit GitHub</span>
              <ExternalLink size={18} className="ml-2" />
            </a>
          </div>
          
          {/* QuickReads Card */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-blue-900/20 transition-shadow duration-300 transform hover:translate-y-[-5px] border border-gray-700">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white mr-4">
                <span className="font-bold">Q</span>
              </div>
              <h2 className="text-2xl font-semibold text-white">QuickReads</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Access our main platform for the latest summarized stories and breaking news.
            </p>
            <a
              href={`./${formattedDate}`} 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <span>Visit QuickReads</span>
              <ExternalLink size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;