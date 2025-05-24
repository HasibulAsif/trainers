"use client"

import React, { useState, useEffect, useRef } from "react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Search, Send } from "lucide-react"
import { getConversations, getMessages, markMessagesAsRead, sendMessage } from "@/lib/actions"
import { createClientSupabaseClient } from "@/lib/supabase"
import type { Conversation, Message } from "@/lib/types"
import type { RealtimeChannel } from "@supabase/supabase-js"

export default function TrainerMessagesPage() {
  // In a real app, you would get the trainer ID from authentication
  const trainerId = "trainer-456"

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sendingMessage, setSendingMessage] = useState(false)

  // Refs for subscription channels
  const messagesSubscriptionRef = useRef<RealtimeChannel | null>(null)
  const conversationsSubscriptionRef = useRef<RealtimeChannel | null>(null)

  // Ref for message container to auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fetch initial conversations
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true)
      const data = await getConversations(trainerId, "trainer")
      setConversations(data)

      // Select the first conversation by default if available
      if (data.length > 0 && !selectedConversation) {
        setSelectedConversation(data[0])
      }

      setLoading(false)
    }

    fetchConversations()

    // Set up real-time subscription for conversations
    const supabase = createClientSupabaseClient()

    // Subscribe to conversations table changes
    const conversationsSubscription = supabase
      .channel("trainer-conversations")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `trainer_id=eq.${trainerId}`,
        },
        async (payload) => {
          console.log("Conversations change received:", payload)
          // Refresh conversations when there's a change
          const data = await getConversations(trainerId, "trainer")
          setConversations(data)
        },
      )
      .subscribe()

    conversationsSubscriptionRef.current = conversationsSubscription

    return () => {
      // Clean up subscription
      if (conversationsSubscriptionRef.current) {
        supabase.removeChannel(conversationsSubscriptionRef.current)
      }
    }
  }, [trainerId])

  // Fetch messages and set up real-time subscription when conversation changes
  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        const data = await getMessages(selectedConversation.id)
        setMessages(data)

        // Mark messages as read
        await markMessagesAsRead(selectedConversation.id, trainerId)

        // Update the unread count in the conversations list
        setConversations(
          conversations.map((conv) => (conv.id === selectedConversation.id ? { ...conv, unread_count: 0 } : conv)),
        )
      }

      fetchMessages()

      // Set up real-time subscription for messages
      const supabase = createClientSupabaseClient()

      // Clean up previous subscription if exists
      if (messagesSubscriptionRef.current) {
        supabase.removeChannel(messagesSubscriptionRef.current)
      }

      // Subscribe to messages table changes for this conversation
      const messagesSubscription = supabase
        .channel(`messages-${selectedConversation.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${selectedConversation.id}`,
          },
          async (payload) => {
            console.log("New message received:", payload)
            const newMessage = payload.new as Message

            // Only add the message if it's not from the current user
            // (to avoid duplicates since we add sent messages directly)
            if (!(newMessage.sender_id === trainerId && newMessage.sender_type === "trainer")) {
              setMessages((prevMessages) => [...prevMessages, newMessage])

              // Mark message as read if it's from the other user
              if (newMessage.sender_id !== trainerId) {
                await markMessagesAsRead(selectedConversation.id, trainerId)
              }
            }
          },
        )
        .subscribe()

      messagesSubscriptionRef.current = messagesSubscription

      return () => {
        // Clean up subscription
        if (messagesSubscriptionRef.current) {
          supabase.removeChannel(messagesSubscriptionRef.current)
        }
      }
    }
  }, [selectedConversation, trainerId, conversations])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedConversation || !newMessage.trim()) return

    setSendingMessage(true)

    try {
      const message = await sendMessage(selectedConversation.id, trainerId, "trainer", newMessage)

      if (message) {
        setMessages([...messages, message])
        setNewMessage("")
      }
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setSendingMessage(false)
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar userType="trainer" />
      <div className="flex-1">
        <DashboardHeader userType="trainer" />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Messages</h1>
            <p className="text-gray-600">Communicate with your clients</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-200px)] flex">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search conversations..." className="pl-10" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center text-gray-500">Loading conversations...</div>
                ) : conversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">No conversations yet</div>
                ) : (
                  conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversation?.id === conversation.id ? "bg-gray-50" : ""
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage
                            src={conversation.other_user?.profile_image || "/placeholder.svg"}
                            alt={conversation.other_user?.name}
                          />
                          <AvatarFallback>{conversation.other_user?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium truncate">{conversation.other_user?.name}</h3>
                            <span className="text-xs text-gray-500">
                              {conversation.last_message ? formatTime(conversation.last_message.created_at) : ""}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {conversation.last_message?.content || "No messages yet"}
                          </p>
                        </div>
                        {conversation.unread_count ? (
                          <div className="ml-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {conversation.unread_count}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="w-2/3 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage
                        src={selectedConversation.other_user?.profile_image || "/placeholder.svg"}
                        alt={selectedConversation.other_user?.name}
                      />
                      <AvatarFallback>{selectedConversation.other_user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedConversation.other_user?.name}</h3>
                      <p className="text-xs text-gray-500">
                        {selectedConversation.other_user?.type === "trainer" ? "Trainer" : "Client"}
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center text-gray-500 py-8">No messages yet. Start the conversation!</div>
                    ) : (
                      messages.map((message, index) => {
                        const isCurrentUser = message.sender_id === trainerId && message.sender_type === "trainer"
                        const showDate =
                          index === 0 || formatDate(messages[index - 1].created_at) !== formatDate(message.created_at)

                        return (
                          <React.Fragment key={message.id}>
                            {showDate && (
                              <div className="text-center my-4">
                                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                                  {formatDate(message.created_at)}
                                </span>
                              </div>
                            )}
                            <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                              <div className="flex items-end gap-2 max-w-[70%]">
                                {!isCurrentUser && (
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={selectedConversation.other_user?.profile_image || "/placeholder.svg"}
                                      alt={selectedConversation.other_user?.name}
                                    />
                                    <AvatarFallback>{selectedConversation.other_user?.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                )}
                                <div
                                  className={`p-3 rounded-lg ${
                                    isCurrentUser
                                      ? "bg-pink-600 text-white rounded-br-none"
                                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                                  }`}
                                >
                                  <p className="text-sm">{message.content}</p>
                                  <p className={`text-xs mt-1 ${isCurrentUser ? "text-pink-100" : "text-gray-500"}`}>
                                    {formatTime(message.created_at)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        )
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        disabled={sendingMessage}
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        size="icon"
                        disabled={!newMessage.trim() || sendingMessage}
                        className="bg-pink-600 hover:bg-pink-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="bg-gray-100 rounded-full p-6 inline-block mb-4">
                      <MessageSquare className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                    <p className="text-gray-500">Select a conversation from the list to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
