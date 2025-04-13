import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "../components/ui/alert"

type AlertProps ={
    errorMessage: string
    }
export function AlertDestructive({ errorMessage }: AlertProps) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {errorMessage}
            </AlertDescription>
        </Alert>
    )
}
