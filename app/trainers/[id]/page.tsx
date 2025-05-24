import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getTrainerById } from "@/lib/actions"
import Header from "@/components/header"
import TrainerProfile from "./trainer-profile"
import Footer from "@/components/footer"

interface TrainerPageProps {
  params: {
    id: string
  }
}

export default async function TrainerPage({ params }: TrainerPageProps) {
  const trainer = await getTrainerById(params.id)

  if (!trainer) {
    notFound()
  }

  return (
    <main>
      <Header />
      <div className="pt-20">
        <Suspense fallback={<div className="container mx-auto py-8">Loading trainer profile...</div>}>
          <TrainerProfile trainerId={params.id} initialTrainer={trainer} />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
