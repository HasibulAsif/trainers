"use client"

import { useEffect, useRef } from "react"
import type { RealtimeChannel } from "@supabase/supabase-js"
import { createClientSupabaseClient } from "@/lib/supabase"

type SubscriptionEvent = "INSERT" | "UPDATE" | "DELETE" | "*"

interface UseRealtimeSubscriptionProps {
  table: string
  schema?: string
  event?: SubscriptionEvent
  filter?: string
  callback: (payload: any) => void
  channelName?: string
}

/**
 * A hook to manage Supabase real-time subscriptions
 */
export function useRealtimeSubscription({
  table,
  schema = "public",
  event = "*",
  filter,
  callback,
  channelName,
}: UseRealtimeSubscriptionProps) {
  const supabase = createClientSupabaseClient()
  const subscriptionRef = useRef<RealtimeChannel | null>(null)

  useEffect(() => {
    // Generate a unique channel name if not provided
    const uniqueChannelName = channelName || `${table}-${Math.random().toString(36).substring(2, 9)}`

    // Create the subscription
    let subscription = supabase.channel(uniqueChannelName)

    // Add the subscription handler
    const changes = {
      event,
      schema,
      table,
    }

    // Add filter if provided
    if (filter) {
      Object.assign(changes, { filter })
    }

    subscription = subscription.on("postgres_changes", changes, callback)

    // Subscribe to the channel
    subscription.subscribe()

    // Store the subscription reference
    subscriptionRef.current = subscription

    // Clean up on unmount
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current)
      }
    }
  }, [table, schema, event, filter, callback, channelName, supabase])

  return subscriptionRef
}
