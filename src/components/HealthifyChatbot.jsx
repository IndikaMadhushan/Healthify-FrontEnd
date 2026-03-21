import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, SendHorizontal, Trash2, X } from "lucide-react";
import { sendChatMessageApi } from "../api/ChatApi";

function createMessage(role, content, options = {}) {
  return {
    id:
      options.id ||
      `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    timestamp: options.timestamp || Date.now(),
  };
}

function getDefaultMessages(contextLabel) {
  const intro = contextLabel
    ? `Hello. I'm the Healthify assistant. ${contextLabel} Ask me about symptoms, healthy routines, nutrition, sleep, or general wellness guidance.`
    : "Hello. I'm the Healthify assistant. Ask me about symptoms, healthy routines, nutrition, sleep, or general wellness guidance.";

  return [
    createMessage("assistant", intro),
    createMessage(
      "assistant",
      "I can offer supportive health and wellness guidance, but I am not a substitute for a qualified healthcare professional.",
    ),
  ];
}

function formatTime(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp);
}

const SUGGESTIONS = [
  "How can I improve my sleep routine?",
  "What are some healthy ways to manage stress?",
  "What are good daily habits for better wellness?",
];

export default function HealthifyChatbot({
  contextUserId,
  contextLabel,
  launcherOffsetClassName = "bottom-6",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [messages, setMessages] = useState(() =>
    getDefaultMessages(contextLabel),
  );
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setMessages(getDefaultMessages(contextLabel));
    setConversationId("");
    setInput("");
  }, [contextLabel, contextUserId]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";

    const computedStyles = window.getComputedStyle(textarea);
    const lineHeight = parseFloat(computedStyles.lineHeight) || 24;
    const maxHeight = lineHeight * 3;
    const nextHeight = Math.min(textarea.scrollHeight, maxHeight);

    textarea.style.height = `${Math.max(nextHeight, lineHeight)}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [input, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [isOpen, messages, isSending]);

  const handleSendMessage = async (messageOverride) => {
    const nextMessage = (messageOverride ?? input).trim();

    if (!nextMessage || isSending) {
      return;
    }

    const userMessage = createMessage("user", nextMessage);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const response = await sendChatMessageApi({
        message: nextMessage,
        conversationId: conversationId || undefined,
        userId: contextUserId || undefined,
      });

      if (response?.conversationId) {
        setConversationId(response.conversationId);
      }

      if (response?.success === false) {
        throw new Error(
          response.error ||
            response.message ||
            "Chat assistant failed to respond.",
        );
      }

      setMessages((prev) => [
        ...prev,
        createMessage(
          "assistant",
          response?.message ||
            "I couldn't generate a response right now. Please try again.",
          {
            timestamp: response?.timestamp || Date.now(),
          },
        ),
      ]);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while contacting the assistant.";

      setMessages((prev) => [
        ...prev,
        createMessage("assistant", errorMessage),
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages(getDefaultMessages(contextLabel));
    setConversationId("");
    setInput("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed right-4 ${launcherOffsetClassName} z-50 flex items-center gap-3 rounded-full bg-gradient-to-r from-[#18AAB0] to-[#86C443] px-4 py-3 text-white shadow-[0_18px_40px_rgba(24,170,176,0.28)] transition hover:scale-[1.02] hover:shadow-[0_22px_48px_rgba(24,170,176,0.32)]`}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden text-sm font-semibold sm:inline">
          Healthify Assistant
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[1px]">
          <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-4 sm:p-6">
            <div className="pointer-events-auto flex h-[min(82vh,760px)] w-full max-w-md flex-col overflow-hidden rounded-[28px] border border-[#D3F0ED] bg-white shadow-[0_28px_70px_rgba(15,79,82,0.22)]">
              <div className="bg-gradient-to-r from-[#0F4F52] via-[#18AAB0] to-[#86C443] px-5 py-4 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                      <Bot className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">
                        Healthify Assistant
                      </h2>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-2 text-white/90 transition hover:bg-white/15 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex justify-end border-b border-[#E7F5F3] bg-[#F7FCFB] px-5 py-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F4F52] transition hover:text-[#18AAB0]"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto bg-[#FCFEFE] px-4 py-5">
                {messages.map((message) => {
                  const isAssistant = message.role === "assistant";

                  return (
                    <div
                      key={message.id}
                      className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-3xl px-4 py-3 shadow-sm ${
                          isAssistant
                            ? "rounded-bl-md border border-[#DDF2EF] bg-white text-gray-700"
                            : "rounded-br-md bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm leading-6">
                          {message.content}
                        </p>
                        <p
                          className={`mt-2 text-[11px] ${
                            isAssistant ? "text-gray-400" : "text-white/75"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {isSending && (
                  <div className="flex justify-start">
                    <div className="rounded-3xl rounded-bl-md border border-[#DDF2EF] bg-white px-4 py-3 text-sm text-gray-500 shadow-sm">
                      Healthify Assistant is thinking...
                    </div>
                  </div>
                )}

                {!isSending && messages.length <= 2 && (
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => void handleSendMessage(suggestion)}
                        className="rounded-full border border-[#D3F0ED] bg-white px-3 py-2 text-xs font-medium text-[#0F4F52] transition hover:border-[#18AAB0] hover:text-[#18AAB0]"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-[#E7F5F3] bg-white p-4">
                <div className="rounded-[24px] border border-[#D3F0ED] bg-[#F9FEFD] p-2 shadow-inner">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a health or wellness question..."
                    rows={1}
                    className="w-full resize-none bg-transparent px-3 py-2 text-sm leading-6 text-gray-700 outline-none placeholder:text-gray-400"
                  />

                  <div className="mt-2 flex items-center justify-between gap-3 px-2 pb-1">
                    <p className="text-[11px] leading-4 text-gray-400">
                      Supportive guidance only. For urgent or serious concerns,
                      contact a healthcare professional.
                    </p>

                    <button
                      type="button"
                      onClick={() => void handleSendMessage()}
                      disabled={isSending || !input.trim()}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <SendHorizontal className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
