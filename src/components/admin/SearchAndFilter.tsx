
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download, RefreshCw } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onExport?: () => void;
  onRefresh: () => void;
  placeholder?: string;
}

const SearchAndFilter = ({ 
  searchTerm, 
  onSearchChange, 
  onExport, 
  onRefresh,
  placeholder = "Search..." 
}: SearchAndFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-black border-gray-600 text-white"
        />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onRefresh}
          variant="outline"
          size="sm"
          className="border-gray-600 text-white hover:bg-gray-800"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        {onExport && (
          <Button
            onClick={onExport}
            variant="outline"
            size="sm"
            className="border-gray-600 text-white hover:bg-gray-800"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
