"use server"

import { createServerSupabaseClient } from "./supabase"
import type {
  Category,
  Certification,
  Conversation,
  FilterOptions,
  Message,
  Notification,
  Review,
  Specialization,
  Trainer,
} from "./types"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getCategories(): Promise<Category[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data || []
}

export async function getSpecializations(): Promise<Specialization[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("specializations").select("*").order("name")

  if (error) {
    console.error("Error fetching specializations:", error)
    return []
  }

  return data || []
}

export async function getCertifications(): Promise<Certification[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("certifications").select("*").order("name")

  if (error) {
    console.error("Error fetching certifications:", error)
    return []
  }

  return data || []
}

export async function searchTrainers(filters: FilterOptions): Promise<{ trainers: Trainer[]; count: number }> {
  const supabase = createServerSupabaseClient()

  let query = supabase.from("trainers").select(
    `
    *,
    trainer_specializations (
      specializations (id, name)
    ),
    trainer_certifications (
      certifications (id, name, abbreviation)
    ),
    trainer_categories (
      categories (id, name, slug)
    )
  `,
    { count: "exact" },
  )

  // Apply filters
  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,title.ilike.%${filters.search}%`)
  }

  if (filters.category) {
    query = query.eq("trainer_categories.categories.slug", filters.category)
  }

  if (filters.hourlyRate) {
    query = query.gte("hourly_rate", filters.hourlyRate[0]).lte("hourly_rate", filters.hourlyRate[1])
  }

  if (filters.onlineOnly) {
    query = query.eq("online_available", true)
  }

  if (filters.specializations && filters.specializations.length > 0) {
    query = query.in("trainer_specializations.specializations.name", filters.specializations)
  }

  if (filters.certifications && filters.certifications.length > 0) {
    query = query.in("trainer_certifications.certifications.abbreviation", filters.certifications)
  }

  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price_low_high":
        query = query.order("hourly_rate", { ascending: true })
        break
      case "price_high_low":
        query = query.order("hourly_rate", { ascending: false })
        break
      case "most_reviews":
        query = query.order("review_count", { ascending: false })
        break
      default:
        query = query.order("rating", { ascending: false })
    }
  } else {
    query = query.order("rating", { ascending: false })
  }

  const { data, error, count } = await query

  if (error) {
    console.error("Error searching trainers:", error)
    return { trainers: [], count: 0 }
  }

  // Process the data to format it correctly
  const processedTrainers = data.reduce((acc: Trainer[], current: any) => {
    const existingTrainer = acc.find((t) => t.id === current.id)

    if (existingTrainer) {
      // Add specialization if it exists and doesn't already exist in the array
      if (current.trainer_specializations && current.trainer_specializations.length > 0) {
        current.trainer_specializations.forEach((ts: any) => {
          if (ts.specializations && !existingTrainer.specializations?.includes(ts.specializations.name)) {
            existingTrainer.specializations?.push(ts.specializations.name)
          }
        })
      }

      // Add certification if it exists and doesn't already exist in the array
      if (current.trainer_certifications && current.trainer_certifications.length > 0) {
        current.trainer_certifications.forEach((tc: any) => {
          if (tc.certifications) {
            const existingCert = existingTrainer.certifications?.find(
              (c) => c.abbreviation === tc.certifications.abbreviation,
            )
            if (!existingCert) {
              existingTrainer.certifications?.push({
                name: tc.certifications.name,
                abbreviation: tc.certifications.abbreviation,
              })
            }
          }
        })
      }

      // Add category if it exists and doesn't already exist in the array
      if (current.trainer_categories && current.trainer_categories.length > 0) {
        current.trainer_categories.forEach((tc: any) => {
          if (tc.categories && !existingTrainer.categories?.includes(tc.categories.name)) {
            existingTrainer.categories?.push(tc.categories.name)
          }
        })
      }

      return acc
    } else {
      // Create a new trainer object with safe defaults for arrays
      const specializations: string[] = []
      const certifications: { name: string; abbreviation: string }[] = []
      const categories: string[] = []

      // Safely add specializations
      if (current.trainer_specializations && current.trainer_specializations.length > 0) {
        current.trainer_specializations.forEach((ts: any) => {
          if (ts.specializations) {
            specializations.push(ts.specializations.name)
          }
        })
      }

      // Safely add certifications
      if (current.trainer_certifications && current.trainer_certifications.length > 0) {
        current.trainer_certifications.forEach((tc: any) => {
          if (tc.certifications) {
            certifications.push({
              name: tc.certifications.name,
              abbreviation: tc.certifications.abbreviation,
            })
          }
        })
      }

      // Safely add categories
      if (current.trainer_categories && current.trainer_categories.length > 0) {
        current.trainer_categories.forEach((tc: any) => {
          if (tc.categories) {
            categories.push(tc.categories.name)
          }
        })
      }

      const trainer: Trainer = {
        id: current.id,
        name: current.name,
        title: current.title,
        hourly_rate: current.hourly_rate,
        location: current.location,
        online_available: current.online_available,
        profile_image: current.profile_image,
        rating: current.rating,
        review_count: current.review_count,
        specializations: specializations,
        certifications: certifications,
        categories: categories,
      }

      acc.push(trainer)
      return acc
    }
  }, [])

  return {
    trainers: processedTrainers,
    count: count || 0,
  }
}

export async function getTrainerById(id: string): Promise<Trainer | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("trainers")
    .select(`
      *,
      trainer_specializations (
        specializations (id, name)
      ),
      trainer_certifications (
        certifications (id, name, abbreviation)
      ),
      trainer_categories (
        categories (id, name, slug)
      )
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching trainer:", error)
    return null
  }

  if (!data) return null

  // Process the data to format it correctly
  const specializations: string[] = []
  const certifications: { name: string; abbreviation: string }[] = []
  const categories: string[] = []

  // Safely add specializations
  if (data.trainer_specializations && data.trainer_specializations.length > 0) {
    data.trainer_specializations.forEach((ts: any) => {
      if (ts.specializations) {
        specializations.push(ts.specializations.name)
      }
    })
  }

  // Safely add certifications
  if (data.trainer_certifications && data.trainer_certifications.length > 0) {
    data.trainer_certifications.forEach((tc: any) => {
      if (tc.certifications) {
        certifications.push({
          name: tc.certifications.name,
          abbreviation: tc.certifications.abbreviation,
        })
      }
    })
  }

  // Safely add categories
  if (data.trainer_categories && data.trainer_categories.length > 0) {
    data.trainer_categories.forEach((tc: any) => {
      if (tc.categories) {
        categories.push(tc.categories.name)
      }
    })
  }

  const trainer: Trainer = {
    id: data.id,
    name: data.name,
    title: data.title,
    hourly_rate: data.hourly_rate,
    location: data.location,
    online_available: data.online_available,
    profile_image: data.profile_image,
    rating: data.rating,
    review_count: data.review_count,
    bio:
      data.bio ||
      "Experienced fitness professional dedicated to helping clients achieve their health and wellness goals through personalized training programs.",
    experience_years: data.experience_years || Math.floor(Math.random() * 10) + 3, // Random 3-12 years if not provided
    languages: data.languages || ["Bengali", "English"],
    specializations,
    certifications,
    categories,
  }

  return trainer
}

