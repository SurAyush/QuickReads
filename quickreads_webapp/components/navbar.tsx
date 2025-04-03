import { Newspaper } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NewsletterDialog } from "./NewsLetterDialog";
import { DatePicker } from "./DatePicker";
import DateDisplay from "./DateDisplay";
import Link from "next/link"

export default function Navbar({date}: { date: string|null}) {

    return(
    <div className="flex flex-wrap items-center justify-between mb-8 gap-y-4">
            <div className="flex items-center space-x-2">
                <Newspaper className="h-8 w-8" />
                <Link href="/" className="hidden md:flex" prefetch={false}>
                    <h1 className="text-2xl font-bold">QuickReads</h1>
                </Link>
            </div>
            <div className="flex flex-wrap items-center space-x-4 gap-y-4">
                <DateDisplay date={date}/>
                <DatePicker />
                <ThemeToggle />
                <NewsletterDialog/>
            </div>
    </div>
    )
}
