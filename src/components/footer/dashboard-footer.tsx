'use client'

import { useState } from 'react'
import { TermsModal } from '@/components/legal/terms-modal'
import { PrivacyModal } from '@/components/legal/privacy-modal'

export function DashboardFooter() {
  const [termsOpen, setTermsOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 h-14 border-t border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-full items-center justify-center px-4">
          <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground sm:flex-row sm:gap-3">
            <span>LexIA © 2025</span>
            <span className="hidden sm:inline">|</span>
            <button
              onClick={() => setTermsOpen(true)}
              className="hover:text-primary hover:underline"
              aria-label="Ver Términos y Condiciones"
            >
              Términos y Condiciones
            </button>
            <span className="hidden sm:inline">|</span>
            <button
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-primary hover:underline"
              aria-label="Ver Política de Privacidad"
            >
              Privacidad
            </button>
          </div>
        </div>
      </footer>

      <TermsModal open={termsOpen} onOpenChange={setTermsOpen} />
      <PrivacyModal open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </>
  )
}
