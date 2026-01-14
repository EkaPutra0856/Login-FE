"use client"

import { useEffect, useState, type FC } from "react"

interface Props {
  open: boolean
  message?: string
  duration?: number
  onClose: () => void
}

export const SuccessToast: FC<Props> = ({ open, message = "Berhasil", duration = 1200, onClose }) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    let t1: ReturnType<typeof setTimeout> | null = null
    if (open) {
      // trigger enter animation
      // small delay to allow CSS transition from initial state
      requestAnimationFrame(() => setVisible(true))

      // auto close after duration
      t1 = setTimeout(() => {
        setVisible(false)
        // allow animation to finish then call onClose
        setTimeout(onClose, 200)
      }, duration)
    } else {
      setVisible(false)
    }

    return () => {
      if (t1) clearTimeout(t1)
    }
  }, [open, duration, onClose])

  if (!open && !visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        className="absolute inset-0 bg-black/30 pointer-events-auto"
        onClick={() => {
          setVisible(false)
          setTimeout(onClose, 200)
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        className={`pointer-events-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg p-6 shadow-lg transform transition-all duration-200 ease-out ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="font-semibold text-lg">{message}</p>
            <p className="text-sm text-muted-foreground mt-1">Foto profil berhasil diperbarui.</p>
          </div>
          <button
            onClick={() => {
              setVisible(false)
              setTimeout(onClose, 200)
            }}
            aria-label="Close"
            className="ml-2 text-sm text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessToast
