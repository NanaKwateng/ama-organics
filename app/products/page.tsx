import FoodVarietyDetailPage from "@/components/pages/ProductDetails";
import { Suspense } from 'react';

export default function Products() {
    return (
        <div className="w-full">
            {/* The component using useSearchParams must be INSIDE the Suspense tags */}
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center bg-white text-zinc-400 text-xl font-light italic">
                    Loading our organic selection...
                </div>
            }>
                <FoodVarietyDetailPage />
            </Suspense>
        </div>
    );
}