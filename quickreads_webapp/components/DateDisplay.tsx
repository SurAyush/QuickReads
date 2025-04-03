import React from 'react';
import { Calendar } from 'lucide-react';

interface DateDisplayProps {
    date: string | null; // Expected format: "YYYY-MM-DD"
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => {

    let parsedDate : Date = new Date();
    if (date != null) {
        parsedDate = new Date(date);
    }
    const formattedDate = parsedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="flex items-center gap-2 text-gray-700">
        <Calendar className="w-5 h-5" />
        <span className="font-medium">{formattedDate}</span>
        </div>
    );
};

export default DateDisplay;