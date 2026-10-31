import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RegisterForm } from '@/presentation/components/register-form/register-form'

export function RegisterPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Crear cuenta</CardTitle>
          <CardDescription>
            Registre su empresa para empezar a facturar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  )
}
