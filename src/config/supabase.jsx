// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = 'https://xxtaccjhwfxgvhkuryvr.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4dGFjY2pod2Z4Z3Zoa3VyeXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMjYyODEsImV4cCI6MjA2NTkwMjI4MX0.f25xHBIvZ_yfNQ0GI8kRdFhOxB1n4eW543o-ruOVFrE'
// const supabase = createClient(supabaseUrl, supabaseKey)

// export { supabase }


// supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
