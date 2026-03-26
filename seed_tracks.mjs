import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE credentials in environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const tracksToAdd = [
  {
    name: "Backend Systems",
    desc: "Node.js, REST APIs, Databases",
    tasks: [
      { title: "System Architecture Fundamentals", content: "Understand how backend systems integrate with databases and client interfaces.", position: 1 },
      { title: "RESTful API Integration", content: "Build scalable and REST-compliant endpoints.", position: 2 },
      { title: "Database Optimization", content: "Learn index building, query optimization, and schema design.", position: 3 }
    ],
    questions: [
      { text: "Which HTTP method is idempotent?", options: ["GET", "POST", "PATCH", "ALL"], correct_answer: 'a' },
      { text: "What is the primary benefit of connection pooling?", options: ["Reduces memory", "Reuses active connections", "Prevents SQL injection", "Encrypts data"], correct_answer: 'b' },
      { text: "Which status code indicates 'Not Found'?", options: ["200", "400", "404", "500"], correct_answer: 'c' }
    ]
  },
  {
    name: "Interface Design",
    desc: "Figma grids, wireframes, prototypes",
    tasks: [
      { title: "Design System Fundamentals", content: "Understanding tokens, grids, and reusable components. This task acts as an initial skill analysis for component-based design.", position: 1 },
      { title: "Advanced Wireframing", content: "Creating structural flows before high-fidelity visual design.", position: 2 },
      { title: "Prototyping & Motion", content: "Implementing micro-interactions and transitions in Figma.", position: 3 }
    ],
    questions: [
      { text: "What does UI stand for?", options: ["User Integration", "User Interface", "Unified Interface", "Universal Interface"], correct_answer: 'b' },
      { text: "Which tool is standard for interface design?", options: ["VS Code", "Figma", "Postman", "Docker"], correct_answer: 'b' },
      { text: "What is auto-layout?", options: ["A coding layout system", "A dynamic sizing system in Figma", "A database schema", "An animation tool"], correct_answer: 'b' }
    ]
  },
  {
    name: "Data Engineering",
    desc: "SQL structures, Excel, Python scripting",
    tasks: [
      { title: "Data Pipelines", content: "Architecting ETL pipelines for data transformation.", position: 1 },
      { title: "Advanced SQL Execution", content: "Writing complex joins, window functions, and views.", position: 2 },
      { title: "Automation with Python", content: "Scripting automated data processing tasks using Pandas.", position: 3 }
    ],
    questions: [
      { text: "What does ETL stand for?", options: ["Extract, Transform, Load", "Execute, Transfer, List", "Entity, Table, Link", "Export, Test, Load"], correct_answer: 'a' },
      { text: "Which clause is used to filter after a grouping?", options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"], correct_answer: 'b' },
      { text: "What Python library is commonly used for data manipulation?", options: ["React", "Express", "Pandas", "Django"], correct_answer: 'c' }
    ]
  },
  {
    name: "Technical Writing",
    desc: "Documentation, Copywriting, SEO",
    tasks: [
      { title: "Documentation Architecture", content: "Structuring API docs and developer guides effectively.", position: 1 },
      { title: "SEO Optimization", content: "Writing content that performs well in technical search queries.", position: 2 },
      { title: "Copywriting for Engineers", content: "Translating complex functional requirements into user-facing benefits.", position: 3 }
    ],
    questions: [
      { text: "Which format is widely used for technical READMEs?", options: ["DOCX", "PDF", "Markdown", "XLSX"], correct_answer: 'c' },
      { text: "What represents the main header in Markdown?", options: ["#", "##", "*", "@"], correct_answer: 'a' },
      { text: "What is the primary goal of API documentation?", options: ["To look good", "To show off", "To help developers use the API", "To hide source code"], correct_answer: 'c' }
    ]
  },
  {
    name: "Growth Marketing",
    desc: "Analytics, Ads, Distribution workflows",
    tasks: [
      { title: "Product Analytics", content: "Setting up funnels and tracking user retention metrics.", position: 1 },
      { title: "Distribution Workflows", content: "Architecting automated outreach and programmatic SEO.", position: 2 },
      { title: "Conversion Rate Optimization", content: "A/B testing and algorithmic ad bidding.", position: 3 }
    ],
    questions: [
      { text: "What does CTR stand for?", options: ["Cost To Run", "Click Through Rate", "Conversion Time Ratio", "Cut To Render"], correct_answer: 'b' },
      { text: "Which metric tracks user drop-off?", options: ["Bounce Rate", "Impressions", "SEO", "ROI"], correct_answer: 'a' },
      { text: "What is A/B testing?", options: ["Testing alpha/beta code", "Comparing two versions of a page", "A database query", "A deployment strategy"], correct_answer: 'b' }
    ]
  }
];

async function seed() {
  for (const t of tracksToAdd) {
    console.log(`Processing ${t.name}...`);
    
    // Check if field exists
    let { data: fieldData, error: fieldErr } = await supabase.from('fields').select('id').eq('name', t.name).single();
    
    if (fieldErr && fieldErr.code !== 'PGRST116') {
      console.error(fieldErr);
    }
    
    if (!fieldData) {
      console.log(`Creating field ${t.name}...`);
      const { data: newField, error } = await supabase.from('fields').insert({ name: t.name }).select('id').single();
      if (error) throw error;
      fieldData = newField;
    }

    // Check if track exists
    let { data: trackData, error: trackErr } = await supabase.from('tracks').select('id').eq('field_id', fieldData.id).single();
    if (trackErr && trackErr.code !== 'PGRST116') {
      console.error(trackErr);
    }
    
    if (!trackData) {
      console.log(`Creating track for ${t.name}...`);
      const { data: newTrack, error } = await supabase.from('tracks').insert({
        field_id: fieldData.id,
        level: 'beginner',
        description: `Complete this skill analysis block to verify your baseline proficiency in ${t.name}. This is strictly a technical verification pathway, not a professional certification.`,
        is_active: true
      }).select('id').single();
      if (error) throw error;
      trackData = newTrack;
    }

    // Insert or fetch Tasks
    const { data: existingTasks } = await supabase.from('tasks').select('id').eq('track_id', trackData.id);
    if (!existingTasks || existingTasks.length === 0) {
      const tasksToInsert = t.tasks.map(task => ({
        track_id: trackData.id,
        title: task.title,
        description: task.content,
        order_number: task.position
      }));
      console.log(`Inserting tasks for ${t.name}...`);
      const { error: taskInsertErr } = await supabase.from('tasks').insert(tasksToInsert);
      if (taskInsertErr) console.error("Error inserting tasks:", taskInsertErr);
    } else {
      console.log(`Tasks already exist for ${t.name}. Skipping...`);
    }

    // Insert or fetch Questions
    const { data: existingQuestions } = await supabase.from('questions').select('id').eq('track_id', trackData.id);
    if (!existingQuestions || existingQuestions.length === 0) {
      const questionsToInsert = t.questions.map(q => ({
        track_id: trackData.id,
        question: q.text,
        option_a: q.options[0],
        option_b: q.options[1],
        option_c: q.options[2],
        option_d: q.options[3],
        correct_answer: q.correct_answer
      }));
      console.log(`Inserting questions for ${t.name}...`);
      const { error: reqInsertErr } = await supabase.from('questions').insert(questionsToInsert);
      if (reqInsertErr) console.error("Error inserting questions:", reqInsertErr);
    } else {
      console.log(`Questions already exist for ${t.name}. Skipping...`);
    }
  }
  console.log("Seeding complete.");
}

seed().catch(console.error);
