import { Newspaper } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NewsletterDialog } from "./NewsLetterDialog";
import { DatePicker } from "./DatePicker";

export default function Navbar() {

    return(
    <div className="flex flex-wrap items-center justify-between mb-8 gap-y-4">
            <div className="flex items-center space-x-2">
                <Newspaper className="h-8 w-8" />
                <h1 className="text-2xl font-bold">QuickReads</h1>
            </div>
            <div className="flex flex-wrap items-center space-x-4 gap-y-4">
                <DatePicker />
                <ThemeToggle />
                <NewsletterDialog/>
            </div>
    </div>
    )
}