export async function getTrainerReviews(trainerId: string): Promise<Review[]> {
  const supabase = createServerSupabaseClient()

  // Try to get real reviews from the database
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("trainer_id", trainerId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching reviews:", error)
    // Fall back to mock data if there's an error
    return getMockReviews(trainerId)
  }

  if (data && data.length > 0) {
    // Map the data to include user_name and user_image
    // In a real app, you would join with the users table
    return data.map((review: any) => ({
      ...review,
      user_name: `Client ${review.client_id.substring(0, 4)}`,
      user_image: "/placeholder.svg?height=50&width=50",
    }))
  }

  // Fall back to mock data if no reviews found
  return getMockReviews(trainerId)
}

// Helper function to get mock reviews
function getMockReviews(trainerId: string): Review[] {
  const mockReviews: Review[] = [
    {
      id: "1",
      trainer_id: trainerId,
      client_id: "client-1",
      user_name: "Tasnim Ahmed",
      user_image: "/placeholder.svg?height=50&width=50",
      rating: 5,
      comment: "Amazing trainer! Very knowledgeable and patient. I've seen great results in just a few weeks.",
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    },
    {
      id: "2",
      trainer_id: trainerId,
      client_id: "client-2",
      user_name: "Rafiq Islam",
      user_image: "/placeholder.svg?height=50&width=50",
      rating: 4,
      comment: "Great sessions, very professional. Would recommend to anyone looking to improve their fitness.",
      created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    },
    {
      id: "3",
      trainer_id: trainerId,
      client_id: "client-3",
      user_name: "Sabrina Khan",
      user_image: "/placeholder.svg?height=50&width=50",
      rating: 5,
      comment: "Excellent trainer who really understands how to customize workouts to your specific needs and goals.",
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    },
    {
      id: "4",
      trainer_id: trainerId,
      client_id: "client-4",
      user_name: "Imran Hossain",
      user_image: "/placeholder.svg?height=50&width=50",
      rating: 5,
      comment: "I've tried several trainers before, but this one is by far the best. Very attentive and motivating.",
      created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
    },
    {
      id: "5",
      trainer_id: trainerId,
      client_id: "client-5",
      user_name: "Fariha Akter",
      user_image: "/placeholder.svg?height=50&width=50",
      rating: 4,
      comment: "Great communication and very flexible with scheduling. The workouts are challenging but effective.",
      created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
    },
  ]

  return mockReviews
}

