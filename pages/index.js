import styles from '../styles/Home.module.css'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export default function Home() {
  const supabase = createClient (
    "https://ovdyboaaritoollxlrhm.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92ZHlib2Fhcml0b29sbHhscmhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQzNTIzMjgsImV4cCI6MTk3OTkyODMyOH0.h8DRDyag5cTQ7qDzsOX9MwUL_EV9k_i9n3ZIqq_1twk"
  )

  const [fetchError, setFetchError] = useState(null)
  const [flashcards, setFlashcards] = useState(null)

  useEffect(() => {
    const fetchFlashcards = async () => {
      const {data, error} = await supabase.from('Flashcard').select()

      if (error) {
        setFetchError("Could not get the flashcards")
        setFlashcards(null)
        console.log(error)
      }

      if (data) {
        setFlashcards(data)
        setFetchError(null)
      }
    }

    fetchFlashcards()
  }, [])

  return (
    <div>
      {fetchError && (<p>{fetchError}</p>)}
      {flashcards && (
        <div>
          {flashcards.map(flashcard => (
              <p>
                {flashcard.question}
              </p>
          ))}
        </div>
      )}
    </div>
  )
}