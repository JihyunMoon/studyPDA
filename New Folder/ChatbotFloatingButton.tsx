import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThreeDIcon } from './ThreeDIcon';
import { X } from 'lucide-react';
import { EnhancedAIChatbot } from './EnhancedAIChatbot';

export function ChatbotFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[1000] cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {!isOpen && <ThreeDIcon type="chat" size="lg" />}
      </motion.button>

      {/* Expanded Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-[1001] w-[600px] h-[700px] shadow-2xl rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-[1002] w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors border border-[#444]/10"
            >
              <X className="h-5 w-5 text-[#444]" />
            </button>

            {/* Chat Content */}
            <div className="h-full bg-white rounded-2xl border-2 border-[#2176FF]/20 shadow-[0_0_60px_rgba(33,118,255,0.3)]">
              <EnhancedAIChatbot />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}