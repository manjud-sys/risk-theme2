import { Rocket } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-500 p-4 rounded-full">
            <Rocket className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Welcome to Your App
        </h1>

        <p className="text-lg text-slate-600 mb-8">
          Your Vite + React + TypeScript project is ready to go!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">Fast</h3>
            <p className="text-sm text-slate-600">
              Lightning-fast HMR with Vite
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">Modern</h3>
            <p className="text-sm text-slate-600">
              Built with React 18 & TypeScript
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">Styled</h3>
            <p className="text-sm text-slate-600">
              Tailwind CSS ready to use
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