export async function getSimilarTrainers(trainerId: string, categoryNames: string[]): Promise<Trainer[]> {
  const supabase = createServerSupabaseClient()

  // Get category IDs from names
  const { data: categoryData } = await supabase.from("categories").select("id").in("name", categoryNames)

  if (!categoryData || categoryData.length === 0) {
    return []
  }

  const categoryIds = categoryData.map((cat) => cat.id)

  // Get trainers in the same categories, excluding the current trainer
  const { data, error } = await supabase
    .from("trainers")
    .select(`
      *,
      trainer_categories!inner (
        category_id,
        categories (name)
      )
    `)
    .neq("id", trainerId)
    .in("trainer_categories.category_id", categoryIds)
    .order("rating", { ascending: false })
    .limit(4)

  if (error || !data) {
    console.error("Error fetching similar trainers:", error)
    return []
  }

  // Process the data
  const processedTrainers: Trainer[] = data.map((trainer) => ({
    id: trainer.id,
    name: trainer.name,
    title: trainer.title,
    hourly_rate: trainer.hourly_rate,
    location: trainer.location,
    online_available: trainer.online_available,
    profile_image: trainer.profile_image,
    rating: trainer.rating,
    review_count: trainer.review_count,
    categories: trainer.trainer_categories.map((tc: any) => tc.categories.name),
  }))

  return processedTrainers
}

export async function bookSession(formData: FormData) {
  // This is a mock function since we don't have a bookings table yet
  // In a real application, you would insert this into the database

  // Simulate server processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const trainerId = formData.get("trainerId") as string
  const date = formData.get("date") as string
  const time = formData.get("time") as string
  const sessionType = formData.get("sessionType") as string
  const notes = formData.get("notes") as string

  console.log("Booking session:", { trainerId, date, time, sessionType, notes })

  return {
    success: true,
    message: "Session booked successfully! The trainer will contact you shortly to confirm.",
    bookingId: Math.random().toString(36).substring(2, 10).toUpperCase(),
  }
}

export async function contactTrainer(formData: FormData) {
  // This is a mock function since we don't have a messages table yet
  // In a real application, you would insert this into the database

  // Simulate server processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const trainerId = formData.get("trainerId") as string
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  console.log("Contacting trainer:", { trainerId, name, email, message })

  return {
    success: true,
    message: "Message sent successfully! The trainer will get back to you soon.",
  }
}

// New functions for messaging, reviews, and notifications

