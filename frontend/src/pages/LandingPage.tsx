import { Hero } from '../components/landing/Hero';
import { Problem } from '../components/landing/Problem';
import { Features } from '../components/landing/Features';
import { UseCases } from '../components/landing/UseCases';
import { HowItWorks } from '../components/landing/HowItWorks';
import { CTA } from '../components/landing/CTA';
import { Footer } from '../components/landing/Footer';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Hero />
            <Problem />
            <Features />
            <UseCases />
            <HowItWorks />
            <CTA />
            <Footer />
        </div>
    );
}
