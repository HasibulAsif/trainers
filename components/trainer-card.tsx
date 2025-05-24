import Image from "next/image"
import Link from "next/link"
import { MapPin, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Trainer } from "@/lib/types"

interface TrainerCardProps {
  trainer: Trainer
}

export default function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group relative h-full flex flex-col">
      <div className="absolute inset-x-0 -top-px h-0.5 bg-gradient-to-r from-pink-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

      <div className="relative pt-4 px-4 flex items-center">
        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-md mr-3">
          <Image src={trainer.profile_image || "/placeholder.svg"} alt={trainer.name} fill className="object-cover" />
          {trainer.rating >= 4.8 && (
            <div className="absolute bottom-0 right-0 bg-yellow-500 rounded-full w-4 h-4 flex items-center justify-center border border-white">
              <span className="text-[8px] text-white">✓</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold truncate">{trainer.name}</h3>
          <p className="text-sm text-gray-600 truncate">{trainer.title}</p>
        </div>

        <div className="text-right">
          <div className="text-lg font-bold text-pink-700">${trainer.hourly_rate}/hr</div>
        </div>
      </div>

      <div className="px-4 py-3 flex-1">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span className="truncate">{trainer.location}</span>
          {trainer.online_available && (
            <Badge variant="pink" className="ml-2 text-[10px] py-0 px-1.5">
              Online
            </Badge>
          )}
        </div>

        <div className="flex items-center mb-3">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="ml-1 text-sm font-medium">{trainer.rating}</span>
          <span className="ml-1 text-xs text-gray-500">({trainer.review_count})</span>
        </div>

        {trainer.certifications && trainer.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {trainer.certifications.slice(0, 2).map((cert, index) => (
              <Badge key={index} variant="secondary" className="text-[10px] py-0 px-1.5">
                {cert.abbreviation}
              </Badge>
            ))}
            {trainer.certifications.length > 2 && (
              <Badge variant="secondary" className="text-[10px] py-0 px-1.5">
                +{trainer.certifications.length - 2}
              </Badge>
            )}
          </div>
        )}

        {trainer.specializations && trainer.specializations.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {trainer.specializations.slice(0, 2).map((spec, index) => (
              <Badge key={index} variant="purple" className="text-[10px] py-0 px-1.5">
                {spec}
              </Badge>
            ))}
            {trainer.specializations.length > 2 && (
              <Badge variant="purple" className="text-[10px] py-0 px-1.5">
                +{trainer.specializations.length - 2}
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="px-4 pb-4">
        <Link href={`/trainers/${trainer.id}`}>
          <Button className="w-full bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600 group-hover:shadow-md group-hover:shadow-pink-700/20 transition-all duration-300 text-sm">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  )
}