export async function getConversations(userId: string, userType: "client" | "trainer"): Promise<Conversation[]> {
  const supabase = createServerSupabaseClient()

  // Determine which field to query based on user type
  const userField = userType === "client" ? "client_id" : "trainer_id"
  const otherUserField = userType === "client" ? "trainer_id" : "client_id"
  const otherUserType = userType === "client" ? "trainer" : "client"

  // Get conversations
  const { data, error } = await supabase
    .from("conversations")
    .select(`
      *,
      messages!messages_conversation_id_fkey (
        id,
        content,
        sender_id,
        sender_type,
        read,
        created_at
      )
    `)
    .eq(userField, userId)
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Error fetching conversations:", error)
    return []
  }

  if (!data || data.length === 0) {
    return []
  }

  // Process conversations to include last message and unread count
  const processedConversations: Conversation[] = await Promise.all(
    data.map(async (conv) => {
      // Get the other user's info (in a real app, you would join with the users table)
      // For now, we'll use mock data
      const otherUserId = conv[otherUserField]
      let otherUser = {
        id: otherUserId,
        name: `${otherUserType.charAt(0).toUpperCase() + otherUserType.slice(1)} ${otherUserId.substring(0, 4)}`,
        profile_image: "/placeholder.svg?height=50&width=50",
        type: otherUserType,
      }

      // If the other user is a trainer, try to get their real info
      if (otherUserType === "trainer") {
        const trainer = await getTrainerById(otherUserId)
        if (trainer) {
          otherUser = {
            id: trainer.id,
            name: trainer.name,
            profile_image: trainer.profile_image,
            type: "trainer",
          }
        }
      }

      // Sort messages by created_at
      const messages = conv.messages || []
      messages.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      // Get the last message
      const lastMessage = messages.length > 0 ? messages[0] : undefined

      // Count unread messages
      const unreadCount = messages.filter(
        (msg: any) => msg.sender_id !== userId && msg.sender_type !== userType && !msg.read,
      ).length

      return {
        id: conv.id,
        client_id: conv.client_id,
        trainer_id: conv.trainer_id,
        created_at: conv.created_at,
        updated_at: conv.updated_at,
        last_message: lastMessage,
        other_user: otherUser,
        unread_count: unreadCount,
      }
    }),
  )

  return processedConversations
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching messages:", error)
    return []
  }

  return data || []
}

export async function sendMessage(
  conversationId: string,
  senderId: string,
  senderType: "client" | "trainer",
  content: string,
): Promise<Message | null> {
  const supabase = createServerSupabaseClient()

  // Create the message
  const { data: messageData, error: messageError } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      sender_type: senderType,
      content,
      read: false,
    })
    .select()
    .single()

  if (messageError) {
    console.error("Error sending message:", messageError)
    return null
  }

  // Update the conversation's updated_at timestamp
  const { error: conversationError } = await supabase
    .from("conversations")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", conversationId)

  if (conversationError) {
    console.error("Error updating conversation:", conversationError)
  }

  return messageData
}

export async function createConversation(
  clientId: string,
  trainerId: string,
  initialMessage: string,
): Promise<{ conversation: Conversation | null; message: Message | null }> {
  const supabase = createServerSupabaseClient()

  // Check if a conversation already exists
  const { data: existingConv, error: checkError } = await supabase
    .from("conversations")
    .select("*")
    .eq("client_id", clientId)
    .eq("trainer_id", trainerId)
    .single()

  if (checkError && checkError.code !== "PGRST116") {
    // PGRST116 is the error code for "no rows returned"
    console.error("Error checking for existing conversation:", checkError)
    return { conversation: null, message: null }
  }

  let conversationId: string

  if (existingConv) {
    // Use existing conversation
    conversationId = existingConv.id
  } else {
    // Create a new conversation
    const { data: newConv, error: createError } = await supabase
      .from("conversations")
      .insert({
        client_id: clientId,
        trainer_id: trainerId,
      })
      .select()
      .single()

    if (createError) {
      console.error("Error creating conversation:", createError)
      return { conversation: null, message: null }
    }

    conversationId = newConv.id
  }

  // Send the initial message
  const message = await sendMessage(conversationId, clientId, "client", initialMessage)

  // Get the updated conversation
  const { data: updatedConv, error: getError } = await supabase
    .from("conversations")
    .select("*")
    .eq("id", conversationId)
    .single()

  if (getError) {
    console.error("Error getting updated conversation:", getError)
    return { conversation: null, message }
  }

  // Get the trainer info
  const trainer = await getTrainerById(trainerId)

  const conversation: Conversation = {
    ...updatedConv,
    last_message: message,
    other_user: {
      id: trainer?.id || trainerId,
      name: trainer?.name || `Trainer ${trainerId.substring(0, 4)}`,
      profile_image: trainer?.profile_image || "/placeholder.svg?height=50&width=50",
      type: "trainer",
    },
    unread_count: 0,
  }

  return { conversation, message }
}

