import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SeverityBadge from '@/components/SeverityBadge';
import api from '@/api/client';
import type { AnalysisHistoryItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';

export default function HistoryPage() {
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'vulnerable' | 'clean'>('all');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/analysis/history').then(r => setHistory(r.data)).finally(() => setLoading(false));
  }, []);

  const filtered = history.filter(h => {
    const matchSearch = h.contract_name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'vulnerable' ? h.is_vulnerable : !h.is_vulnerable);
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Scan History</h1>
            <p className="text-gray-500 text-sm mt-1">{history.length} total scans</p>
          </div>
          <Button onClick={() => navigate('/scan')}>+ New Scan</Button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <Input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search contracts..." className="w-64" />
          {(['all', 'vulnerable', 'clean'] as const).map(f => (
            <Button key={f} variant={filter === f ? 'default' : 'outline'} size="sm" onClick={() => setFilter(f)} className="capitalize">
              {f}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-xl shadow-sm">
            <p className="text-gray-500">No scans match your filter.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Findings</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono">{item.contract_name}</TableCell>
                    <TableCell className="text-gray-500">{new Date(item.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      {item.total_findings > 0
                        ? <span className="text-orange-600 font-medium">{item.total_findings}</span>
                        : <span className="text-green-600 font-medium">0</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {['Critical', 'High'].map(s => (item.severity_counts?.[s] ?? 0) > 0 && (
                          <div key={s} className="flex items-center gap-1">
                            <SeverityBadge severity={s} />
                            <span className="text-gray-900 text-xs font-bold">{item.severity_counts[s]}</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.is_vulnerable ? 'destructive' : 'success'}>
                        {item.is_vulnerable ? 'Vulnerable' : 'Clean'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/report/${item.id}`)}>
                        View →
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
