import {Skeleton} from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

// app/dashboard/loading.tsx
export default function Loading({className}:any) {
    return (
        <div className={`flex flex-col justify-center items-center space-y-3 bg-gray-200 ${className}`}>
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
    
}
