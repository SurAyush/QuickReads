import { Linkedin, Instagram, ScanFace, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="https://github.com/SurAyush/QuickReads" className="text-muted-foreground hover:text-primary">About Project</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://github.com/SurAyush/" className="text-muted-foreground hover:text-primary">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="https://www.linkedin.com/in/ayush-sur-6222b0291/" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="https://huggingface.co/SurAyush" className="text-muted-foreground hover:text-primary">
                <ScanFace className="h-6 w-6" />
              </Link>
              <Link href="https://www.instagram.com/sur.ayush/" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>© 2025 QuickReads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}