export async function markMessagesAsRead(conversationId: string, userId: string): Promise<void> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase
    .from("messages")
    .update({ read: true })
    .eq("conversation_id", conversationId)
    .neq("sender_id", userId)
    .eq("read", false)

  if (error) {
    console.error("Error marking messages as read:", error)
  }
}

export async function getNotifications(userId: string, userType: "client" | "trainer"): Promise<Notification[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .eq("user_type", userType)
    .order("created_at", { ascending: false })
    .limit(20)

  if (error) {
    console.error("Error fetching notifications:", error)
    return []
  }

  return data || []
}

export async function markNotificationAsRead(notificationId: string): Promise<void> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("notifications").update({ read: true }).eq("id", notificationId)

  if (error) {
    console.error("Error marking notification as read:", error)
  }
}

export async function markAllNotificationsAsRead(userId: string, userType: "client" | "trainer"): Promise<void> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("user_id", userId)
    .eq("user_type", userType)
    .eq("read", false)

  if (error) {
    console.error("Error marking all notifications as read:", error)
  }
}

export async function createNotification(
  userId: string,
  userType: "client" | "trainer",
  type: string,
  title: string,
  message: string,
  link?: string,
): Promise<Notification | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("notifications")
    .insert({
      user_id: userId,
      user_type: userType,
      type,
      title,
      message,
      link,
      read: false,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating notification:", error)
    return null
  }

  return data
}

export async function submitReview(formData: FormData): Promise<{ success: boolean; message: string }> {
  const supabase = createServerSupabaseClient()

  const trainerId = formData.get("trainerId") as string
  const clientId = formData.get("clientId") as string
  const bookingId = formData.get("bookingId") as string
  const rating = Number.parseInt(formData.get("rating") as string)
  const comment = formData.get("comment") as string

  if (!trainerId || !clientId || !rating) {
    return {
      success: false,
      message: "Missing required fields",
    }
  }

  // Insert the review
  const { error } = await supabase.from("reviews").insert({
    trainer_id: trainerId,
    client_id: clientId,
    booking_id: bookingId || null,
    rating,
    comment,
  })

  if (error) {
    console.error("Error submitting review:", error)
    return {
      success: false,
      message: "Failed to submit review. Please try again.",
    }
  }

  // Update the trainer's rating and review count
  // In a real app, you would use a database trigger or function for this
  // For now, we'll manually update it
  const { data: trainerData, error: trainerError } = await supabase
    .from("trainers")
    .select("rating, review_count")
    .eq("id", trainerId)
    .single()

  if (trainerError) {
    console.error("Error fetching trainer data:", trainerError)
    return {
      success: true,
      message: "Review submitted successfully, but trainer stats couldn't be updated.",
    }
  }

  // Calculate new rating
  const currentRating = trainerData.rating || 0
  const reviewCount = trainerData.review_count || 0
  const newReviewCount = reviewCount + 1
  const newRating = (currentRating * reviewCount + rating) / newReviewCount

  // Update trainer
  const { error: updateError } = await supabase
    .from("trainers")
    .update({
      rating: newRating,
      review_count: newReviewCount,
    })
    .eq("id", trainerId)

  if (updateError) {
    console.error("Error updating trainer stats:", updateError)
  }

  // Create a notification for the trainer
  await createNotification(
    trainerId,
    "trainer",
    "review",
    "New Review",
    `You received a ${rating}-star review!`,
    `/trainer/reviews`,
  )

  return {
    success: true,
    message: "Review submitted successfully!",
  }
}

