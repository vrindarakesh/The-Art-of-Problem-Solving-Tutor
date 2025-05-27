// constants.ts
// This file contains constant data used throughout the application, primarily the module definitions.

import { Module, ContentItemType } from './types';
// Importing icon components used for modules.
import { BookOpenIcon, PuzzlePieceIcon, QuestionMarkCircleIcon, LightBulbIcon, BeakerIcon, AcademicCapIcon, CpuChipIcon, AdjustmentsHorizontalIcon, BrainIcon, CodeIcon, ServerIcon, ShieldCheckIcon } from './components/Icons'; 

/**
 * MODULES_DATA
 * An array of Module objects, defining the entire curriculum structure.
 * Each module contains lessons, puzzles, and quizzes.
 */
export const MODULES_DATA: Module[] = [
  {
    id: 'module1',
    title: 'Module 1: Foundations of Computational Thinking',
    description: 'Problem solving, critical thinking, history of computation, binary representations, abstraction, decomposition, algorithms, and pseudocode.',
    longDescription: 'Embark on a journey to understand the core of problem-solving and how computers "think". This module covers critical thinking, the fascinating history of computation, the magic of binary, how data like text and images are represented, and the fundamental CT concepts of abstraction, decomposition, algorithms, and pseudocode.',
    estimatedTime: 'Approx. 2 hours',
    icon: AcademicCapIcon,
    items: [
      {
        id: 'lesson1', 
        type: ContentItemType.LESSON,
        data: {
          title: 'The Grand Adventure of Problem Solving & Critical Thinking',
          pages: [
            {
              title: 'What is Problem Solving?',
              paragraphs: [
                'Ever faced a tricky situation, a challenging game, or a complex task and wondered, "How do I even start?" Problem-solving is a fundamental human skill, something we do every day, often without realizing it! Think about planning a surprise party, figuring out the quickest route to a new place, or even just deciding what to have for dinner based on what\'s in the fridge.',
                'It\'s about identifying an issue, understanding its components, and then finding a way to a desired outcome.'
              ],
              imageUrl: "/images/conceptual/problem_solving_intro.jpg", 
              imageCaption: "Visualizing the journey of problem-solving as a path with challenges.",
            },
            {
              title: 'The Farmer, Fox, Hen, and Grain Puzzle',
              paragraphs: [
                'A classic example to illustrate problem-solving is the "Farmer, Fox, Hen, and Grain" puzzle: A farmer needs to cross a river with a fox, a hen, and a bag of grain. His boat can only carry himself and one item (the fox, the hen, or the grain) at a time. The challenge is that if left unattended together, the fox will eat the hen, and the hen will eat the grain. How can the farmer get everything across the river safely? Take a moment to ponder this!',
                'Below is an interactive version of this puzzle. Try to solve it!',
              ],
              imageUrl: "/images/farmer_fox_hen_grain.jpg", 
              imageCaption: "The farmer must safely transport the fox, hen, and grain across the river.",
              animationComponentName: "RiverCrossingPuzzle", 
            },
            {
                title: 'Thinking Like a Computer: Structuring the Puzzle',
                paragraphs: [
                    'Let\'s think about how we might approach a puzzle like this with a computer in mind. This kind of structured thinking is a cornerstone of computational thinking:',
                    '- **Representing the State:** How would you describe the situation at any point? What key pieces of information do you need to track? (e.g., Where is the farmer? Where is the fox? The hen? The grain? Which side of the river are they on?)',
                    '- **Defining Actions:** What can the farmer do at each step? (e.g., Farmer crosses with Fox, Farmer crosses with Hen, Farmer crosses with Grain, Farmer crosses alone).',
                    '- **Identifying Unsafe Conditions (Constraints):** What combinations are not allowed on either riverbank if the farmer isn\'t there? (e.g., Fox and Hen alone, Hen and Grain alone). How would a program check for these unsafe states?',
                    '- **Defining the Goal:** What does a "solved" puzzle look like? (e.g., All items are on the destination bank).',
                    '- **Exploring Possibilities & Avoiding Cycles:** If you try different sequences of moves, how do you ensure you don\'t just go back and forth in a loop? How can you remember situations (states) you\'ve already seen?',
                ],
                imageUrl: "/images/conceptual/puzzle_structuring_mindmap.jpg", 
                imageCaption: "Mindmap showing how to break down puzzle logic into states, actions, and constraints.",
            },
            {
                title: 'From Puzzles to Programs',
                paragraphs: [
                    'Thinking through these questions helps break the problem down into a logical structure that a computer could potentially work with. This hints at concepts like "state-space search," where a program explores possible states and transitions to find a solution path.',
                    'To visualize this further, you could imagine images like: a simple diagram showing the two riverbanks and tokens for each item (representing a state); an image highlighting an "unsafe" state (e.g., the fox and hen alone on one bank with a red X); or even a tree diagram showing the first few possible moves and their outcomes.',
                ],
                imageUrl: "/images/conceptual/state_space_diagram_concept.jpg", 
                imageCaption: "Conceptual state diagram for a puzzle, showing nodes (states) and edges (actions).",
            },
            {
              title: 'Critical Thinking & Computational Thinking',
              paragraphs: [
                'Underpinning good problem-solving is **Critical Thinking**. This isn\'t about being negative; it\'s about thinking clearly and rationally. It involves analyzing information, evaluating arguments, identifying assumptions, and making reasoned judgments. It\'s like being a detective for your thoughts!',
                '**Computational Thinking (CT)** is a specific kind of problem-solving toolkit. It draws on concepts fundamental to computer science but is applicable everywhere. CT helps us break down large, complex problems into smaller, more manageable parts, recognize patterns, focus on essential details (abstraction), and design step-by-step solutions (algorithms). It\'s a superpower for tackling challenges in any field!',
              ],
              imageUrl: "/images/conceptual/critical_vs_computational_thinking.jpg", 
              imageCaption: "Venn diagram or comparison chart of Critical Thinking and Computational Thinking.",
              pauseForThought: {
                question: "Can you think of a recent problem you solved? How did you break it down, even informally?",
                answerPrompt: "Reflect, then click to see an example thought.",
                answer: "Example: Choosing a new phone. Criteria (breakdown): budget, camera, battery, brand. Research (pattern recognition): compare reviews. Decision (algorithm): weigh pros/cons based on criteria."
              }
            }
          ],
          keyConcepts: ['Problem Solving Basics', 'Classic River Crossing Puzzles', 'Structured Problem Representation', 'State-Space Search (Conceptual)', 'Critical Thinking Defined', 'Computational Thinking (CT) Introduction', 'CT for Everyday Problems'],
        },
      },
      {
        id: 'lesson2', 
        type: ContentItemType.LESSON,
        data: {
          title: 'Echoes from the Past: A Brief History of Computation & The Magic of Binary',
          pages: [
            {
              title: 'Ancient Calculation Tools',
              paragraphs: [
                'The desire to compute, to calculate and process information, is ancient. Early tools like the **Abacus** (around 2700 BCE) helped with arithmetic. The **Antikythera mechanism** (2nd century BCE), an ancient Greek astronomical calculator, shows incredible early mechanical ingenuity, capable of predicting eclipses and celestial positions.',
              ],
              imageUrl: "/images/history/abacus_antikythera_montage.jpg",
              imageCaption: "Ancient calculating devices: Abacus and the intricate Antikythera Mechanism.",
            },
            {
              title: 'The Mechanical Age',
              paragraphs: [
                'In the 17th century, Blaise Pascal created the **Pascaline**, one of the first mechanical calculators capable of addition and subtraction. Gottfried Wilhelm Leibniz, a contemporary, also developed mechanical calculators (that could multiply and divide) and, crucially, refined the binary number system (base-2), which is foundational to modern computers.',
                'The 19th century saw Charles Babbage design the **Analytical Engine**, a general-purpose mechanical computer. While never fully built in his lifetime, its concepts (like an arithmetic logic unit, control flow, and memory) were revolutionary. **Ada Lovelace**, working with Babbage, is often considered the first computer programmer. She envisioned applications for the Analytical Engine beyond mere number-crunching, foreseeing its potential to create music or graphics.',
              ],
              imageUrl: "/images/history/pascal_babbage_lovelace.jpg", 
              imageCaption: "Innovators: Pascal's calculator, Babbage's Analytical Engine design, and Ada Lovelace.",
              animationComponentName: "AnalyticalEngineGearAnimation", 
            },
            {
              title: 'The "Why" of Binary',
              paragraphs: [
                'So, why binary? Early electronic computers used switches (like vacuum tubes or transistors) that could be in one of two states: ON or OFF (representing high or low voltage). Representing 10 states for decimal numbers (0-9) directly with such switches would be very complex and less reliable. Binary, with just two digits (0 and 1), maps perfectly to these ON/OFF states. It\'s simple, robust, and forms the bedrock of all digital information.',
                'We are used to the **decimal system (base-10)**, which uses ten digits (0-9). Binary (base-2) uses only two digits: 0 and 1. For example: Decimal 0 is Binary 0; Decimal 1 is Binary 1; Decimal 2 is Binary 10 (one \'two\' and zero \'ones\'); Decimal 3 is Binary 11 (one \'two\' and one \'one\'); Decimal 5 is Binary 101 (one \'four\', zero \'twos\', and one \'one\').',
              ],
              imageUrl: "/images/conceptual/binary_switch_concept.jpg",
              imageCaption: "Visualizing binary: an ON/OFF switch representing 1 and 0, the foundation of digital logic.",
            }
          ],
          keyConcepts: ['Early Calculation Tools (Abacus, Antikythera)', 'Mechanical Calculators (Pascal, Leibniz)', 'Analytical Engine (Babbage)', 'Ada Lovelace & Early Programming Concepts', 'The Rationale for Binary (ON/OFF States)', 'Number Bases (Decimal vs. Binary)', 'Converting Simple Numbers to Binary'],
        },
      },
      {
        id: 'lesson_binary_representation', 
        type: ContentItemType.LESSON,
        data: {
          title: 'From Bits to Reality: Representing Our World in Binary',
          pages: [
            {
              title: 'The Universal Language of Computers',
              paragraphs: [
                'If everything in a computer is just 0s and 1s (bits), how do we represent complex things like numbers, text, images, sound, and video? It\'s all about agreed-upon systems of encoding! A "bit" is a Binary digIT. A group of 8 bits is called a "byte".',
              ],
              imageUrl: "/images/conceptual/data_representation_overview.jpg", 
              imageCaption: "Abstract visual of diverse data types (text, image, sound) flowing into binary code (0s and 1s).",
            },
            {
              title: 'Representing Numbers',
              paragraphs: [
                '**Numbers:** Positive integers are represented directly in base-2, as we saw. For instance, the decimal number 13 is 1101 in binary (1*8 + 1*4 + 0*2 + 1*1). For negative numbers and numbers with decimal points (floating-point numbers), computers use more complex binary schemes (like "two\'s complement" for negatives and "IEEE 754" for floating-points), but the principle is the same: they are all patterns of 0s and 1s.',
              ],
              imageUrl: "/images/conceptual/binary_numbers_example.jpg", 
              imageCaption: "Decimal 13 shown as the binary sequence 1101, with place values (8, 4, 2, 1).",
              animationComponentName: "DecimalToBinaryConverterAnimation",
            },
            {
              title: 'Representing Text',
              paragraphs: [
                '**Text:** Each character you type is represented by a unique binary code. Early systems used **ASCII (American Standard Code for Information Interchange)**, which uses 7 or 8 bits per character. For example, in ASCII, \'A\' is decimal 65, which is binary 01000001; \'B\' is 66 (01000010); \'a\' is 97 (01100001). ASCII was limited (mostly to English characters), so **Unicode** was developed. Unicode is a much larger standard that can represent almost every character and symbol from nearly all writing systems in the world, each still having a unique binary code (often using 8, 16, or 32 bits per character via encodings like UTF-8).',
              ],
              imageUrl: "/images/conceptual/ascii_unicode_concept.jpg",
              imageCaption: "Concept art: ASCII table evolving into diverse Unicode characters from around the world.",
            },
            {
              title: 'Representing Images',
              paragraphs: [
                '**Images:** Digital images are made of tiny dots called **pixels** (picture elements). Each pixel has a color. For color images, a common system is **RGB**, where the color of a pixel is defined by the intensity of Red, Green, and Blue light. Each intensity is a number (e.g., 0-255), which is then stored in binary. If each color component uses 8 bits (allowing 256 intensity levels, 2<sup>8</sup>=256), then a single pixel needs 24 bits (8 for Red + 8 for Green + 8 for Blue). This is often called "True Color". A whole image is just a long sequence of these binary codes for all its pixels. This is a **bitmap** image. The number of pixels (e.g., 1920x1080) is its resolution.',
              ],
              imageUrl: "/images/conceptual/pixel_grid_rgb.jpg", 
              imageCaption: "Close-up of an image showing individual pixels, each composed of Red, Green, and Blue components.",
              animationComponentName: "PixelGridColorChangeAnimation",
            },
            {
              title: 'Representing Audio',
              paragraphs: [
                '**Audio:** Sound in the real world is an analog wave (continuous). To store it digitally, computers perform **sampling**: they measure the amplitude (loudness/intensity) of the sound wave at regular, frequent intervals (thousands of times per second). Each sample\'s amplitude is converted into a number (a process called quantization), and that number is stored in binary. The number of bits used per sample is the **bit depth** (e.g., 16 bits for CD audio gives 65,536 possible amplitude levels). More bits = better quality, more accurate representation. The number of samples per second is the **sample rate** (e.g., 44,100 Hz or 44,100 samples/second for CD audio).',
              ],
              imageUrl: "/images/conceptual/analog_wave_digital_samples.jpg",
              imageCaption: "Visualizing an analog sound wave being sampled at discrete points, then quantized into digital values.",
            },
            {
              title: 'Representing Video',
              paragraphs: [
                '**Video:** Video is essentially a sequence of still images (called **frames**) displayed rapidly to create the illusion of motion (e.g., 24, 30, or 60 frames per second - FPS). Each frame is a digital image (a grid of pixels, represented in binary as described above). Video files also typically include one or more synchronized audio tracks (also digitized and in binary) and metadata (information about the video, like duration, resolution, etc.).',
              ],
              imageUrl: "/images/conceptual/video_frames_concept.jpg", 
              imageCaption: "Film strip or digital timeline illustrating video as a sequence of individual frames.",
            },
            {
              title: 'The Need for Compression',
              paragraphs: [
                '**Compression (A Quick Mention):** Storing all this data (especially images, audio, and video) in raw binary form would result in enormous files! For example, one minute of uncompressed CD-quality stereo audio can be about 10MB. A single uncompressed high-resolution photo can be many megabytes. So, clever **compression** techniques are used to reduce file sizes by removing redundancy or less perceptible information. Think JPEG for images, MP3 for audio, and MP4/H.264 for video. These techniques themselves are based on algorithms that find patterns or discard data to save space!',
              ],
              imageUrl: "/images/conceptual/data_compression_concept.jpg", 
              imageCaption: "Visual metaphor for data compression (e.g., a large, bulky file being squeezed into a smaller one).",
              pauseForThought: {
                question: "Why is compression so important for everyday use of digital media (like streaming videos or sharing photos)?",
                answerPrompt: "Consider storage and speed, then check our thoughts.",
                answer: "Without compression, files would be too large to store efficiently on devices (phones, computers), and too slow to download or stream over the internet. Much of modern digital media, like YouTube, Netflix, or even sending photos via messages, would be impractical due to massive data sizes and transfer times."
              }
            }
          ],
          keyConcepts: ['Bit & Byte', 'Binary Encoding of Numbers', 'Text Representation (ASCII, Unicode, UTF-8)', 'Image Representation (Pixels, RGB, Bitmap, Resolution)', 'Audio Representation (Sampling, Quantization, Bit Depth, Sample Rate)', 'Video Representation (Frames, Frame Rate, Audio Tracks)', 'Data Compression (Necessity and Examples)'],
        },
      },
      {
        id: 'lesson4', 
        type: ContentItemType.LESSON,
        data: {
          title: 'Seeing the Forest for the Trees: The Power of Abstraction',
          pages: [
            {
              title: 'Hiding Complexity',
              paragraphs: [
                'With all this talk of binary 0s and 1s representing everything, you might wonder how anyone gets anything done! The answer is **Abstraction**. Abstraction is the process of hiding complex details and showing only what\'s necessary or relevant for a particular purpose. It\'s about simplifying things to make them easier to understand and use, managing complexity by focusing on the "what" rather than the "how".',
              ],
              imageUrl: "/images/conceptual/iceberg_abstraction.jpg",
              imageCaption: "Abstraction: like an iceberg, only the essential tip (interface) is visible, while complex details are hidden below.",
            },
            {
              title: 'Abstraction in Everyday Life & Computing',
              paragraphs: [
                'Think about driving a car. You use a steering wheel, accelerator, and brakes. You don\'t need to understand the intricate workings of the engine, transmission, fuel injection system, or combustion process to drive. Those complex details are abstracted away by the car\'s design. You interact with a simplified interface.',
                'In computing, abstraction is everywhere: When you see the letter \'A\' on your screen, you don\'t see the binary code 01000001 that represents it; the operating system and applications abstract that detail away. When you open a file named "mydocument.txt", you don\'t deal with the physical locations on the hard drive where those bits are stored, or how the file system organizes them; the OS provides an abstraction of files and folders.',
              ],
              imageUrl: "/images/conceptual/abstraction_examples_car_file.jpg", 
              imageCaption: "Comparing a car's dashboard (abstraction) to file icons on a computer desktop (abstraction).",
            },
            {
                title: 'Layers of Abstraction',
                paragraphs: [
                    'Even programming languages are levels of abstraction. **Machine Code** (binary instructions) is what the CPU directly executes. **Assembly Language** provides symbolic names for machine instructions, making it slightly more human-readable. **High-level languages** like Python, Java, or JavaScript are much closer to human language and abstract away many details of memory management, hardware interaction, and even the specifics of machine code. Programmers can focus on solving the problem rather than managing tiny hardware details.',
                    'Abstraction helps us manage complexity, build larger and more sophisticated systems, and focus on the problem at hand. It allows us to build upon layers of complexity that have already been solved and simplified by others.',
                ],
                imageUrl: "/images/conceptual/programming_layers.jpg", 
                imageCaption: "Visualizing layers of abstraction in programming: User App -> High-Level Language -> Assembly -> Machine Code -> Hardware.",
                animationComponentName: "ProgrammingLanguageLayersAnimation",
            }
          ],
          keyConcepts: ['Abstraction Definition', 'Information Hiding vs. Detail Hiding', 'Managing Complexity', 'Real-world Examples (Car Interface)', 'Computing Examples (Character display, Files & Folders, GUI)', 'Layers of Abstraction (Programming Languages)'],
        },
      },
      {
        id: 'lesson5', 
        type: ContentItemType.LESSON,
        data: {
          title: 'Divide and Conquer: The Art of Decomposition',
          pages: [
            {
              title: 'Breaking Down Big Problems',
              paragraphs: [
                '**Decomposition** is the art of breaking down a large, complex problem or system into smaller, more manageable, and understandable parts (subproblems or modules). It\'s often the first step in tackling any significant challenge, working hand-in-hand with abstraction.',
                'If abstraction is about ignoring irrelevant details, decomposition is about breaking a problem into relevant, smaller pieces.',
              ],
              imageUrl: "/images/conceptual/decomposition_puzzle_pieces.jpg", 
              imageCaption: "A large, complex jigsaw puzzle being broken into smaller, individual pieces that are easier to manage.",
            },
            {
              title: 'Examples of Decomposition',
              paragraphs: [
                'Imagine you want to build a complex LEGO model of a spaceship. You don\'t try to build it all at once. You look at the instructions, which typically break the spaceship down into smaller sections (e.g., the cockpit, the wings, the engines). You build these sub-assemblies first, and then you combine them to form the complete model. Each sub-assembly is a decomposed part of the larger problem.',
                'Another example: planning a school festival. This big task can be decomposed into: finding a venue, arranging food and drinks, planning activities and entertainment, marketing the event, managing a budget, and organizing volunteers. Each of *these* tasks can be further decomposed. "Activities" could break down into "live music," "games," and "contests."',
              ],
              imageUrl: "/images/conceptual/lego_decomposition.jpg",
              imageCaption: "Decomposition visualized: A complex LEGO model with callouts to its smaller, buildable sub-assemblies.",
            },
            {
                title: 'Benefits and Data Decomposition',
                paragraphs: [
                    'By decomposing a problem, each smaller part can be examined, solved, or designed independently. This makes the overall problem less overwhelming, easier to understand, and allows different people or teams to work on different parts simultaneously.',
                    'Even data can be decomposed. A complex video file, as we learned, is decomposed into a video stream (frames), one or more audio streams, subtitles, and metadata. Each component can be processed or handled separately. In programming, a large application is often broken down into smaller functions, classes, or modules.',
                ],
                imageUrl: "/images/conceptual/event_planning_mindmap.jpg", 
                imageCaption: "Mind map illustrating decomposition in event planning, showing tasks branching into sub-tasks.",
                animationComponentName: "EventPlanningChartAnimation",
            }
          ],
          keyConcepts: ['Decomposition Definition', 'Breaking Down Problems into Subproblems', 'Modules/Sub-assemblies', 'Managing Complexity through Division', 'Real-world Examples (LEGO, Event Planning)', 'Decomposing Data (e.g., Video File)', 'Decomposition in Programming (Functions, Modules)'],
        }
      },
      {
        id: 'puzzle1', 
        type: ContentItemType.PUZZLE,
        data: {
          title: 'Puzzle: The Super Precise Sandwich Algorithm',
          problemStatement: [
            'Your robot friend is back! It needs your help to make a peanut butter and jelly sandwich. This time, remember, the robot takes everything **literally** and has some limitations.',
            'Consider these: The robot only has one usable hand. It doesn\'t know what "a little bit" or "spread evenly" means unless you define it. It needs exact measurements if you use them. It doesn\'t know how to "get" items unless their location is specified or knowable.',
            'Your task: Write an *even more* precise, step-by-step algorithm. Think about every single action, every tool, every ingredient, and every possible point of confusion for a literal-minded robot.'
          ],
          imageUrl: "/images/conceptual/robot_making_sandwich.jpg", 
          interactivePrompt: 'Write your super-precise sandwich-making algorithm. Imagine you are programming a robot that has no prior knowledge of cooking or common sense. Specify locations and precise actions.',
          hints: [
            'What are all the tools needed (and where are they, e.g., "knife from drawer A")?',
            'How does the robot pick up a slice of bread with one hand?',
            'How do you define "scoop X amount of peanut butter"? (e.g., "insert tip of knife 1cm into peanut butter at a 45-degree angle, rotate knife 90 degrees, lift knife")',
            'How do you define "spread"? (e.g., "place knife with peanut butter on surface of bread slice A. move knife horizontally from left edge to right edge. move knife down 1cm. move knife horizontally from right edge to left edge. repeat until 90% of surface is covered.")',
            'Don\'t forget opening and closing containers, and potentially cleaning up!'
          ],
          solutionSteps: [
            '1. STATE: Robot at workstation. Plate, bread bag, peanut butter jar, jelly jar, knife1, knife2 on workstation.',
            '2. ACTION: Robot identify bread bag. Robot grip bread bag tie with hand. Robot untwist bread bag tie. Robot place tie on workstation.',
            '3. ACTION: Robot insert hand into bread bag opening. Robot grasp one slice of bread (bread_slice_A). Robot withdraw hand with bread_slice_A. Robot place bread_slice_A on plate.',
            '4. ACTION: Robot insert hand into bread bag opening. Robot grasp second slice of bread (bread_slice_B). Robot withdraw hand with bread_slice_B. Robot place bread_slice_B on plate, not overlapping bread_slice_A.',
            '5. ACTION: Robot identify peanut butter jar. Robot grip peanut butter jar body with part of hand. Robot grip peanut butter jar lid with other part of hand. Robot rotate lid counter-clockwise until lid is free from jar. Robot place lid on workstation.',
            '6. ACTION: Robot identify knife1. Robot grip handle of knife1.',
            '7. ACTION: Robot position tip of knife1 over opening of peanut butter jar. Robot lower knife1 2cm vertically into peanut butter. Robot tilt knife1 to 30-degree angle. Robot lift knife1, acquiring approximately 10ml of peanut butter.',
            '8. ACTION: Robot position knife1 (peanut butter side down) over top-left corner of bread_slice_A.',
            '9. ACTION: Robot move knife1 from left edge to right edge of bread_slice_A. Robot move knife1 1cm towards bottom edge. Robot move knife1 from right edge to left edge. Repeat 3 times or until 90% of surface has peanut butter.',
            '10. ACTION: Robot place knife1 on designated "used utensils" spot on workstation.',
            '11. ACTION: Repeat steps 5-10 for jelly jar and knife2, applying to bread_slice_B. Define "jelly amount" (e.g., 8ml) and "spreading jelly" similarly.',
            '12. ACTION: Robot grip bread_slice_A (peanut butter side).',
            '13. ACTION: Robot lift bread_slice_A. Robot rotate bread_slice_A 180 degrees (peanut butter side down). Robot position bread_slice_A directly above bread_slice_B.',
            '14. ACTION: Robot gently lower bread_slice_A onto bread_slice_B, ensuring edges align within 1cm tolerance.',
            '15. GOAL: Sandwich complete. (Optional Cleanup: "Robot grip bread bag tie. Robot twist bread bag tie onto bread bag opening." etc. for jars).',
          ],
        },
      },
      {
        id: 'lesson6', 
        type: ContentItemType.LESSON,
        data: {
          title: 'Spotting the Similarities - Pattern Recognition',
          pages: [
            {
                title: 'What is Pattern Recognition?',
                paragraphs: [
                    '**Pattern Recognition** is a fundamental component of computational thinking. It involves finding similarities, regularities, or repeated sequences, either within a single complex problem or across multiple different problems. Humans are natural pattern-matchers – we see faces in clouds or recognize a friend\'s walk from a distance.',
                ],
                imageUrl: "/images/conceptual/pattern_recognition_nature_art.jpg",
                imageCaption: "Patterns in nature (like a nautilus shell) and art (like tessellations) often inspire computational pattern recognition."
            },
            {
                title: 'Patterns in Daily Life & Problem Solving',
                paragraphs: [
                    'If you make cereal every morning, you follow a pattern (algorithm): get bowl, get cereal, pour cereal, get milk, pour milk. If you are troubleshooting why your computer won\'t turn on, you might follow a pattern of checks: Is it plugged in? Is the monitor on? Did I try restarting? These are sequences of actions that have worked before for similar situations.',
                    'Recognizing patterns helps us to:',
                    '- **Predict:** Anticipate what might happen next.',
                    '- **Generalize:** Develop solutions that can solve a whole class of similar problems, not just one instance.',
                    '- **Optimize:** Make problem-solving processes more efficient by reusing known solutions or parts of solutions.',
                    'In coding, you\'ll find many common "design patterns" for solving recurring types of tasks. Even in data compression (mentioned earlier!), finding patterns (like repeated sequences of characters or common pixel arrangements) is key to reducing file size.',
                ],
                imageUrl: "/images/conceptual/daily_patterns_coffee_code.jpg", 
                imageCaption: "Visualizing daily routines (like making coffee) and recognizing recurring patterns in code structures.",
                animationComponentName: "DataCompressionPatternViz",
            }
          ],
          keyConcepts: ['Pattern Recognition Definition', 'Identifying Similarities & Regularities', 'Predicting & Generalizing from Patterns', 'Efficiency through Pattern Reuse', 'Patterns in Data (Compression Link)', 'Design Patterns in Coding (Conceptual)'],
        }
      },
      {
        id: 'lesson7', 
        type: ContentItemType.LESSON,
        data: {
          title: 'The Blueprint for Solutions - What is an Algorithm?',
          pages: [
            {
                title: 'Defining Algorithms',
                paragraphs: [
                    'An **algorithm** is a well-defined, step-by-step procedure or set of rules for solving a specific problem or accomplishing a particular task. Think of it as a perfect recipe that, if followed exactly by someone (or a computer) with the basic capabilities, always produces the desired result.',
                    'Algorithms are the core of computer programming and are essential for telling computers how to perform tasks.',
                ],
                imageUrl: "/images/conceptual/algorithm_recipe_analogy.jpg", 
                imageCaption: "An algorithm compared to a precise, unambiguous recipe for baking a cake.",
            },
            {
                title: 'Characteristics of Good Algorithms',
                paragraphs: [
                    'Effective algorithms typically have key characteristics:',
                    '- **Input:** They take zero or more inputs (ingredients, data, starting conditions).',
                    '- **Output:** They produce at least one output (the result, the finished dish, the solution).',
                    '- **Definiteness:** Each step must be precisely and unambiguously defined. There should be no room for interpretation (No "add a pinch of salt" unless "pinch" is explicitly defined!).',
                    '- **Finiteness:** An algorithm must eventually stop after a finite number of steps. It shouldn\'t run forever.',
                    '- **Effectiveness:** Each step must be simple enough that it can, in principle, be carried out exactly by a human using pencil and paper, or by a basic computer operation.',
                    '(Optional: **Correctness:** The algorithm should produce the correct output for all valid inputs.)',
                ],
                imageUrl: "/images/conceptual/algorithm_flowchart_characteristics.jpg",
                imageCaption: "Conceptual flowchart symbols illustrating input, process, output, decision, and termination (finiteness, definiteness, effectiveness)."
            },
            {
                title: 'Examples of Algorithms',
                paragraphs: [
                    'Examples include: a recipe for baking a cake, instructions for assembling furniture, the process your GPS uses to find the shortest route, or the way a search engine ranks websites. The "Super Precise Sandwich Algorithm" you worked on earlier is another prime example!',
                    'Developing good algorithms is a crucial skill in computer science and many other fields.',
                ],
                imageUrl: "/images/conceptual/algorithm_examples_montage.jpg", 
                imageCaption: "Montage of everyday algorithms: recipe, assembly instructions, GPS navigation route.",
                pauseForThought: {
                  question: "Can you think of an algorithm you use in your daily life, even if it's not related to computers?",
                  answerPrompt: "Consider routines and step-by-step tasks you perform.",
                  answer: "Getting ready for school/work: 1. Wake up. 2. Brush teeth. 3. Get dressed. 4. Eat breakfast. 5. Gather belongings. 6. Leave the house. This is a sequence of defined steps to achieve a goal."
                }
            }
          ],
          keyConcepts: ['Algorithm Definition', 'Key Characteristics (Input, Output, Definiteness, Finiteness, Effectiveness)', 'Correctness (Optional)', 'Real-world & Computing Algorithm Examples'],
        },
      },
      {
        id: 'puzzle2', 
        type: ContentItemType.PUZZLE,
        data: {
          title: 'Puzzle: The Light Switch Grid',
          problemStatement: [
            'You are faced with a 3x3 grid of light switches. Each switch can be either ON or OFF.',
            'When you toggle any switch, it changes its own state (ON to OFF, or OFF to ON). Additionally, it also flips the state of its direct neighbors (the switches immediately above, below, left, or right of it – but not diagonally adjacent).',
            'All switches start in the OFF position. Your goal is to find a sequence of toggles that will result in all nine switches being in the ON position.'
          ],
          imageUrl: "/images/conceptual/light_switch_grid_puzzle.jpg", 
          interactivePrompt: 'Describe the sequence of switches you would toggle (e.g., "Toggle Top-Left, then Middle-Center..."). You can refer to them by row/column (Top/Mid/Bot, Left/Mid/Right) or number them 1-9 (row by row).',
          hints: [
            'What happens if you toggle the same switch twice? (It\'s like not toggling it at all for its final state).',
            'Does the order in which you toggle a specific set of chosen switches affect the final state of the lights? (No, it doesn\'t).',
            'Consider a simpler 1x2 or 2x2 grid first to understand the mechanics.',
            'Think about how many times each light needs to be "affected" by a toggle to go from OFF to ON. (An odd number of times).',
            'This puzzle has connections to linear algebra over a field of two elements (GF(2)), but can be solved with logical trial and error too!'
          ],
          solutionSteps: [
            'Goal: Each switch starts OFF and needs to end ON. This means each switch must be affected an ODD number of times.',
            'Observation 1: Toggling a switch twice is equivalent to not toggling it at all in terms of its final state and its neighbors\' final states.',
            'Observation 2: The order of toggles for a chosen set of switches doesn\'t change the final outcome, only WHICH switches are toggled does.',
            'Strategy Hint: Focus on the effect of toggling a switch on its neighbors. Consider the center switch. Toggling it affects 5 switches.',
            'A Possible Solution (One of several): Toggle the switches at positions (Row, Col): (1,1), (1,3), (2,2), (3,1), (3,3). (Top-Left, Top-Right, Middle-Center, Bottom-Left, Bottom-Right).',
            'Another Solution: Toggle all switches in the "cross" pattern: (1,2), (2,1), (2,2), (2,3), (3,2). (Top-Mid, Mid-Left, Mid-Center, Mid-Right, Bot-Mid).',
            'Verification: Trace the effect of your chosen sequence. For each switch, count how many times it was either directly toggled or flipped by a neighbor. This count should be odd for all nine switches.',
          ],
        },
      },
      {
        id: 'lesson8', 
        type: ContentItemType.LESSON,
        data: {
          title: 'Writing It Down - Introduction to Pseudocode & Control Flow',
          pages: [
            {
                title: 'Bridging Ideas and Code',
                paragraphs: [
                    'Once we have an algorithm in mind, we need a way to write it down clearly before translating it into a specific programming language. Plain English can be ambiguous. Actual programming languages are very strict about syntax.',
                    '**Pseudocode** ("fake code") is a happy medium! It\'s an informal, high-level description of an algorithm\'s operating principle. It uses plain English mixed with common programming language structures to outline an algorithm without getting bogged down in the exact syntax of any particular language. It focuses on the logic.',
                ],
                imageUrl: "/images/conceptual/idea_pseudocode_code_bridge.jpg", 
                imageCaption: "Visual bridge: An idea lightbulb -> a structured pseudocode document -> a computer screen with actual code.",
                animationComponentName: "IdeaToPseudocodeToCodeAnimation",
            },
            {
                title: 'Common Pseudocode Keywords & Control Flow',
                paragraphs: [
                    'Common Pseudocode Keywords:',
                    '- `INPUT variable` or `GET variable` (e.g., `INPUT username`)',
                    '- `SET variable TO value` or `variable = value` (e.g., `SET count TO 0`)',
                    '- `OUTPUT value` or `DISPLAY value` (e.g., `DISPLAY "Hello, " + username`)',
                    '- `IF condition THEN ... ELSE ... ENDIF` (for decisions)',
                    '- `WHILE condition DO ... ENDWHILE` (for loops that repeat as long as a condition is true)',
                    '- `FOR variable FROM start_value TO end_value DO ... ENDFOR` (for loops that repeat a specific number of times)',
                    '- `FOR EACH item IN collection DO ... ENDFOR` (for iterating over items in a list or set)',
                    '- `CALL function_name(arguments)` (for using sub-procedures)',
                    'These structures define the **control flow** – the order in which steps are executed. Algorithms can be sequential (step after step), conditional (branching based on decisions), or involve repetition (looping).',
                ],
                imageUrl: "/images/conceptual/control_flow_structures.jpg",
                imageCaption: "Visual depiction of sequential (straight line), conditional (IF/ELSE branching diamond), and repetitive (looping arrow) control flow structures."
            },
            {
                title: 'Example: Simple Greeting Algorithm in Pseudocode',
                paragraphs: [
                    'Let\'s write pseudocode for an algorithm that asks for a user\'s name and greets them:',
                    '```',
                    'ALGORITHM GreetUser',
                    '  OUTPUT "What is your name?"',
                    '  INPUT userName',
                    '  IF userName IS EMPTY THEN',
                    '    OUTPUT "Hello, stranger!"',
                    '  ELSE',
                    '    OUTPUT "Hello, " + userName + "!"',
                    '  ENDIF',
                    'END ALGORITHM',
                    '```',
                    'This is much clearer than just saying "ask for name and say hello," and it\'s easier to translate into Python, JavaScript, or any other language than starting directly with complex code.',
                ],
                imageUrl: "/images/conceptual/pseudocode_example_greeting.jpg", 
                imageCaption: "A snippet of the 'GreetUser' pseudocode example, visually formatted."
            }
          ],
          keyConcepts: ['Pseudocode Purpose (Bridging ideas and code)', 'Informal, High-Level Description', 'Common Pseudocode Keywords (INPUT, SET, OUTPUT, IF/ELSE, WHILE, FOR)', 'Control Flow (Sequential, Conditional, Repetitive)', 'Benefits of Pseudocode (Clarity, Language-Agnostic)'],
        }
      },
      {
        id: 'quiz1', 
        type: ContentItemType.QUIZ,
        data: {
          title: 'Module 1 Quiz: Thinking & Early Computation',
          question: 'Who is often considered the first computer programmer for their work on Charles Babbage\'s Analytical Engine, envisioning its use beyond mere calculations?',
          options: [
            { text: 'Blaise Pascal', isCorrect: false },
            { text: 'Ada Lovelace', isCorrect: true },
            { text: 'Gottfried Wilhelm Leibniz', isCorrect: false },
            { text: 'An Abacus Designer', isCorrect: false },
          ],
          explanation: 'Ada Lovelace, through her detailed notes on the Analytical Engine, described how it could perform tasks beyond arithmetic, effectively creating conceptual programs. This makes her widely regarded as the first computer programmer.',
          relatedLessonIds: ['module1_lesson1', 'module1_lesson2'],
        },
      },
      {
        id: 'quiz_binary_representation', 
        type: ContentItemType.QUIZ,
        data: {
          title: 'Module 1 Quiz: Binary Representations',
          question: 'If the color of a pixel in an RGB image is represented by 8 bits for Red, 8 bits for Green, and 8 bits for Blue, how many total bits are used for that pixel\'s color, and how many different colors can this represent?',
          options: [
            { text: '8 bits, 256 colors', isCorrect: false },
            { text: '16 bits, 65,536 colors', isCorrect: false },
            { text: '24 bits, over 16 million colors', isCorrect: true },
            { text: '3 bits, 8 colors', isCorrect: false },
          ],
          explanation: 'In an RGB color model where each component (Red, Green, Blue) uses 8 bits, the total number of bits for one pixel is 8 (Red) + 8 (Green) + 8 (Blue) = 24 bits. This allows for 2^24 (which is 16,777,216) different colors.',
          relatedLessonIds: ['module1_lesson_binary_representation'],
        },
      },
       {
        id: 'quiz2', 
        type: ContentItemType.QUIZ,
        data: {
          title: 'Module 1 Quiz: Abstraction & Decomposition',
          question: 'Hiding the complex internal workings of a car\'s engine and providing a simple steering wheel and pedals for the driver is primarily an example of which Computational Thinking concept?',
          options: [
            { text: 'Pattern Recognition', isCorrect: false },
            { text: 'Decomposition', isCorrect: false },
            { text: 'Algorithm Design', isCorrect: false },
            { text: 'Abstraction', isCorrect: true },
          ],
          explanation: 'Abstraction is the process of hiding complex details to simplify interaction and focus on essential features. The car example perfectly illustrates this by hiding engine complexity from the driver, providing a simpler interface.',
          relatedLessonIds: ['module1_lesson4', 'module1_lesson5'],
        },
      },
      {
        id: 'quiz3', 
        type: ContentItemType.QUIZ,
        data: {
          title: 'Module 1 Quiz: Algorithms',
          question: 'Which characteristic of an algorithm ensures that each step is precisely and unambiguously defined, leaving no room for interpretation?',
          options: [
            { text: 'Finiteness (must terminate)', isCorrect: false },
            { text: 'Effectiveness (steps are basic enough)', isCorrect: false },
            { text: 'Definiteness (clear, unambiguous steps)', isCorrect: true },
            { text: 'Input/Output (takes input, produces output)', isCorrect: false },
          ],
          explanation: 'Definiteness means each step of an algorithm must be clear, precise, and have only one interpretation, leaving no room for ambiguity. Finiteness means it must end. Effectiveness means steps are doable.',
          relatedLessonIds: ['module1_lesson7'],
        },
      },
      {
        id: 'quiz4', 
        type: ContentItemType.QUIZ,
        data: {
          title: 'Module 1 Quiz: Pseudocode',
          question: 'Which of the following pseudocode constructs is typically used for repeating a block of statements as long as a certain condition remains true?',
          options: [
            { text: 'IF condition THEN ... ELSE ... ENDIF', isCorrect: false },
            { text: 'WHILE condition DO ... ENDWHILE', isCorrect: true },
            { text: 'SET variable TO value', isCorrect: false },
            { text: 'OUTPUT "message"', isCorrect: false },
          ],
          explanation: 'The WHILE...DO...ENDWHILE construct is used for loops that continue to execute as long as a specified condition evaluates to true. IF...THEN...ELSE is for decisions (conditional flow).',
          relatedLessonIds: ['module1_lesson8'],
        },
      }
    ],
  },
  {
    id: 'module2',
    title: 'Module 2: Algorithmic Adventures & Data Structures',
    description: 'Exploring algorithms, their visual representation, efficiency, and fundamental data structures.',
    longDescription: 'Dive deeper into algorithms, the heart of computational thinking. Learn about algorithmic strategies, visual representation with flowcharts, and begin to analyze algorithm efficiency. This module also introduces fundamental data structures like arrays and linked lists, which are crucial for effective algorithm design.',
    estimatedTime: 'Approx. 3 hours',
    icon: PuzzlePieceIcon,
    items: [
      {
        id: 'lesson1',
        type: ContentItemType.LESSON,
        data: {
          title: 'Algorithms Revisited: Strategies & Efficiency',
          pages: [
            {
              title: 'The Core of Problem Solving',
              paragraphs: [
                'Recall from Module 1 that an algorithm is a finite sequence of well-defined, implementable instructions to solve a class of problems or perform a computation.',
                'Now, we\'ll explore how algorithms are constructed and how different problems might require different **algorithmic strategies** (e.g., brute force, divide and conquer, greedy algorithms). We will also start to think about how "good" an algorithm is – not just if it works (correctness), but if it works **efficiently** in terms of time and space (memory) used.',
                'Key characteristics (recap): Finiteness, Definiteness, Input, Output, Effectiveness. We now add Correctness and Efficiency to our considerations.'
              ],
              imageUrl: "/images/conceptual/algorithm_revisited_gears.jpg", 
              imageCaption: "Gears meshing to represent the mechanics of an algorithm, with new gears for 'Efficiency' and 'Strategy'.",
            },
            {
                title: 'Measuring Efficiency: Big O Notation (Gentle Intro)',
                paragraphs: [
                    'How do we compare algorithms? We often use **Big O notation** to describe an algorithm\'s efficiency as the input size grows. It tells us about the growth rate of the algorithm\'s running time or space requirements.',
                    'For example:',
                    '- O(1) - Constant time: Same time regardless of input size (e.g., accessing an array element by index).',
                    '- O(log N) - Logarithmic time: Time increases slowly as input size grows (e.g., binary search).',
                    '- O(N) - Linear time: Time increases proportionally to input size (e.g., searching an unsorted list).',
                    '- O(N<sup>2</sup>) - Quadratic time: Time increases by the square of input size (e.g., some simple sorting algorithms like bubble sort).',
                    '- O(2<sup>N</sup>) - Exponential time: Time increases very rapidly; often impractical for large inputs (e.g., a naive recursive Fibonacci).',
                    'Don\'t worry about mastering Big O now, just understand that it\'s a way to talk about how "scalable" an algorithm is.',
                ],
                imageUrl: "/images/conceptual/big_o_complexity_chart.jpg",
                imageCaption: "A chart showing different Big O complexity curves (O(1), O(logN), O(N), O(N^2), O(2^N)).",
            }
          ],
          keyConcepts: ['Algorithm Definition (Recap)', 'Algorithmic Strategies (Intro)', 'Algorithm Efficiency (Time & Space)', 'Big O Notation (Conceptual Introduction)', 'Common Complexity Classes (O(1), O(N), O(N^2), O(2^N))'],
        },
      },
      {
        id: 'puzzle1', 
        type: ContentItemType.PUZZLE,
        data: {
          title: 'Puzzle: Tower of Hanoi - Recursive Solution',
          problemStatement: [
            'The Tower of Hanoi is a mathematical puzzle that consists of three rods and a number of disks of different sizes, which can slide onto any rod. The puzzle starts with the disks in a neat stack in ascending order of size on one rod, the smallest at the top, thus making a conical shape.',
            'The objective of the puzzle is to move the entire stack to another rod, obeying the following simple rules:',
            '1. Only one disk can be moved at a time.',
            '2. Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod.',
            '3. No larger disk may be placed on top of a smaller disk.',
            'Challenge: Understand and visualize the classic recursive algorithm to solve the Tower of Hanoi. This puzzle uses O(2<sup>N</sup>) time complexity.'
          ],
          interactivePrompt: 'Adjust the number of disks (1-7) and watch the recursive solution unfold. Observe the pattern of moves.',
          hints: [
            'To move N disks from Source rod to Destination rod using Auxiliary rod:',
            '1. Recursively move N-1 disks from Source to Auxiliary, using Destination as the temporary "other" rod.',
            '2. Move the Nth (largest) disk from Source to Destination.',
            '3. Recursively move the N-1 disks from Auxiliary to Destination, using Source as the temporary "other" rod.',
            'What is the base case for the recursion? (When N=1 disk).'
          ],
          solutionSteps: [ 
            'Base Case: If there is only 1 disk (N=1), move it directly from the source rod to the destination rod.',
            'Recursive Step for N disks from Source (S) to Destination (D) using Auxiliary (A):',
            '1. Solve Hanoi for N-1 disks: Move N-1 disks from S to A, using D as the auxiliary rod.',
            '2. Move the Nth (largest) disk directly from S to D.',
            '3. Solve Hanoi for N-1 disks: Move the N-1 disks from A to D, using S as the auxiliary rod.',
            'Example for 3 disks (Rod A to Rod C, Rod B is auxiliary):',
            '  1. Move disk 1 from A to C. (Recursive call for N=1, from A to C using B)',
            '  2. Move disk 2 from A to B. (Move Nth disk for N=2 problem)',
            '  3. Move disk 1 from C to B. (Recursive call for N=1, from C to B using A)',
            '  4. Move disk 3 from A to C. (Move Nth disk for N=3 problem)',
            '  5. Move disk 1 from B to A. (Recursive call for N=1, from B to A using C)',
            '  6. Move disk 2 from B to C. (Move Nth disk for N=2 problem, sub-part of step 3 for N=3)',
            '  7. Move disk 1 from A to C. (Recursive call for N=1, from A to C using B)',
            'The minimum number of moves is 2<sup>N</sup> - 1.'
          ],
        },
      },
      {
        id: 'puzzle2', 
        type: ContentItemType.PUZZLE,
        data: {
          title: 'Puzzle: Two Sum - Exploring Algorithms',
          problemStatement: [
            "Given a non-empty, input array of distinct integers, and a target value, find two separate integers from the array whose sum is equal to the target value.",
            "For example, if the array is [3, 5, -4, 8, 11, 1, -1, 6] and the target sum is 10, your function should return [-1, 11] (or [11, -1]) as -1 + 11 = 10.",
            "This puzzle allows you to visualize and compare three different algorithmic approaches: Brute Force (O(N<sup>2</sup>)), Two Pointers (O(N log N) due to sorting, then O(N)), and Hash Map (O(N) on average)."
          ],
          interactivePrompt: 'Enter an array of numbers (comma-separated) and a target sum. Then select an algorithm (Brute Force, Two Pointers, Hash Map) to see it in action!', 
          hints: [
            'Brute Force: Check every possible unique pair of numbers. How many pairs are there?',
            'Two Pointers: First, sort the array. Then, use one pointer starting at the beginning and another at the end. Move them inwards based on whether their sum is too small, too large, or equal to the target.',
            'Hash Map (or Set): Iterate through the array. For each number `x`, calculate its complement `y = target - x`. Check if `y` is already in your hash map. If yes, you found a pair! If no, add `x` to the hash map and continue.'
          ],
          solutionSteps: [ 
            '1. Brute Force Approach (O(N<sup>2</sup>) time, O(1) space):',
            '   Use nested loops. The outer loop picks the first number, the inner loop picks the second.',
            '   For each pair, check if their sum equals the target. If so, return the pair.',
            '2. Two Pointers Approach (O(N log N) time for sort + O(N) for pointers = O(N log N) overall, O(1) or O(N) space depending on sort):',
            '   Sort the input array.',
            '   Initialize a left pointer at the start (index 0) and a right pointer at the end (index N-1).',
            '   While left pointer is less than right pointer:',
            '     Calculate currentSum = array[left] + array[right].',
            '     If currentSum == targetSum, return [array[left], array[right]].',
            '     If currentSum < targetSum, increment the left pointer (to increase the sum).',
            '     If currentSum > targetSum, decrement the right pointer (to decrease the sum).',
            '3. Hash Map (Hash Set) Approach (O(N) time on average, O(N) space):',
            '   Create an empty hash map (or hash set) to store numbers encountered so far.',
            '   Iterate through each number `num` in the input array:',
            '     Calculate `complement = targetSum - num`.',
            '     If `complement` is found in the hash map, then `num` and `complement` form the pair. Return them.',
            '     Otherwise, add `num` to the hash map.',
            'If no pair is found by any method, return an indication of failure (e.g., an empty array).',
          ],
        },
      },
      {
        id: 'puzzle_fibonacci',
        type: ContentItemType.PUZZLE,
        data: {
          title: 'Puzzle: Visualizing Fibonacci Algorithms & Efficiency',
          problemStatement: [
            "The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1. That is, F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.",
            "Your challenge is to explore and visualize different algorithmic approaches to calculate Fibonacci numbers, paying attention to their efficiency:",
            "- The naive recursive approach (O(2<sup>N</sup>)) and its call tree.",
            "- An iterative (loop-based) approach (O(N) time, O(1) space).",
            "- An optimized approach using memoization (Top-Down Dynamic Programming) (O(N) time, O(N) space)."
          ],
          imageUrl: "/images/conceptual/fibonacci_algorithms_overview.jpg",
          interactivePrompt: "Select an algorithm and a value for 'n' to see how the Fibonacci number is calculated and visualized. Pay attention to the number of operations (calls) and the structure of each approach.",
          hints: [
            "Recursive: Define base cases for F(0) and F(1). For F(n), it calls itself for F(n-1) and F(n-2). Notice the repeated calculations in the tree for larger 'n'.",
            "Iterative: Use a loop. Keep track of the previous two Fibonacci numbers (e.g., `a` and `b`) to calculate the current one. This avoids redundant calculations.",
            "Memoization (Top-Down DP): Use the recursive structure but store the results of already computed Fibonacci numbers (e.g., in an array or map called `memo`). Before computing F(i), check if it's in `memo`. If so, return the stored value. If no, it computes F(i) recursively, stores the result in `memo`, and then returns it. This drastically reduces repeated calls."
          ],
          solutionSteps: [
            "1. Recursive Approach (Exponential Time): Directly translates the mathematical definition. Base cases: F(0) = 0, F(1) = 1. Recursive step: F(n) = F(n-1) + F(n-2). Visualized as a tree of calls. Becomes very inefficient for larger 'n' due to re-calculating the same Fibonacci numbers multiple times.",
            "2. Iterative Approach (Linear Time, Constant Space): Start with F(0)=0 (let's call it `a`) and F(1)=1 (let's call it `b`). Use a loop from 2 up to `n`. In each iteration, calculate the next Fibonacci number `current = a + b`, then update `a = b` and `b = current`. This is much more efficient as it calculates each Fibonacci number only once.",
            "3. Memoized Recursive Approach (Linear Time, Linear Space - Top-Down Dynamic Programming): Uses the recursive structure but adds a 'memo' (e.g., an array or dictionary) to store results. Before computing F(i), it checks if F(i) is already in `memo`. If yes, it returns the stored value. If no, it computes F(i) recursively, stores the result in `memo`, and then returns it. This avoids redundant recursive calls, making it as efficient as the iterative approach in terms of time for computed values.",
            "Note on Tabulated Iterative Approach (Bottom-Up Dynamic Programming): This is very similar to the standard iterative approach but often explicitly uses an array (or table) to store all Fibonacci numbers from F[0] up to F[n]. F[i] = F[i-1] + F[i-2]. This is also O(N) time and O(N) space if the whole array is stored."
          ],
        },
      },
      {
        id: 'lesson2',
        type: ContentItemType.LESSON,
        data: {
          title: 'Introduction to Data Structures: Arrays & Linked Lists',
          pages: [
            {
              title: 'What are Data Structures?',
              paragraphs: [
                'A **Data Structure** is a specialized format for organizing, processing, retrieving, and storing data. Different data structures are suited to different kinds of applications, and some are highly specialized for specific tasks.',
                'Choosing the right data structure can significantly impact the efficiency of your algorithms. They provide a way to manage large amounts of data efficiently for uses such as large databases and internet indexing services.'
              ],
              imageUrl: "/images/conceptual/data_structures_overview.jpg", 
              imageCaption: "Abstract visualization of different data structures (array, list, tree, graph) interconnected.",
            },
            {
                title: 'Arrays',
                paragraphs: [
                    'An **Array** is one of the simplest and most widely used data structures. It\'s a collection of items stored at contiguous (adjoining) memory locations. Each item in an array is identified by an **index** (usually starting from 0).',
                    '**Characteristics:**',
                    '- Elements are of the same type (in many statically-typed languages).',
                    '- Direct access to elements using their index (e.g., `myArray[5]`) is very fast (O(1) - constant time).',
                    '- Size is often fixed at creation (static arrays), though dynamic arrays can resize (which can be costly).',
                    '- Inserting or deleting elements in the middle can be slow (O(N)) because other elements may need to be shifted.',
                    'Arrays are great for storing collections of items when you know the size beforehand and need fast access by position.',
                ],
                imageUrl: "/images/conceptual/array_structure.jpg",
                imageCaption: "A visual representation of an array with indexed cells containing data.",
                animationComponentName: "ArrayAccessAnimation",
            },
            {
                title: 'Linked Lists',
                paragraphs: [
                    'A **Linked List** is a linear data structure where elements are not stored at contiguous memory locations. Instead, elements are linked using pointers. Each element (called a **node**) consists of two parts:',
                    '1. **Data:** The actual value stored in the node.',
                    '2. **Pointer (or Link/Next):** An address that points to the next node in the sequence. The last node typically points to NULL.',
                    '**Characteristics:**',
                    '- Dynamic size: Can easily grow or shrink during runtime.',
                    '- Efficient insertion/deletion: Adding or removing nodes is generally faster (O(1) if at head/tail or with direct pointer, O(N) to find node) than arrays, as no elements need to be shifted, just pointers updated.',
                    '- No direct access: To access an element at a specific position, you must traverse the list from the beginning (O(N) time).',
                    '- Requires extra memory for pointers.',
                    'Types include Singly Linked Lists (nodes point to next), Doubly Linked Lists (nodes point to next and previous), and Circular Linked Lists.',
                ],
                imageUrl: "/images/conceptual/linked_list_structure.jpg",
                imageCaption: "A visual representation of a linked list with nodes containing data and pointers to the next node.",
                animationComponentName: "LinkedListTraversalAnimation",
            },
            {
                title: 'Arrays vs. Linked Lists',
                paragraphs: [
                    '**Choose Array when:**',
                    '- You need fast random access to elements by index.',
                    '- The size of the collection is relatively fixed or known.',
                    '- Memory is a concern (arrays are generally more memory-compact than linked lists).',
                    '**Choose Linked List when:**',
                    '- You need frequent insertions and deletions of elements.',
                    '- The size of the collection is dynamic and unpredictable.',
                    '- You don\'t need frequent random access to elements.',
                    'Understanding these trade-offs is key to efficient algorithm design.',
                ],
                imageUrl: "/images/conceptual/array_vs_linked_list.jpg",
                imageCaption: "Side-by-side comparison table or visual highlighting differences between arrays and linked lists.",
                pauseForThought: {
                  question: "If you were building a playlist feature for a music app where users can easily add, remove, and reorder songs, would an array or a linked list be a more suitable underlying data structure for the playlist itself? Why?",
                  answerPrompt: "Consider insertion, deletion, and reordering costs.",
                  answer: "A Linked List would generally be more suitable. Adding/removing songs (nodes) or reordering them (changing pointers) is more efficient in a linked list than shifting elements in an array. While accessing a song by its number in the playlist might be slower (traversal), the dynamic modification benefits often outweigh this for such use cases."
                }
            }
          ],
          keyConcepts: ['Data Structures Definition', 'Arrays (Characteristics, Pros/Cons, Use Cases)', 'Array Indexing & Access', 'Linked Lists (Nodes, Pointers, Characteristics, Pros/Cons, Use Cases)', 'Singly vs. Doubly Linked Lists (Briefly)', 'Arrays vs. Linked Lists Trade-offs'],
        }
      },
      {
        id: 'quiz1',
        type: ContentItemType.QUIZ,
        data: {
          title: 'Module 2 Quiz: Algorithms & Data Structures',
          question: 'Which data structure typically offers faster insertion and deletion of elements in the middle of a collection, but slower access to an element at a specific position (index)?',
          options: [
            { text: 'Static Array', isCorrect: false },
            { text: 'Linked List', isCorrect: true },
            { text: 'Dynamic Array (when not resizing)', isCorrect: false },
            { text: 'Sorted Array', isCorrect: false },
          ],
          explanation: 'Linked Lists allow for O(1) insertion/deletion if you have a pointer to the node before/after the point of change (finding the node can be O(N)). Arrays require shifting elements (O(N)) for middle insertions/deletions. Arrays offer O(1) indexed access, while linked lists require O(N) traversal.',
          relatedLessonIds: ['module2_lesson2'],
        },
      },
    ],
  },
  // --- NEW MODULE 3: Algorithmic Thinking in Games ---
  {
    id: 'module3',
    title: 'Module 3: Algorithmic Thinking in Games',
    description: 'Explore how algorithmic thinking applies to game strategies and puzzle solving.',
    longDescription: 'This module delves into the application of algorithmic thinking in various game scenarios. Learn to analyze game rules, devise strategies, and solve puzzles like Flow Bridges, Game of Sim, Guards in the Gallery, and Shafts through a computational lens.',
    estimatedTime: 'Approx. 2.5 hours',
    icon: PuzzlePieceIcon, // Using PuzzlePieceIcon, can be changed
    items: [
      {
        id: 'lesson1',
        type: ContentItemType.LESSON,
        data: {
          title: 'Flow Bridges - Connecting the Dots',
          pages: [
            {
              title: 'Introduction to Flow Bridges',
              paragraphs: [
                'Flow Bridges (also known as Hashiwokakero or Bridges) is a logic puzzle where you connect islands with bridges. The number on each island indicates how many bridges must connect to it.',
                'Bridges must be horizontal or vertical, cannot cross other bridges or islands, and can have at most two bridges between any pair of islands. The goal is to connect all islands into a single network.',
              ],
              imageUrl: '/images/games/flow_bridges_concept.jpg',
              imageCaption: 'Conceptual visualization of a Flow Bridges puzzle.',
            },
            {
              title: 'Algorithmic Approach to Flow Bridges',
              paragraphs: [
                'Solving Flow Bridges involves logical deduction and sometimes backtracking. Start with islands that have few connection options (e.g., an island with \'1\' in a corner).',
                'Think about how a computer might approach this: identifying "forced" moves, exploring possibilities, and ensuring all rules are met. This is where an interactive component can help visualize these steps.',
              ],
              animationComponentName: 'FlowBridgesPuzzle',
            },
          ],
          keyConcepts: ['Logic Puzzles', 'Constraint Satisfaction', 'Graph Connectivity (Implicit)', 'Deductive Reasoning'],
        },
      },
      {
        id: 'lesson2',
        type: ContentItemType.LESSON,
        data: {
          title: 'Game of Sim - Strategic Symmetric Games',
          pages: [
            {
              title: 'Understanding the Game of Sim',
              paragraphs: [
                'The Game of Sim is a two-player game played on a set of six vertices. Players take turns drawing an edge between two vertices, using different colors. The first player to complete a triangle of their own color *loses* the game.',
                'It\'s a symmetric game with a finite number of moves, and it\'s known that the second player can always win with optimal play (though finding the winning strategy is complex).',
              ],
              imageUrl: '/images/games/game_of_sim_board.jpg',
              imageCaption: 'A board setup for the Game of Sim with 6 vertices.',
            },
            {
              title: 'Strategic Thinking in Sim',
              paragraphs: [
                'Consider the strategies: How do you avoid creating a losing triangle while forcing your opponent into one? This involves looking ahead and analyzing possible board states.',
                'An interactive component could allow playing against a simple AI or visualizing game trees.',
              ],
              animationComponentName: 'GameOfSimInteractive',
            },
          ],
          keyConcepts: ['Two-Player Games', 'Game Theory Basics', 'Symmetric Games', 'Combinatorial Game Theory', 'Winning/Losing Conditions'],
        },
      },
      {
        id: 'lesson3',
        type: ContentItemType.LESSON,
        data: {
          title: 'Guards in the Gallery - Art Gallery Problem Insights',
          pages: [
            {
              title: 'The Art Gallery Problem',
              paragraphs: [
                'The Art Gallery Problem asks for the minimum number of guards (stationary point guards) needed to see every point within a simple polygon (representing an art gallery).',
                'This problem has fascinating connections to geometry and graph theory. For a simple polygon with `n` vertices, `floor(n/3)` guards are always sufficient and sometimes necessary.',
              ],
              imageUrl: '/images/games/art_gallery_problem_concept.jpg',
              imageCaption: 'Illustration of an art gallery polygon with guard placements.',
            },
            {
              title: 'Visualizing Guard Placement',
              paragraphs: [
                'How can we determine optimal guard placements? This often involves triangulating the polygon and using graph coloring concepts.',
                'An interactive visualizer could allow users to draw polygons and experiment with guard placements, or see an algorithm in action.',
              ],
              animationComponentName: 'GuardsGalleryVisualizer',
            },
          ],
          keyConcepts: ['Computational Geometry', 'Polygon Visibility', 'Optimization Problems', 'Graph Coloring (Conceptual Link)'],
        },
      },
      {
        id: 'lesson4',
        type: ContentItemType.LESSON,
        data: {
          title: 'Shafts - Decision Making Under Constraints',
          pages: [
            {
              title: 'The "Shafts" Game/Puzzle Concept',
              paragraphs: [
                'Imagine a game or puzzle (like "Shaft - Decision Making" from your list) where players must make choices to navigate or collect items in a constrained environment, perhaps like a mine shaft with limited resources or paths.',
                'This involves evaluating options, considering immediate vs. long-term rewards, and resource management.',
              ],
              imageUrl: '/images/games/shafts_decision_concept.jpg',
              imageCaption: 'Conceptual image of navigating a mine shaft or constrained path.',
            },
            {
              title: 'Decision Trees & Optimal Paths',
              paragraphs: [
                'Problems like these can often be modeled using decision trees or graphs where nodes represent states and edges represent actions with associated costs or rewards.',
                'Algorithms for finding optimal paths (like Dijkstra\'s or A*) or making optimal decisions (like minimax for game AI) are relevant here. An interactive element could show a simplified decision tree or pathfinding visualization.',
              ],
              animationComponentName: 'ShaftsDecisionTree',
            },
          ],
          keyConcepts: ['Decision Making', 'Resource Management', 'Optimization', 'Decision Trees', 'Pathfinding (Conceptual)'],
        },
      },
      {
        id: 'quiz_module3',
        type: ContentItemType.QUIZ,
        data: {
          title: 'Quiz: Algorithmic Thinking in Games',
          question: 'In the Game of Sim, what is the condition for a player to lose?',
          options: [
            { text: 'Completing a square of their color.', isCorrect: false },
            { text: 'Completing a triangle of their color.', isCorrect: true },
            { text: 'Running out of vertices to connect.', isCorrect: false },
            { text: 'Connecting all six vertices.', isCorrect: false },
          ],
          explanation: 'The losing condition in the Game of Sim is being the first player to form a triangle using only edges of their own color.',
          relatedLessonIds: ['module3_lesson2'],
        },
      },
    ],
  },
  // --- NEW MODULE 4: Core Algorithmic Techniques ---
  {
    id: 'module4',
    title: 'Module 4: Core Algorithmic Techniques',
    description: 'Dive deeper into essential algorithms like binary search and fundamental sorting methods.',
    longDescription: 'This module focuses on core algorithmic techniques. Revisit Binary Search with more depth, and explore fundamental sorting algorithms such as Bubble Sort, Selection Sort, Merge Sort, and Quick Sort, understanding their mechanics and efficiency.',
    estimatedTime: 'Approx. 3 hours',
    icon: AdjustmentsHorizontalIcon,
    items: [
      {
        id: 'lesson1',
        type: ContentItemType.LESSON,
        data: {
          title: 'Binary Search - Deep Dive',
          pages: [
            {
              title: 'Revisiting Binary Search',
              paragraphs: [
                'Binary Search is a highly efficient algorithm for finding an item in a **sorted** array. It works by repeatedly dividing the search interval in half.',
                'If the value of the search key is less than the item in the middle of the interval, narrow the interval to the lower half. Otherwise, narrow it to the upper half. This continues until the value is found or the interval is empty.',
              ],
              imageUrl: '/images/algorithms/binary_search_concept.jpg',
              imageCaption: 'Visual representation of Binary Search dividing a sorted array.',
            },
            {
              title: 'Implementation Details and Edge Cases',
              paragraphs: [
                'Key aspects include correct handling of indices (start, end, middle) and termination conditions. What happens if the element is not found? What if the array has duplicates?',
                'We can visualize its O(log N) efficiency by seeing how quickly the search space shrinks.',
              ],
              animationComponentName: 'BinarySearchVisualizer',
            },
          ],
          keyConcepts: ['Binary Search Algorithm', 'Sorted Arrays', 'Divide and Conquer', 'Logarithmic Time Complexity O(log N)', 'Iterative vs. Recursive Implementation'],
        },
      },
      {
        id: 'lesson2',
        type: ContentItemType.LESSON,
        data: {
          title: 'Sorting Fundamentals - Bubble & Selection Sort Visualized',
          pages: [
            {
              title: 'Introduction to Sorting Algorithms',
              paragraphs: [
                'Sorting is a fundamental algorithmic problem: arranging a collection of items in a specific order (e.g., numerical or alphabetical).',
                'We will start with two basic, intuitive sorting algorithms: Bubble Sort and Selection Sort. While not the most efficient for large datasets, they are excellent for understanding core sorting concepts.',
              ],
              imageUrl: '/images/algorithms/sorting_overview.jpg',
              imageCaption: 'Conceptual image showing unsorted items transforming into sorted items.',
            },
            {
              title: 'Bubble Sort',
              paragraphs: [
                'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The largest elements "bubble" to the end of the list.',
                'It has a time complexity of O(N<sup>2</sup>).',
              ],
              animationComponentName: 'BubbleSortVisualizer',
            },
            {
              title: 'Selection Sort',
              paragraphs: [
                'Selection Sort divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly finds the smallest (or largest, depending on sorting order) element from the unsorted sublist and moves it to the sorted sublist.',
                'It also has a time complexity of O(N<sup>2</sup>).',
              ],
              animationComponentName: 'SelectionSortVisualizer',
            },
          ],
          keyConcepts: ['Sorting Algorithms', 'Comparison Sorts', 'Bubble Sort (Mechanism, Complexity)', 'Selection Sort (Mechanism, Complexity)', 'In-place Sorting'],
        },
      },
      {
        id: 'lesson3',
        type: ContentItemType.LESSON,
        data: {
          title: 'Merge Sort - Divide and Conquer in Sorting',
          pages: [
            {
              title: 'The Merge Sort Algorithm',
              paragraphs: [
                'Merge Sort is an efficient, comparison-based sorting algorithm that uses the **Divide and Conquer** strategy.',
                'It divides the unsorted list into n sublists, each containing one element (a list of one element is considered sorted). Then, it repeatedly merges sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list.',
              ],
              imageUrl: '/images/algorithms/merge_sort_diagram.jpg',
              imageCaption: 'Diagram illustrating the divide and conquer steps of Merge Sort.',
            },
            {
              title: 'The Merge Step & Efficiency',
              paragraphs: [
                'The core of Merge Sort is the "merge" step, which combines two sorted sub-arrays into a single sorted array.',
                'Merge Sort has a time complexity of O(N log N) in all cases (worst, average, best), making it very efficient for large datasets. It typically requires O(N) auxiliary space.',
              ],
              animationComponentName: 'MergeSortVisualizer',
            },
          ],
          keyConcepts: ['Merge Sort Algorithm', 'Divide and Conquer Strategy', 'Recursive Sorting', 'Merging Sorted Arrays', 'Time Complexity O(N log N)', 'Space Complexity'],
        },
      },
      {
        id: 'lesson4',
        type: ContentItemType.LESSON,
        data: {
          title: 'Quick Sort - Efficient Pivoting Strategies',
          pages: [
            {
              title: 'The Quick Sort Algorithm',
              paragraphs: [
                'Quick Sort is another efficient sorting algorithm, also based on the Divide and Conquer strategy. It works by selecting a \'pivot\' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.',
                'The sub-arrays are then sorted recursively.',
              ],
              imageUrl: '/images/algorithms/quick_sort_diagram.jpg',
              imageCaption: 'Diagram showing partitioning around a pivot in Quick Sort.',
            },
            {
              title: 'Partitioning and Pivot Selection',
              paragraphs: [
                'The choice of pivot and the partitioning scheme are crucial for Quick Sort\'s performance. A good pivot choice leads to balanced partitions.',
                'Quick Sort has an average time complexity of O(N log N), but its worst-case complexity is O(N<sup>2</sup>) (e.g., if the pivot is always the smallest or largest element). It can be implemented in-place, requiring O(log N) auxiliary space for recursion stack.',
              ],
              animationComponentName: 'QuickSortVisualizer',
            },
          ],
          keyConcepts: ['Quick Sort Algorithm', 'Pivot Selection', 'Partitioning Scheme', 'Recursive Sorting', 'Average Time Complexity O(N log N)', 'Worst-Case Time Complexity O(N^2)'],
        },
      },
      {
        id: 'puzzle_sorting_visualizer',
        type: ContentItemType.PUZZLE,
        data: {
          title: 'Interactive: Sorting Algorithm Visualizer',
          problemStatement: [
            'Experiment with different sorting algorithms on various datasets. Observe how Bubble Sort, Selection Sort, Merge Sort, and Quick Sort handle different input sizes and initial orderings.',
            'Adjust the array size and animation speed to see the algorithms in action. Pay attention to the number of comparisons and swaps (if shown).',
          ],
          imageUrl: '/images/algorithms/sorting_visualizer_ui.jpg',
          interactivePrompt: 'Select an algorithm, array size, and initial order. Click "Sort" to visualize.',
          hints: [
            'Try small arrays first to understand the step-by-step process.',
            'Observe how O(N^2) algorithms (Bubble, Selection) slow down significantly with larger arrays compared to O(N log N) algorithms (Merge, Quick).',
            'Notice the difference in behavior for nearly sorted, reverse sorted, and random arrays.',
          ],
          solutionSteps: [ // General observations for a visualizer
            '1. Select Algorithm: Choose from Bubble, Selection, Merge, or Quick Sort.',
            '2. Configure Input: Set array size, initial order (random, sorted, reversed).',
            '3. Control Animation: Use play, pause, step, and speed controls.',
            '4. Observe: Watch how elements are compared and moved. Note highlighted elements or bars representing values.',
            '5. Analyze: Pay attention to statistics like comparisons and swaps if provided by the visualizer.',
          ],
        },
      },
      {
        id: 'quiz_module4',
        type: ContentItemType.QUIZ,
        data: {
          title: 'Quiz: Core Algorithmic Techniques',
          question: 'Which sorting algorithm consistently has a time complexity of O(N log N) in worst, average, and best cases?',
          options: [
            { text: 'Bubble Sort', isCorrect: false },
            { text: 'Quick Sort', isCorrect: false },
            { text: 'Merge Sort', isCorrect: true },
            { text: 'Selection Sort', isCorrect: false },
          ],
          explanation: 'Merge Sort always divides the array in half and takes linear time to merge, resulting in O(N log N) consistently. Quick Sort has an O(N^2) worst case.',
          relatedLessonIds: ['module4_lesson3', 'module4_lesson4'],
        },
      },
    ],
  },
  // --- NEW MODULE 5: Introduction to Graph Algorithms ---
  {
    id: 'module5',
    title: 'Module 5: Introduction to Graph Algorithms',
    description: 'Learn the basics of graph data structures and fundamental traversal algorithms like BFS and DFS.',
    longDescription: 'This module introduces graph data structures, their terminology, and common representations. You will learn about fundamental graph traversal algorithms: Breadth-First Search (BFS) and Depth-First Search (DFS), and see their application in problems like maze solving.',
    estimatedTime: 'Approx. 3 hours',
    icon: BrainIcon, // Representing connections
    items: [
      {
        id: 'lesson1',
        type: ContentItemType.LESSON,
        data: {
          title: 'Graphs: Terminology & Representations',
          pages: [
            {
              title: 'What is a Graph?',
              paragraphs: [
                'In computer science, a graph is a data structure consisting of a set of **vertices** (or nodes) and a set of **edges** that connect pairs of vertices.',
                'Graphs are used to model relationships between objects. Examples: social networks, road maps, computer networks.',
              ],
              imageUrl: '/images/graphs/graph_basics_nodes_edges.jpg',
              imageCaption: 'A simple graph showing vertices and edges.',
            },
            {
              title: 'Graph Terminology',
              paragraphs: [
                'Key terms: Vertex, Edge, Directed vs. Undirected graphs, Weighted vs. Unweighted graphs, Path, Cycle, Connected graph, Degree of a vertex.',
                'Understanding this terminology is crucial for working with graph algorithms.',
              ],
            },
            {
              title: 'Representing Graphs',
              paragraphs: [
                'Common ways to represent graphs in code:',
                '- **Adjacency Matrix:** A 2D array where the entry M[i][j] is 1 if there is an edge from vertex i to vertex j, and 0 otherwise.',
                '- **Adjacency List:** An array of lists, where for each vertex i, AdjacencyList[i] stores a list of vertices adjacent to i.',
                'Each representation has its trade-offs in terms of space and time efficiency for different operations.',
              ],
              imageUrl: '/images/graphs/adjacency_matrix_list.jpg',
              imageCaption: 'Comparison of Adjacency Matrix and Adjacency List representations.',
              animationComponentName: 'GraphRepresentationToggle',
            },
          ],
          keyConcepts: ['Graph Definition (Vertices, Edges)', 'Directed vs. Undirected Graphs', 'Weighted vs. Unweighted Graphs', 'Graph Terminology (Path, Cycle, Degree)', 'Adjacency Matrix', 'Adjacency List'],
        },
      },
      {
        id: 'lesson2',
        type: ContentItemType.LESSON,
        data: {
          title: 'Graph Traversal: Breadth-First Search (BFS)',
          pages: [
            {
              title: 'Introduction to BFS',
              paragraphs: [
                'Breadth-First Search (BFS) is a graph traversal algorithm that explores all the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.',
                'It uses a queue data structure to keep track of the next vertex to visit.',
              ],
              imageUrl: '/images/graphs/bfs_traversal_levels.jpg',
              imageCaption: 'BFS exploring a graph level by level.',
            },
            {
              title: 'BFS Algorithm Steps',
              paragraphs: [
                '1. Start at a source vertex and add it to a queue. Mark it as visited.',
                '2. While the queue is not empty:',
                '   a. Dequeue a vertex `u`.',
                '   b. For each unvisited neighbor `v` of `u`:',
                '      i. Mark `v` as visited.',
                '      ii. Enqueue `v`.',
                'BFS is often used to find the shortest path in an unweighted graph.',
              ],
              animationComponentName: 'BFSTraversalAnimation',
            },
          ],
          keyConcepts: ['Graph Traversal', 'Breadth-First Search (BFS)', 'Queue Data Structure', 'Level-Order Traversal', 'Shortest Path (Unweighted Graphs)'],
        },
      },
      {
        id: 'lesson3',
        type: ContentItemType.LESSON,
        data: {
          title: 'Graph Traversal: Depth-First Search (DFS)',
          pages: [
            {
              title: 'Introduction to DFS',
              paragraphs: [
                'Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking.',
                'It uses a stack data structure (often implicitly via recursion) to keep track of vertices to visit.',
              ],
              imageUrl: '/images/graphs/dfs_traversal_path.jpg',
              imageCaption: 'DFS exploring a graph by going deep into branches.',
            },
            {
              title: 'DFS Algorithm Steps',
              paragraphs: [
                '1. Start at a source vertex `u` and mark it as visited.',
                '2. For each unvisited neighbor `v` of `u`:',
                '   a. Recursively call DFS on `v`.',
                '(Iterative version uses an explicit stack). DFS is used in cycle detection, topological sorting, and finding connected components.',
              ],
              animationComponentName: 'DFSTraversalAnimation',
            },
          ],
          keyConcepts: ['Depth-First Search (DFS)', 'Stack Data Structure / Recursion', 'Backtracking', 'Applications (Cycle Detection, Topological Sort)'],
        },
      },
      {
        id: 'puzzle_maze_solver',
        type: ContentItemType.PUZZLE,
        data: {
          title: 'Puzzle: Maze Solver using BFS/DFS',
          problemStatement: [
            'Given a 2D grid representing a maze (with walls and open paths), find a path from a starting point to an ending point.',
            'This problem can be modeled as a graph problem where each open cell is a vertex and adjacent open cells have edges between them.',
            'Explore how BFS or DFS can be used to find a path through the maze.',
          ],
          imageUrl: '/images/graphs/maze_solver_concept.jpg',
          interactivePrompt: 'Visualize BFS finding the shortest path or DFS exploring paths in a maze.',
          hints: [
            'BFS will find the shortest path in terms of number of steps.',
            'DFS will find a path, but not necessarily the shortest. It might explore long winding paths first.',
            'Keep track of visited cells to avoid cycles and redundant work.',
            'How do you represent the maze and valid moves (up, down, left, right)?',
          ],
          solutionSteps: [
            '1. Model the Maze: Represent the maze as a grid. Identify start, end, walls, and open paths.',
            '2. BFS Approach: Start BFS from the start cell. Explore neighbors (up, down, left, right if not a wall and not visited). Use a queue. Keep track of parent pointers to reconstruct the path once the end cell is reached.',
            '3. DFS Approach: Start DFS from the start cell. Explore one neighbor deeply. Use recursion or a stack. If the end cell is reached, a path is found. Backtrack if a dead end is hit.',
            '4. Path Reconstruction: Once the end cell is found, trace back using parent pointers (for BFS) or the recursion stack (for DFS) to get the actual path.',
          ],
        },
      },
      {
        id: 'quiz_module5',
        type: ContentItemType.QUIZ,
        data: {
          title: 'Quiz: Introduction to Graph Algorithms',
          question: 'Which graph traversal algorithm is typically used to find the shortest path between two nodes in an unweighted graph?',
          options: [
            { text: 'Depth-First Search (DFS)', isCorrect: false },
            { text: 'Breadth-First Search (BFS)', isCorrect: true },
            { text: 'Dijkstra\'s Algorithm', isCorrect: false }, // Dijkstra is for weighted
            { text: 'Merge Sort', isCorrect: false },
          ],
          explanation: 'Breadth-First Search (BFS) explores the graph layer by layer, guaranteeing that it finds the shortest path (in terms of number of edges) in an unweighted graph.',
          relatedLessonIds: ['module5_lesson2'],
        },
      },
    ],
  },
  // --- NEW MODULE 6: Algorithmic Paradigms: DP & Greedy ---
  {
    id: 'module6',
    title: 'Module 6: Algorithmic Paradigms - DP & Greedy',
    description: 'Introduce powerful algorithmic paradigms: Dynamic Programming and Greedy Algorithms.',
    longDescription: 'This module introduces two powerful algorithmic paradigms. Learn the fundamentals of Dynamic Programming (DP) through memoization and tabulation (linking back to Fibonacci), and apply it to problems like the Knapsack problem. Also, explore Greedy Algorithms and their application in scenarios like the Coin Change problem.',
    estimatedTime: 'Approx. 3.5 hours',
    icon: LightBulbIcon, // For innovative approaches
    items: [
      {
        id: 'lesson1',
        type: ContentItemType.LESSON,
        data: {
          title: 'Dynamic Programming: Introduction & Memoization',
          pages: [
            {
              title: 'What is Dynamic Programming?',
              paragraphs: [
                'Dynamic Programming (DP) is an algorithmic technique for solving complex problems by breaking them down into simpler subproblems and storing the results of these subproblems to avoid recomputing them later.',
                'It\'s typically used for optimization problems where subproblems overlap. The Fibonacci sequence calculation with memoization (seen in Module 2) is a classic example of DP.',
              ],
              imageUrl: '/images/algorithms/dp_concept_overlapping_subproblems.jpg',
              imageCaption: 'Visualizing overlapping subproblems in a recursive solution, which DP addresses.',
            },
            {
              title: 'Memoization (Top-Down DP)',
              paragraphs: [
                'Memoization is an optimization technique where you store the results of expensive function calls and return the cached result when the same inputs occur again.',
                'It\'s essentially a top-down approach: you start with the original problem and recursively solve subproblems, storing their results. The recursive Fibonacci with a `memo` table is an example.',
              ],
            },
             {
              title: 'Tabulation (Bottom-Up DP)',
              paragraphs: [
                'Tabulation is another DP approach where you solve subproblems starting from the simplest ones and build up to the solution of the original problem, typically using an array or table.',
                'The iterative Fibonacci calculation (building up F[0], F[1], F[2]...F[n]) is an example of tabulation.',
              ],
              animationComponentName: 'FibonacciDPComparison', // Compares Memoization and Tabulation
            },
          ],
          keyConcepts: ['Dynamic Programming (DP)', 'Overlapping Subproblems', 'Optimal Substructure', 'Memoization (Top-Down)', 'Tabulation (Bottom-Up)'],
        },
      },
      {
        id: 'lesson2',
        type: ContentItemType.LESSON,
        data: {
          title: 'DP Example: The Knapsack Problem (0/1)',
          pages: [
            {
              title: 'The 0/1 Knapsack Problem',
              paragraphs: [
                'Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit (knapsack capacity) and the total value is as large as possible. In the 0/1 version, you can either take an entire item or leave it (no fractions).',
              ],
              imageUrl: '/images/algorithms/knapsack_problem_items.jpg',
              imageCaption: 'Items with weights and values, and a knapsack with a capacity.',
            },
            {
              title: 'Solving with Dynamic Programming',
              paragraphs: [
                'The Knapsack problem can be solved efficiently using DP by building a table where `dp[i][w]` represents the maximum value that can be obtained using the first `i` items with a maximum weight capacity of `w`.',
              ],
              animationComponentName: 'KnapsackDPTable',
            },
          ],
          keyConcepts: ['Knapsack Problem (0/1)', 'Optimization Problem', 'DP Table Construction', 'Decision (Include Item vs. Exclude Item)'],
        },
      },
      {
        id: 'lesson3',
        type: ContentItemType.LESSON,
        data: {
          title: 'Greedy Algorithms: Making Locally Optimal Choices',
          pages: [
            {
              title: 'What are Greedy Algorithms?',
              paragraphs: [
                'A Greedy Algorithm is an algorithmic paradigm that builds up a solution piece by piece, always choosing the next piece that offers the most obvious and immediate benefit (locally optimal choice).',
                'Greedy algorithms don\'t always yield a globally optimal solution, but for some problems, they do (e.g., Dijkstra\'s shortest path, Kruskal\'s/Prim\'s MST).',
              ],
              imageUrl: '/images/algorithms/greedy_choice_concept.jpg',
              imageCaption: 'A hand picking the "best" immediate option from several choices.',
            },
            {
              title: 'Characteristics and When They Work',
              paragraphs: [
                'Key idea: Make the choice that seems best at the moment and then solve the subproblems that arise later. The choice made cannot be undone.',
                'Greedy algorithms work if the problem exhibits the "greedy choice property" (a locally optimal choice leads to a globally optimal solution) and "optimal substructure" (an optimal solution to the problem contains optimal solutions to its subproblems).',
              ],
            },
          ],
          keyConcepts: ['Greedy Algorithm Paradigm', 'Locally Optimal Choice', 'Global Optimality (Not Guaranteed)', 'Greedy Choice Property', 'Optimal Substructure'],
        },
      },
      {
        id: 'lesson4',
        type: ContentItemType.LESSON,
        data: {
          title: 'Greedy Example: The Coin Change Problem',
          pages: [
            {
              title: 'The Coin Change Problem (Greedy Approach)',
              paragraphs: [
                'Given a set of coin denominations and a target amount, find the minimum number of coins required to make that amount.',
                'A common greedy approach is to always pick the largest denomination coin that is less than or equal to the remaining amount.',
              ],
              imageUrl: '/images/algorithms/coin_change_greedy.jpg',
              imageCaption: 'Making change using the largest available coin denominations first.',
            },
            {
              title: 'Does Greedy Always Work for Coin Change?',
              paragraphs: [
                'This greedy strategy works for standard coin systems (like USD: 1, 5, 10, 25 cents). However, it does *not* work for all arbitrary coin systems. For example, if coins are {1, 3, 4} and target is 6, greedy gives 4+1+1 (3 coins), but optimal is 3+3 (2 coins).',
                'For the general coin change problem where greedy fails, Dynamic Programming is often used.',
              ],
              animationComponentName: 'CoinChangeGreedy',
            },
          ],
          keyConcepts: ['Coin Change Problem', 'Greedy Approach for Coin Change', 'Limitations of Greedy Algorithms', 'When DP is Needed for Coin Change'],
        },
      },
      {
        id: 'quiz_module6',
        type: ContentItemType.QUIZ,
        data: {
          title: 'Quiz: Algorithmic Paradigms',
          question: 'Which algorithmic paradigm involves breaking a problem into overlapping subproblems and storing their solutions to avoid recomputation?',
          options: [
            { text: 'Greedy Algorithms', isCorrect: false },
            { text: 'Divide and Conquer (without overlapping subproblems)', isCorrect: false },
            { text: 'Dynamic Programming', isCorrect: true },
            { text: 'Brute Force', isCorrect: false },
          ],
          explanation: 'Dynamic Programming is characterized by solving overlapping subproblems and using memoization or tabulation to store their results, thereby improving efficiency.',
          relatedLessonIds: ['module6_lesson1'],
        },
      },
    ],
  },
  // Simplified Placeholder Modules 7-10
  ...Array.from({ length: 4 }, (_, i) => {
    const moduleNumber = i + 7;
    const placeholderTitles = [
        'Advanced Data Structures', 'Complexity Theory & NP Problems', 'Network Flow & Matching', 'Computational Geometry Applications'
    ];
    const placeholderDescriptions = [
        'Explore advanced data structures beyond trees and graphs.', 'Delve into the limits of computation and problem hardness.',
        'Learn about algorithms for network optimization problems.', 'Discover algorithms for geometric problems and their uses.'
    ];
    const placeholderIcons = [ServerIcon, ShieldCheckIcon, CodeIcon, BeakerIcon];
    const currentPlaceholderTitle = placeholderTitles[i % placeholderTitles.length];
    const placeholderImage = `/images/conceptual/module_placeholder_${(i % 4) + 1}.jpg`; 

    return {
        id: `module${moduleNumber}`,
        title: `Module ${moduleNumber}: ${currentPlaceholderTitle}`,
        description: placeholderDescriptions[i % placeholderDescriptions.length],
        longDescription: `An advanced exploration into ${currentPlaceholderTitle}. This module is designed for learners seeking to deepen their understanding of complex computational concepts and specialized algorithms.`,
        estimatedTime: `Approx. 3-4 hours`, 
        icon: placeholderIcons[i % placeholderIcons.length],
        items: [ 
          {
            id: 'lesson1',
            type: ContentItemType.LESSON,
            data: {
              title: `Introduction to ${currentPlaceholderTitle}`,
              pages: [{
                title: `Foundations of ${currentPlaceholderTitle}`,
                paragraphs: [`This lesson introduces ${currentPlaceholderTitle}, covering its core principles and significance in advanced computer science.`],
                imageUrl: placeholderImage
              },
              {
                title: `Key Areas in ${currentPlaceholderTitle}`,
                paragraphs: [`We will survey some key problems and techniques within the field of ${currentPlaceholderTitle}.`],
              }],
              keyConcepts: ['Advanced Topic Introduction', 'Core Principles', 'Key Problems'],
            },
          },
          {
            id: 'quiz1',
            type: ContentItemType.QUIZ,
            data: {
              title: `Quiz: ${currentPlaceholderTitle} Overview`,
              question: `What is a central theme or problem addressed by ${currentPlaceholderTitle}?`,
              options: [
                { text: `A core concept of ${currentPlaceholderTitle}`, isCorrect: true }, 
                { text: `A related but distinct concept`, isCorrect: false },
                { text: `An unrelated CS topic`, isCorrect: false },
              ],
              explanation: `Explanation detailing the core concept relevant to ${currentPlaceholderTitle}.`,
              relatedLessonIds: [`module${moduleNumber}_lesson1`],
            },
          },
        ],
      };
    }),
];
