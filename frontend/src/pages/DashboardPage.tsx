import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        
        {/* Header Section */}
        <div className="max-w-3xl text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            SMAI
            <span className="block text-2xl md:text-3xl font-bold text-gray-600 mt-2">
              Smart Contract Security Analyzer
            </span>
          </h1>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            Analyze Solidity smart contracts for security vulnerabilities using static analysis, security knowledge retrieval, and AI-assisted verification.
          </p>
        </div>

        {/* Primary Action */}
        <div className="mb-16 flex flex-col items-center">
          <Button size="lg" onClick={() => navigate('/scan')} className="text-lg font-semibold px-10 py-6 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95">
            Start Security Scan
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Paste your Solidity contract to begin.
          </p>
        </div>

        {/* How it works section */}
        <div className="max-w-4xl w-full">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <Card>
              <CardContent className="p-6">
                <div className="text-blue-600 text-2xl font-bold mb-3">1. Analyze</div>
                <p className="text-sm text-gray-600">Static security analysis checks the contract for known vulnerability patterns.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-blue-600 text-2xl font-bold mb-3">2. Investigate</div>
                <p className="text-sm text-gray-600">Relevant security knowledge is retrieved for detected findings.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-blue-600 text-2xl font-bold mb-3">3. Verify</div>
                <p className="text-sm text-gray-600">AI reviews detected findings when available.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-blue-600 text-2xl font-bold mb-3">4. Report</div>
                <p className="text-sm text-gray-600">SMAI explains the issue, severity, affected code, and recommended action.</p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
