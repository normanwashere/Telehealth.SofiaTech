import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zqotwdizotyhwdewujfk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxb3R3ZGl6b3R5aHdkZXd1amZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMDE2ODIsImV4cCI6MjA2NjY3NzY4Mn0.QSZwdcCTlsjmOj0uWVUYONtI8DJYTKqhmBgVFQ79wIo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);