export async function createClientRequest(data: {
  title: string
  description: string
  budget: number
  deadline: string
  categoryId: string
}) {
  const supabase = createClient()

  const { data: session, error: sessionError } = await supabase.auth.getSession()
  if (sessionError || !session.session) {
    throw new Error("Not authenticated")
  }

  const userId = session.session.user.id

  const { error } = await supabase.from("client_requests").insert({
    client_id: userId,
    title: data.title,
    description: data.description,
    budget: data.budget,
    deadline: data.deadline,
    category_id: data.categoryId,
    status: "open",
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/client/requests")
}

export async function submitBid(data: {
  requestId: string
  planType: string
  price: number
  deliveryTime: number
  message: string
}) {
  const supabase = createClient()

  const { data: session, error: sessionError } = await supabase.auth.getSession()
  if (sessionError || !session.session) {
    throw new Error("Not authenticated")
  }

  const trainerId = session.session.user.id

  const { error } = await supabase.from("trainer_bids").insert({
    trainer_id: trainerId,
    request_id: data.requestId,
    plan_type: data.planType,
    price: data.price,
    delivery_time: data.deliveryTime,
    message: data.message,
    status: "pending",
  })

  if (error) {
    throw new Error(error.message)
  }

  // Create notification for client
  const { data: requestData } = await supabase
    .from("client_requests")
    .select("client_id, title")
    .eq("id", data.requestId)
    .single()

  if (requestData) {
    await supabase.from("notifications").insert({
      user_id: requestData.client_id,
      title: "New bid received",
      content: `A trainer has submitted a bid for your request: ${requestData.title}`,
      type: "bid",
      reference_id: data.requestId,
    })
  }

  revalidatePath("/trainer/requests")
}

export async function createServicePlan(data: {
  basic: {
    title: string
    description: string
    price: string
    deliveryTime: string
    features: string
  }
  standard: {
    title: string
    description: string
    price: string
    deliveryTime: string
    features: string
  }
  premium: {
    title: string
    description: string
    price: string
    deliveryTime: string
    features: string
  }
}) {
  const supabase = createClient()

  const { data: session, error: sessionError } = await supabase.auth.getSession()
  if (sessionError || !session.session) {
    throw new Error("Not authenticated")
  }

  const trainerId = session.session.user.id

  // Check if trainer already has service plans
  const { data: existingPlans } = await supabase.from("service_plans").select("id").eq("trainer_id", trainerId).single()

  const plansData = {
    trainer_id: trainerId,
    basic_title: data.basic.title,
    basic_description: data.basic.description,
    basic_price: Number.parseFloat(data.basic.price),
    basic_delivery_time: Number.parseInt(data.basic.deliveryTime),
    basic_features: data.basic.features,
    standard_title: data.standard.title,
    standard_description: data.standard.description,
    standard_price: Number.parseFloat(data.standard.price),
    standard_delivery_time: Number.parseInt(data.standard.deliveryTime),
    standard_features: data.standard.features,
    premium_title: data.premium.title,
    premium_description: data.premium.description,
    premium_price: Number.parseFloat(data.premium.price),
    premium_delivery_time: Number.parseInt(data.premium.deliveryTime),
    premium_features: data.premium.features,
  }

  let error

  if (existingPlans) {
    // Update existing plans
    const result = await supabase.from("service_plans").update(plansData).eq("id", existingPlans.id)

    error = result.error
  } else {
    // Insert new plans
    const result = await supabase.from("service_plans").insert(plansData)

    error = result.error
  }

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/trainer/settings/services")
}

export async function createNutritionPlan(data: {
  clientId: string
  title: string
  description: string
  dailyCalories: number
  proteinPercentage: number
  carbsPercentage: number
  fatPercentage: number
  mealFrequency: number
  specialInstructions: string
  orderId: string
}) {
  const supabase = createClient()

  const { data: session, error: sessionError } = await supabase.auth.getSession()
  if (sessionError || !session.session) {
    throw new Error("Not authenticated")
  }

  const trainerId = session.session.user.id

  const { error } = await supabase.from("nutrition_plans").insert({
    trainer_id: trainerId,
    client_id: data.clientId,
    title: data.title,
    description: data.description,
    daily_calories: data.dailyCalories,
    protein_percentage: data.proteinPercentage,
    carbs_percentage: data.carbsPercentage,
    fat_percentage: data.fatPercentage,
    meal_frequency: data.mealFrequency,
    special_instructions: data.specialInstructions,
    order_id: data.orderId,
  })

  if (error) {
    throw new Error(error.message)
  }

  // Create notification for client
  await supabase.from("notifications").insert({
    user_id: data.clientId,
    title: "New nutrition plan",
    content: `Your trainer has created a new nutrition plan: ${data.title}`,
    type: "nutrition_plan",
    reference_id: data.orderId,
  })

  revalidatePath(`/trainer/orders/${data.orderId}`)
  revalidatePath(`/client/orders/${data.orderId}`)
}

export async function createMealPlan(data: {
  clientId: string
  nutritionPlanId: string
  title: string
  description: string
  meals: {
    name: string
    time: string
    foods: {
      name: string
      quantity: string
      calories: number
      protein: number
      carbs: number
      fat: number
    }[]
  }[]
  orderId: string
}) {
  const supabase = createClient()

  const { data: session, error: sessionError } = await supabase.auth.getSession()
  if (sessionError || !session.session) {
    throw new Error("Not authenticated")
  }

  const trainerId = session.session.user.id

  const { data: mealPlan, error } = await supabase
    .from("meal_plans")
    .insert({
      trainer_id: trainerId,
      client_id: data.clientId,
      nutrition_plan_id: data.nutritionPlanId,
      title: data.title,
      description: data.description,
      order_id: data.orderId,
    })
    .select("id")
    .single()

  if (error || !mealPlan) {
    throw new Error(error?.message || "Failed to create meal plan")
  }

  // Insert meals
  for (const meal of data.meals) {
    const { data: mealData, error: mealError } = await supabase
      .from("meals")
      .insert({
        meal_plan_id: mealPlan.id,
        name: meal.name,
        time: meal.time,
      })
      .select("id")
      .single()

    if (mealError || !mealData) {
      throw new Error(mealError?.message || "Failed to create meal")
    }

    // Insert foods for this meal
    for (const food of meal.foods) {
      const { error: foodError } = await supabase.from("meal_foods").insert({
        meal_id: mealData.id,
        name: food.name,
        quantity: food.quantity,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
      })

      if (foodError) {
        throw new Error(foodError.message)
      }
    }
  }

  // Create notification for client
  await supabase.from("notifications").insert({
    user_id: data.clientId,
    title: "New meal plan",
    content: `Your trainer has created a new meal plan: ${data.title}`,
    type: "meal_plan",
    reference_id: data.orderId,
  })

  revalidatePath(`/trainer/orders/${data.orderId}`)
  revalidatePath(`/client/orders/${data.orderId}`)
}

export async function createWorkoutPlan(data: {
  clientId: string
  title: string
  description: string
  durationWeeks: number
  daysPerWeek: number
  workouts: {
    day: string
    name: string
    exercises: {
      name: string
      sets: number
      reps: string
      rest: string
      notes: string
    }[]
  }[]
  orderId: string
}) {
  const supabase = createClient()

  const { data: session, error: sessionError } = await supabase.auth.getSession()
  if (sessionError || !session.session) {
    throw new Error("Not authenticated")
  }

  const trainerId = session.session.user.id

  const { data: workoutPlan, error } = await supabase
    .from("workout_plans")
    .insert({
      trainer_id: trainerId,
      client_id: data.clientId,
      title: data.title,
      description: data.description,
      duration_weeks: data.durationWeeks,
      days_per_week: data.daysPerWeek,
      order_id: data.orderId,
    })
    .select("id")
    .single()

  if (error || !workoutPlan) {
    throw new Error(error?.message || "Failed to create workout plan")
  }

  // Insert workouts
  for (const workout of data.workouts) {
    const { data: workoutData, error: workoutError } = await supabase
      .from("workouts")
      .insert({
        workout_plan_id: workoutPlan.id,
        day: workout.day,
        name: workout.name,
      })
      .select("id")
      .single()

    if (workoutError || !workoutData) {
      throw new Error(workoutError?.message || "Failed to create workout")
    }

    // Insert exercises for this workout
    for (const exercise of workout.exercises) {
      const { error: exerciseError } = await supabase.from("exercises").insert({
        workout_id: workoutData.id,
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
        rest: exercise.rest,
        notes: exercise.notes,
      })

      if (exerciseError) {
        throw new Error(exerciseError.message)
      }
    }
  }

  // Create notification for client
  await supabase.from("notifications").insert({
    user_id: data.clientId,
    title: "New workout plan",
    content: `Your trainer has created a new workout plan: ${data.title}`,
    type: "workout_plan",
    reference_id: data.orderId,
  })

  revalidatePath(`/trainer/orders/${data.orderId}`)
  revalidatePath(`/client/orders/${data.orderId}`)
}
