"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <title>Page Not Found | Get Levrg</title>
      <meta name="description" content="The page you are looking for does not exist or may have moved." />
      <meta name="robots" content="noindex, nofollow" />
      <Header hideCta />
      <main className="flex-1 pt-16 sm:pt-20 flex items-center justify-center">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-caption text-spark-600 mb-3">404</p>
          <h1 className="text-h1 sm:text-display text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-body text-gray-500 max-w-md mx-auto mb-8">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
          <Button variant="ghost" asChild className="bg-spark-600 hover:bg-spark-800 text-white hover:text-white font-semibold h-11 px-6 rounded-lg">
            <Link href="/video">Back to Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
