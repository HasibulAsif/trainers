export type Trainer = {
  id: string
  name: string
  title: string
  hourly_rate: number
  location: string
  online_available: boolean
  profile_image: string
  rating: number
  review_count: number
  bio?: string
  experience_years?: number
  languages?: string[]
  specializations?: string[]
  certifications?: { name: string; abbreviation: string }[]
  categories?: string[]
  availability?: Availability[]
}

export type Availability = {
  day: string
  slots: string[]
}

export type Category = {
  id: string
  name: string
  slug: string
}

export type Specialization = {
  id: string
  name: string
}

export type Certification = {
  id: string
  name: string
  abbreviation: string
}

export type FilterOptions = {
  search?: string
  category?: string
  hourlyRate?: [number, number]
  specializations?: string[]
  certifications?: string[]
  onlineOnly?: boolean
  sortBy?: "best_match" | "price_low_high" | "price_high_low" | "most_reviews"
}

export type Review = {
  id: string
  trainer_id: string
  client_id: string
  booking_id?: string
  rating: number
  comment: string
  created_at: string
  updated_at?: string
  user_name?: string
  user_image?: string
}

export type Booking = {
  id: string
  trainer_id: string
  user_id: string
  date: string
  time: string
  session_type: "in_person" | "online"
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes?: string
  created_at: string
}

export type Conversation = {
  id: string
  client_id: string
  trainer_id: string
  created_at: string
  updated_at: string
  last_message?: Message
  other_user?: {
    id: string
    name: string
    profile_image: string
    type: "client" | "trainer"
  }
  unread_count?: number
}

export type Message = {
  id: string
  conversation_id: string
  sender_id: string
  sender_type: "client" | "trainer"
  content: string
  read: boolean
  created_at: string
  updated_at: string
}

export type Notification = {
  id: string
  user_id: string
  user_type: "client" | "trainer"
  type: string
  title: string
  message: string
  link?: string
  read: boolean
  created_at: string
}

export type User = {
  id: string
  name: string
  email: string
  profile_image?: string
  type: "client" | "trainer"
}
