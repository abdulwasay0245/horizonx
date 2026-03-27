import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE credentials in environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const tracksToAdd = [
  {
    name: "Programming with C++",
    desc: "Write basic programs, functions, and simple logic in C++",
    tasks: [
      {
        title: "Write Your First C++ Program",
        content: `Write a C++ program that prints "Hello, World!" to the console.

Your program must:
- Include the correct header file
- Use the main() function
- Use cout to print the message
- Return 0 from main

Example output:
Hello, World!`,
        position: 1
      },
      {
        title: "Write a Function That Adds Two Numbers",
        content: `Write a C++ function called add that takes two integers as parameters and returns their sum.

Requirements:
- Define a function named add
- It should accept two int parameters
- It should return an int
- Call it from main() and print the result

Example:
add(3, 5) should print 8`,
        position: 2
      },
      {
        title: "Use a For Loop to Print Numbers 1 to 10",
        content: `Write a C++ program that uses a for loop to print numbers from 1 to 10, each on a new line.

Requirements:
- Use a for loop
- Print each number on its own line
- Start from 1 and end at 10

Example output:
1
2
3
...
10`,
        position: 3
      },
      {
        title: "Check If a Number Is Even or Odd",
        content: `Write a C++ program that reads an integer from the user and prints whether it is "Even" or "Odd".

Requirements:
- Use cin to read input
- Use an if-else statement
- Use the modulo operator (%)
- Print the result using cout`,
        position: 4
      },
      {
        title: "Store and Print Student Names Using an Array",
        content: `Write a C++ program that stores 5 student names in a string array and prints them all.

Requirements:
- Declare a string array of size 5
- Assign 5 names to it
- Use a loop to print each name
- Each name should appear on its own line`,
        position: 5
      }
    ],
    questions: [
      { text: "What is the job of the main() function in C++?", options: ["It stores variables", "It is the entry point of the program", "It imports libraries", "It defines classes"], correct_answer: 'b' },
      { text: "Which header file is needed to use cout in C++?", options: ["<stdio.h>", "<string>", "<iostream>", "<cmath>"], correct_answer: 'c' },
      { text: "What does cout do in C++?", options: ["Reads input from the user", "Prints output to the console", "Declares a variable", "Ends the program"], correct_answer: 'b' },
      { text: "What does cin do in C++?", options: ["Prints output", "Creates a new function", "Reads input from the user", "Loops through values"], correct_answer: 'c' },
      { text: "What symbol is used for single-line comments in C++?", options: ["/*", "#", "//", "--"], correct_answer: 'c' },
      { text: "What value should main() return when the program runs successfully?", options: ["1", "-1", "null", "0"], correct_answer: 'd' },
      { text: "Which of the following is the correct way to declare an integer variable in C++?", options: ["variable x = 5;", "int x = 5;", "x := 5;", "let x = 5;"], correct_answer: 'b' },
      { text: "What does the modulo operator (%) do?", options: ["Multiplies two numbers", "Divides two numbers", "Returns the remainder of division", "Finds the square root"], correct_answer: 'c' },
      { text: "Which loop is best when you know the exact number of iterations?", options: ["while loop", "do-while loop", "for loop", "if loop"], correct_answer: 'c' },
      { text: "What is the correct syntax to start a for loop in C++?", options: ["for (int i = 0; i < 10; i++)", "for i in range(10):", "loop i from 0 to 10", "repeat 10 times"], correct_answer: 'a' },
      { text: "How do you declare a function named greet that returns nothing in C++?", options: ["function greet()", "void greet()", "int greet()", "greet() =>"], correct_answer: 'b' },
      { text: "What is an array in C++?", options: ["A single variable", "A collection of elements of the same type", "A type of loop", "A function that returns nothing"], correct_answer: 'b' },
      { text: "How do you access the first element of an array called arr?", options: ["arr[1]", "arr.first()", "arr(0)", "arr[0]"], correct_answer: 'd' },
      { text: "Which keyword is used to make a decision in C++?", options: ["loop", "check", "if", "decide"], correct_answer: 'c' },
      { text: "What does the else block do in an if-else statement?", options: ["Runs when the if condition is true", "Always runs", "Runs when the if condition is false", "Ends the program"], correct_answer: 'c' },
      { text: "Which operator is used to compare two values for equality in C++?", options: ["=", "===", "==", "!="], correct_answer: 'c' },
      { text: "What is the size of an int in most compilers?", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], correct_answer: 'c' },
      { text: "What does the ++ operator do?", options: ["Decrements by 1", "Multiplies by 2", "Increments by 1", "Divides by 2"], correct_answer: 'c' },
      { text: "Which of the following correctly prints a new line in C++?", options: ["cout << newline;", "cout << '\\n';", "print(newline)", "cout << /n;"], correct_answer: 'b' },
      { text: "What does 'return' do inside a function?", options: ["Starts the program", "Ends the loop", "Sends a value back to the caller and exits the function", "Declares a variable"], correct_answer: 'c' }
    ]
  },
  {
    name: "Programming with C++ (OOP)",
    desc: "Learn object-oriented programming basics with C++ classes and objects",
    tasks: [
      {
        title: "Create a Simple Class and Object",
        content: `Write a C++ program that defines a class called Car with two attributes: brand (string) and year (int).

Requirements:
- Define a class named Car
- Add two public attributes: brand and year
- In main(), create an object of Car
- Set its brand to "Toyota" and year to 2022
- Print both values using cout`,
        position: 1
      },
      {
        title: "Add a Method to a Class",
        content: `Extend your Car class by adding a method called displayInfo() that prints the car's brand and year.

Requirements:
- The method should be inside the class
- It should print: "Brand: Toyota, Year: 2022" (using the actual values)
- Call displayInfo() from main() using your Car object`,
        position: 2
      },
      {
        title: "Write a Constructor",
        content: `Modify your Car class to include a constructor that accepts brand and year as parameters and sets them automatically when an object is created.

Requirements:
- Define a constructor inside the class
- The constructor should take two parameters (string brand, int year)
- Create an object using the constructor in main()
- Call displayInfo() to print the result`,
        position: 3
      },
      {
        title: "Use Private Attributes with Getters and Setters",
        content: `Update your Car class to make brand and year private, and add getter and setter methods to access them.

Requirements:
- Make brand and year private
- Add getBrand(), getYear(), setBrand(), and setYear() methods
- In main(), use setters to assign values and getters to print them`,
        position: 4
      },
      {
        title: "Inherit from a Base Class",
        content: `Create a base class called Animal with a method called speak(). Then create a derived class called Dog that overrides speak() to print "Woof!".

Requirements:
- Define a base class Animal with a public method speak() that prints "Some animal sound"
- Create a derived class Dog that inherits from Animal
- Override speak() in Dog to print "Woof!"
- In main(), create a Dog object and call speak()`,
        position: 5
      }
    ],
    questions: [
      { text: "What is a class in C++?", options: ["A built-in function", "A blueprint for creating objects", "A type of loop", "A file extension"], correct_answer: 'b' },
      { text: "What is an object in C++?", options: ["A variable name", "An instance of a class", "A function definition", "A loop counter"], correct_answer: 'b' },
      { text: "Which keyword is used to define a class in C++?", options: ["object", "struct", "class", "define"], correct_answer: 'c' },
      { text: "What access modifier makes a class member accessible from outside the class?", options: ["private", "protected", "internal", "public"], correct_answer: 'd' },
      { text: "What access modifier hides a class member from outside the class?", options: ["public", "open", "private", "visible"], correct_answer: 'c' },
      { text: "What is a constructor?", options: ["A function that destroys an object", "A special function called automatically when an object is created", "A variable inside a class", "A way to inherit from another class"], correct_answer: 'b' },
      { text: "What is the name of a constructor if the class is called Student?", options: ["create()", "init()", "Student()", "New()"], correct_answer: 'c' },
      { text: "What does a getter method do?", options: ["Sets the value of a private variable", "Deletes an object", "Returns the value of a private variable", "Creates an array"], correct_answer: 'c' },
      { text: "What does a setter method do?", options: ["Returns a value", "Sets the value of a private variable", "Ends the program", "Prints output"], correct_answer: 'b' },
      { text: "What is inheritance in OOP?", options: ["Copying a function", "A class acquiring properties and methods from another class", "Creating a loop", "Declaring a pointer"], correct_answer: 'b' },
      { text: "Which symbol is used to show inheritance in C++?", options: ["->", "::", ":", "=>"], correct_answer: 'c' },
      { text: "What is method overriding?", options: ["Calling a method twice", "Changing a method's return type", "Redefining a parent class method in a child class", "Creating two methods with the same name"], correct_answer: 'c' },
      { text: "What does 'this' keyword refer to in C++?", options: ["The previous object", "The current object", "The main function", "The parent class"], correct_answer: 'b' },
      { text: "What is encapsulation in OOP?", options: ["Hiding data inside a class using access modifiers", "Inheriting from multiple classes", "Using templates", "Creating global variables"], correct_answer: 'a' },
      { text: "Which of the following creates an object of class Cat?", options: ["class Cat obj;", "Cat obj;", "object Cat = new();", "new Cat obj;"], correct_answer: 'b' },
      { text: "How do you access a public member called name of an object called p?", options: ["p->name", "p::name", "p.name", "p[name]"], correct_answer: 'c' },
      { text: "What is a destructor used for?", options: ["Creating objects", "Printing data", "Cleaning up when an object is destroyed", "Inheriting methods"], correct_answer: 'c' },
      { text: "What is the syntax for a destructor of class Box?", options: ["~Box()", "delete Box()", "destroy Box()", "Box.~()"], correct_answer: 'a' },
      { text: "What does OOP stand for?", options: ["Object Oriented Programming", "Output Oriented Processing", "Open Object Platform", "Ordered Object Protocol"], correct_answer: 'a' },
      { text: "Which OOP concept allows one class to have multiple forms?", options: ["Encapsulation", "Inheritance", "Abstraction", "Polymorphism"], correct_answer: 'd' }
    ]
  }
];

