'use client'

import { useEffect, useRef, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'
import { FiLoader, FiSend, FiX } from 'react-icons/fi'

type ChatRole = 'bot' | 'user'

type ChatSuggestion = {
  label: string
  href: string
}

type ChatMessage = {
  id: string
  role: ChatRole
  text: string
  suggestions?: ChatSuggestion[]
}

type ChatHistoryItem = {
  role: ChatRole
  text: string
}

const externalWhatsAppUrl =
  'https://wa.me/919906469903?text=Hello%20National%20Pride%20Travels%2C%20I%20want%20to%20plan%20a%20Kashmir%20tour.'

const quickPrompts = [
  'Honeymoon package with pricing',
  'Winter packages with price',
  'Budget family package',
  'Best Gulmarg packages',
]

function makeMessage(role: ChatRole, text: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    role,
    text,
  }
}

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    makeMessage(
      'bot',
      'Welcome to National Pride Travels WhatsApp Chatbot. I can help with destinations, season-wise packages, pricing, and bookings.'
    ),
  ])
  const chatBodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const body = chatBodyRef.current
    if (!body) {
      return
    }
    body.scrollTop = body.scrollHeight
  }, [isOpen, messages])

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === '#whatsapp-chat') {
        setIsOpen(true)
      }
    }

    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  const sendMessage = async (text: string) => {
    const cleanText = text.trim()
    if (!cleanText || isSending) {
      return
    }

    setMessages((current) => [...current, makeMessage('user', cleanText)])
    setInput('')
    setIsSending(true)

    const historyForApi: ChatHistoryItem[] = messages
      .filter((message) => Boolean(message.text.trim()))
      .slice(-8)
      .map((message) => ({
        role: message.role,
        text: message.text,
      }))

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: cleanText, history: historyForApi }),
      })

      const payload = (await response.json()) as { reply?: string; suggestions?: ChatSuggestion[] }
      const reply =
        payload.reply ||
        'Our support team is available on +91-9906469903. Please share your travel dates and destination preference.'

      setMessages((current) => [
        ...current,
        {
          ...makeMessage('bot', reply),
          suggestions: payload.suggestions || [],
        },
      ])
    } catch (error) {
      console.error('Chatbot request failed:', error)
      setMessages((current) => [
        ...current,
        makeMessage(
          'bot',
          'I am temporarily unavailable. Please use the call button or open WhatsApp app for immediate support.'
        ),
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div id="whatsapp-chat" className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-2">
      {isOpen && (
        <section className="w-[min(92vw,370px)] overflow-hidden rounded-2xl border border-emerald-400/40 bg-[#041120]/95 text-white shadow-[0_24px_52px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <header className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-[#0a5d4a] to-[#0f4f84] px-4 py-3">
            <div>
              <p className="text-sm font-semibold">WhatsApp Chatbot</p>
              <p className="text-xs text-emerald-100">Advanced travel planning chatbot</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-white/90 transition hover:bg-white/15"
              aria-label="Close WhatsApp chat widget"
            >
              <FiX />
            </button>
          </header>

          <div ref={chatBodyRef} className="max-h-[340px] space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div
                  className={`max-w-[88%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'ml-auto bg-emerald-500/90 text-white'
                      : 'bg-white/10 text-slate-100'
                  }`}
                >
                  {message.text}
                </div>

                {message.role === 'bot' && message.suggestions && message.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion) =>
                      suggestion.href.startsWith('/') ? (
                        <Link
                          key={`${message.id}-${suggestion.href}`}
                          href={suggestion.href}
                          className="rounded-full border border-cyan-200/40 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium text-cyan-100 transition hover:bg-cyan-500/20"
                        >
                          {suggestion.label}
                        </Link>
                      ) : (
                        <a
                          key={`${message.id}-${suggestion.href}`}
                          href={suggestion.href}
                          className="rounded-full border border-cyan-200/40 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium text-cyan-100 transition hover:bg-cyan-500/20"
                        >
                          {suggestion.label}
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
            {isSending && (
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-slate-200">
                <FiLoader className="animate-spin" />
                Typing...
              </div>
            )}
          </div>

          <div className="border-t border-white/10 px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  disabled={isSending}
                  className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-medium text-cyan-100 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                void sendMessage(input)
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your message..."
                className="w-full rounded-full border border-white/25 bg-white/95 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-500/60"
                aria-label="Send message"
              >
                <FiSend size={15} />
              </button>
            </form>

            <a
              href={externalWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex text-xs font-semibold text-emerald-200 transition hover:text-emerald-100"
            >
              Open WhatsApp app
            </a>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-[0_18px_34px_rgba(0,0,0,0.28)] transition hover:scale-[1.03] hover:brightness-95"
      >
        {isOpen ? <FiX size={18} /> : <FaWhatsapp size={20} />}
        <span className="hidden sm:inline">{isOpen ? 'Close Chat' : 'WhatsApp Chatbot'}</span>
      </button>
    </div>
  )
}
