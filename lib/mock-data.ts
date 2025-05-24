import type { Category, Certification, FilterOptions, Specialization, Trainer } from "./types"

// Mock categories
export const mockCategories: Category[] = [
  { id: "1", name: "Weight Training", slug: "weight-training" },
  { id: "2", name: "Cardio", slug: "cardio" },
  { id: "3", name: "Yoga", slug: "yoga" },
  { id: "4", name: "Pilates", slug: "pilates" },
  { id: "5", name: "Nutrition", slug: "nutrition" },
  { id: "6", name: "CrossFit", slug: "crossfit" },
  { id: "7", name: "Martial Arts", slug: "martial-arts" },
  { id: "8", name: "Meditation", slug: "meditation" },
]

// Mock specializations
export const mockSpecializations: Specialization[] = [
  { id: "1", name: "Strength Training" },
  { id: "2", name: "Weight Loss" },
  { id: "3", name: "Muscle Building" },
  { id: "4", name: "Rehabilitation" },
  { id: "5", name: "Sports Performance" },
  { id: "6", name: "Flexibility" },
  { id: "7", name: "Endurance" },
  { id: "8", name: "Bodyweight Training" },
  { id: "9", name: "Functional Training" },
  { id: "10", name: "HIIT" },
]

// Mock certifications
export const mockCertifications: Certification[] = [
  { id: "1", name: "Certified Personal Trainer", abbreviation: "CPT" },
  { id: "2", name: "Certified Strength and Conditioning Specialist", abbreviation: "CSCS" },
  { id: "3", name: "Registered Yoga Teacher", abbreviation: "RYT" },
  { id: "4", name: "Certified Nutrition Coach", abbreviation: "CNC" },
  { id: "5", name: "Certified CrossFit Trainer", abbreviation: "CCT" },
  { id: "6", name: "Certified Group Fitness Instructor", abbreviation: "CGFI" },
  { id: "7", name: "Certified Health Coach", abbreviation: "CHC" },
  { id: "8", name: "Certified Sports Nutritionist", abbreviation: "CSN" },
]

// Mock trainers
export const mockTrainers: Trainer[] = [
  {
    id: "1",
    name: "Tasnim Ahmed",
    title: "Certified Personal Trainer",
    hourly_rate: 50,
    location: "Dhaka, Bangladesh",
    online_available: true,
    profile_image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    review_count: 48,
    bio: "Experienced fitness professional with over 8 years of expertise in strength training and weight management.",
    experience_years: 8,
    languages: ["Bengali", "English"],
    specializations: ["Strength Training", "Weight Loss", "Muscle Building"],
    certifications: [
      { name: "Certified Personal Trainer", abbreviation: "CPT" },
      { name: "Certified Strength and Conditioning Specialist", abbreviation: "CSCS" },
    ],
    categories: ["Weight Training", "Cardio"],
  },
  {
    id: "2",
    name: "Sabrina Khan",
    title: "Yoga Instructor & Nutritionist",
    hourly_rate: 45,
    location: "Chittagong, Bangladesh",
    online_available: true,
    profile_image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    review_count: 36,
    bio: "Passionate yoga instructor and nutritionist dedicated to helping clients achieve holistic wellness.",
    experience_years: 6,
    languages: ["Bengali", "English", "Hindi"],
    specializations: ["Flexibility", "Weight Loss", "Nutrition Planning"],
    certifications: [
      { name: "Registered Yoga Teacher", abbreviation: "RYT" },
      { name: "Certified Nutrition Coach", abbreviation: "CNC" },
    ],
    categories: ["Yoga", "Nutrition"],
  },
  {
    id: "3",
    name: "Rafiq Islam",
    title: "CrossFit Coach",
    hourly_rate: 55,
    location: "Dhaka, Bangladesh",
    online_available: false,
    profile_image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    review_count: 29,
    bio: "Energetic CrossFit coach specializing in high-intensity functional training for all fitness levels.",
    experience_years: 5,
    languages: ["Bengali", "English"],
    specializations: ["CrossFit", "HIIT", "Functional Training"],
    certifications: [
      { name: "Certified CrossFit Trainer", abbreviation: "CCT" },
      { name: "Certified Personal Trainer", abbreviation: "CPT" },
    ],
    categories: ["CrossFit", "Weight Training"],
  },
  {
    id: "4",
    name: "Nadia Hossain",
    title: "Pilates & Rehabilitation Specialist",
    hourly_rate: 60,
    location: "Sylhet, Bangladesh",
    online_available: true,
    profile_image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    review_count: 42,
    bio: "Specialized in Pilates and rehabilitation exercises to help clients recover from injuries and improve posture.",
    experience_years: 10,
    languages: ["Bengali", "English"],
    specializations: ["Pilates", "Rehabilitation", "Flexibility"],
    certifications: [
      { name: "Certified Pilates Instructor", abbreviation: "CPI" },
      { name: "Certified Rehabilitation Specialist", abbreviation: "CRS" },
    ],
    categories: ["Pilates", "Yoga"],
  },
  {
    id: "5",
    name: "Imran Hossain",
    title: "Sports Performance Coach",
    hourly_rate: 65,
    location: "Dhaka, Bangladesh",
    online_available: true,
    profile_image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    review_count: 31,
    bio: "Former athlete turned coach, specializing in sports-specific training to enhance athletic performance.",
    experience_years: 7,
    languages: ["Bengali", "English"],
    specializations: ["Sports Performance", "Strength Training", "Endurance"],
    certifications: [
      { name: "Certified Strength and Conditioning Specialist", abbreviation: "CSCS" },
      { name: "Certified Sports Nutritionist", abbreviation: "CSN" },
    ],
    categories: ["Weight Training", "Cardio"],
  },
  {
    id: "6",
    name: "Fariha Akter",
    title: "Meditation & Mindfulness Coach",
    hourly_rate: 40,
    location: "Rajshahi, Bangladesh",
    online_available: true,
    profile_image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    review_count: 27,
    bio: "Guiding clients to achieve mental clarity and stress reduction through meditation and mindfulness practices.",
    experience_years: 8,
    languages: ["Bengali", "English"],
    specializations: ["Meditation", "Stress Management", "Mindfulness"],
    certifications: [
      { name: "Certified Meditation Instructor", abbreviation: "CMI" },
      { name: "Certified Health Coach", abbreviation: "CHC" },
    ],
    categories: ["Meditation", "Yoga"],
  },
]