async function seed() {
  for (const t of tracksToAdd) {
    console.log(`\nProcessing "${t.name}"...`);

    // Check if field exists
    let { data: fieldData, error: fieldErr } = await supabase.from('fields').select('id').eq('name', t.name).single();
    if (fieldErr && fieldErr.code !== 'PGRST116') {
      console.error('Field fetch error:', fieldErr);
    }

    if (!fieldData) {
      console.log(`  Creating field "${t.name}"...`);
      const { data: newField, error } = await supabase.from('fields').insert({ name: t.name }).select('id').single();
      if (error) throw error;
      fieldData = newField;
    } else {
      console.log(`  Field "${t.name}" already exists.`);
    }

    // Check if track exists
    let { data: trackData, error: trackErr } = await supabase.from('tracks').select('id').eq('field_id', fieldData.id).single();
    if (trackErr && trackErr.code !== 'PGRST116') {
      console.error('Track fetch error:', trackErr);
    }

    if (!trackData) {
      console.log(`  Creating track for "${t.name}"...`);
      const { data: newTrack, error } = await supabase.from('tracks').insert({
        field_id: fieldData.id,
        level: 'beginner',
        description: `Complete this skill analysis block to verify your baseline proficiency in ${t.name}. This is strictly a technical verification pathway, not a professional certification.`,
        is_active: true
      }).select('id').single();
      if (error) throw error;
      trackData = newTrack;
    } else {
      console.log(`  Track for "${t.name}" already exists.`);
    }

    // Insert Tasks
    const { data: existingTasks } = await supabase.from('tasks').select('id').eq('track_id', trackData.id);
    if (!existingTasks || existingTasks.length === 0) {
      const tasksToInsert = t.tasks.map(task => ({
        track_id: trackData.id,
        title: task.title,
        description: task.content,
        order_number: task.position
      }));
      console.log(`  Inserting ${tasksToInsert.length} tasks...`);
      const { error: taskInsertErr } = await supabase.from('tasks').insert(tasksToInsert);
      if (taskInsertErr) console.error("  Error inserting tasks:", taskInsertErr);
      else console.log(`  Tasks inserted successfully.`);
    } else {
      console.log(`  Tasks already exist. Skipping...`);
    }

    // Insert Questions
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
      console.log(`  Inserting ${questionsToInsert.length} questions...`);
      const { error: qInsertErr } = await supabase.from('questions').insert(questionsToInsert);
      if (qInsertErr) console.error("  Error inserting questions:", qInsertErr);
      else console.log(`  Questions inserted successfully.`);
    } else {
      console.log(`  Questions already exist. Skipping...`);
    }
  }

  console.log("\n✅ Seeding complete.");
}

seed().catch(console.error);
