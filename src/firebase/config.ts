import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getDatabase, type Database } from 'firebase/database'

let app: FirebaseApp | null = null
let db: Database | null = null

export function initFirebase(): { app: FirebaseApp; db: Database } | null {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
  const databaseURL = import.meta.env.VITE_FIREBASE_DATABASE_URL

  if (!apiKey || !projectId || !databaseURL) {
    console.warn('[COSMOS] Firebase not configured. Encounter system disabled. Set VITE_FIREBASE_* env vars.')
    return null
  }

  if (app && db) return { app, db }

  app = initializeApp({
    apiKey,
    authDomain: `${projectId}.firebaseapp.com`,
    databaseURL,
    projectId,
    storageBucket: `${projectId}.appspot.com`,
  })

  db = getDatabase(app)

  return { app, db }
}

export function getDb(): Database | null {
  return db
}