// Mock search function
export async function mockSearchTrainers(filters: FilterOptions): Promise<{ trainers: Trainer[]; count: number }> {
  let filteredTrainers = [...mockTrainers]

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredTrainers = filteredTrainers.filter(
      (trainer) =>
        trainer.name.toLowerCase().includes(searchLower) || trainer.title.toLowerCase().includes(searchLower),
    )
  }

  // Apply category filter
  if (filters.category) {
    const category = mockCategories.find((c) => c.slug === filters.category)
    if (category) {
      filteredTrainers = filteredTrainers.filter((trainer) => trainer.categories?.includes(category.name))
    }
  }

  // Apply price range filter
  if (filters.hourlyRate) {
    filteredTrainers = filteredTrainers.filter(
      (trainer) =>
        trainer.hourly_rate >= filters.hourlyRate![0] && trainer.hourly_rate <= filters.hourlyRate![1],
    )
  }

  // Apply specializations filter
  if (filters.specializations && filters.specializations.length > 0) {
    filteredTrainers = filteredTrainers.filter((trainer) =>
      filters.specializations!.some((spec) => trainer.specializations?.includes(spec)),
    )
  }

  // Apply certifications filter
  if (filters.certifications && filters.certifications.length > 0) {
    filteredTrainers = filteredTrainers.filter((trainer) =>
      filters.certifications!.some((cert) =>
        trainer.certifications?.some((trainerCert) => trainerCert.abbreviation === cert),
      ),
    )
  }

  // Apply online only filter
  if (filters.onlineOnly) {
    filteredTrainers = filteredTrainers.filter((trainer) => trainer.online_available)
  }

  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price_low_high":
        filteredTrainers.sort((a, b) => a.hourly_rate - b.hourly_rate)
        break
      case "price_high_low":
        filteredTrainers.sort((a, b) => b.hourly_rate - a.hourly_rate)
        break
      case "most_reviews":
        filteredTrainers.sort((a, b) => b.review_count - a.review_count)
        break
      default:
        filteredTrainers.sort((a, b) => b.rating - a.rating)
    }
  } else {
    filteredTrainers.sort((a, b) => b.rating - a.rating)
  }

  return {
    trainers: filteredTrainers,
    count: filteredTrainers.length,
  }
}
