import json
import os

path = r'd:\Projects\Aegis\learning-paths.json'
with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)

new_topics = {
    "cybersecurity": {
        "beginner": [
            {"title": "Firewalls 101", "desc": "What a firewall does and why it matters."},
            {"title": "Physical Security", "desc": "Locking screens and protecting devices from theft."},
            {"title": "Safe Downloads", "desc": "How to verify software sources before installing."},
            {"title": "Digital Footprint", "desc": "Understanding what trail you leave online."},
            {"title": "Online Shopping Safety", "desc": "How to safely use credit cards and verify sellers."},
            {"title": "Game Security", "desc": "Protecting gaming accounts and avoiding scams."},
            {"title": "Phishing Examples", "desc": "Looking at real-world phishing emails."},
            {"title": "Bluetooth Security", "desc": "Risks of leaving Bluetooth open and pairing."},
            {"title": "Backup Basics", "desc": "How to create your first simple backup."},
            {"title": "Reporting Incidents", "desc": "Who to call when you get hacked."},
            {"title": "Browser Privacy", "desc": "Incognito mode vs real privacy."},
            {"title": "Cookies and Tracking", "desc": "How websites follow you around the web."},
            {"title": "Password Recovery", "desc": "Securing your recovery emails and questions."},
            {"title": "Mobile App Permissions", "desc": "Why a flashlight app doesn't need your contacts."},
            {"title": "Social Engineering Basics", "desc": "How hackers trick humans."}
        ],
        "intermediate": [
            {"title": "VPN Protocols", "desc": "Differences between OpenVPN, WireGuard, and IPsec."},
            {"title": "MAC Spoofing", "desc": "What it is and when it is used."},
            {"title": "Understanding Malware Types", "desc": "Trojans, Worms, Spyware, and Adware."},
            {"title": "DNS Filtering", "desc": "Using custom DNS to block ads and malware."},
            {"title": "Secure Messaging", "desc": "Signal, WhatsApp, and End-to-End Encryption."},
            {"title": "File Encryption", "desc": "Using VeraCrypt or BitLocker for sensitive files."},
            {"title": "Social Engineering Traps", "desc": "Baiting, Quid Pro Quo, and Tailgating."},
            {"title": "Router Hardening", "desc": "Disabling WPS and updating firmware."},
            {"title": "Email Spoofing", "desc": "How hackers fake sender addresses."},
            {"title": "Keyloggers", "desc": "How they work and how to detect them."},
            {"title": "Network Scanning", "desc": "Introduction to tools like Nmap."},
            {"title": "Endpoint Security", "desc": "Beyond traditional antivirus software."},
            {"title": "Data Loss Prevention", "desc": "Keeping sensitive data inside the organization."},
            {"title": "Honeypots", "desc": "Trapping attackers with fake systems."},
            {"title": "Log Analysis", "desc": "Reading system logs to find anomalies."}
        ],
        "advanced": [
            {"title": "Penetration Testing", "desc": "Introduction to ethical hacking concepts."},
            {"title": "Wireshark Basics", "desc": "Analyzing network traffic packets."},
            {"title": "Buffer Overflows", "desc": "Understanding memory corruption vulnerabilities."},
            {"title": "SQL Injection", "desc": "How bad actors manipulate databases."},
            {"title": "Cross-Site Scripting (XSS)", "desc": "Executing malicious scripts in browsers."},
            {"title": "Botnets & DDoS", "desc": "How distributed denial of service attacks work."},
            {"title": "Reverse Engineering", "desc": "Decompiling and analyzing malware."},
            {"title": "Digital Forensics", "desc": "Tracking evidence after a cyber attack."},
            {"title": "Hardware Security", "desc": "Spectre, Meltdown, and CPU-level flaws."},
            {"title": "Advanced Cryptanalysis", "desc": "Breaking basic ciphers and understanding quantum risks."},
            {"title": "Zero-Day Exploits", "desc": "Vulnerabilities that vendors don't know about yet."},
            {"title": "Privilege Escalation", "desc": "Gaining admin rights from a standard account."},
            {"title": "Man-in-the-Middle Attacks", "desc": "Intercepting traffic between two parties."},
            {"title": "Stenography", "desc": "Hiding data within images or other files."},
            {"title": "Cloud Penetration Testing", "desc": "Unique challenges in securing AWS/Azure."}
        ]
    },
    "ai": {
        "beginner": [
            {"title": "Types of AI", "desc": "Narrow AI, General AI, and Superintelligence."},
            {"title": "Turing Test", "desc": "How we measure machine intelligence."},
            {"title": "AI in Video Games", "desc": "NPC behavior and pathfinding."},
            {"title": "Chatbots History", "desc": "From ELIZA to ChatGPT."},
            {"title": "Data for AI", "desc": "Why AI needs so much data."},
            {"title": "AI in Smartphones", "desc": "Facial recognition and predictive text."},
            {"title": "Self-Driving Cars", "desc": "Basic concepts of autonomous vehicles."},
            {"title": "AI in Art", "desc": "Generative art and copyright basics."},
            {"title": "Robotics Basics", "desc": "The intersection of hardware and AI."},
            {"title": "AI Limitations", "desc": "What AI currently cannot do."},
            {"title": "Recommendation Algorithms", "desc": "How TikTok keeps you scrolling."},
            {"title": "AI in Finance", "desc": "Fraud detection and algorithmic trading."},
            {"title": "Virtual Reality & AI", "desc": "Creating immersive responsive worlds."},
            {"title": "AI Assistants", "desc": "The evolution of Siri and Alexa."},
            {"title": "Deep Blue vs Kasparov", "desc": "When machines first beat chess grandmasters."}
        ],
        "intermediate": [
            {"title": "Training vs Inference", "desc": "The two main phases of an AI model's lifecycle."},
            {"title": "Overfitting & Underfitting", "desc": "Common problems in model training."},
            {"title": "Gradient Descent", "desc": "How neural networks optimize learning."},
            {"title": "Decision Trees", "desc": "A popular machine learning algorithm."},
            {"title": "Computer Vision Tasks", "desc": "Object detection, segmentation, and classification."},
            {"title": "Tokens and Context Windows", "desc": "How LLMs process and remember text."},
            {"title": "Zero-Shot Learning", "desc": "Getting answers without specific training examples."},
            {"title": "Transfer Learning", "desc": "Adapting existing models to new tasks."},
            {"title": "AI Bias Mitigation", "desc": "Techniques to make algorithms fairer."},
            {"title": "Parameters in AI", "desc": "What '8B' or '70B' models really mean."},
            {"title": "K-Means Clustering", "desc": "Grouping data without labels."},
            {"title": "Support Vector Machines", "desc": "Finding the best boundary between categories."},
            {"title": "Hidden Markov Models", "desc": "Predicting sequences of events."},
            {"title": "Recurrent Neural Networks (RNN)", "desc": "Processing sequential data like audio."},
            {"title": "Convolutional Neural Networks (CNN)", "desc": "The backbone of modern image processing."}
        ],
        "advanced": [
            {"title": "Attention Mechanism", "desc": "The math behind modern Transformers."},
            {"title": "LoRA and QLoRA", "desc": "Efficiently fine-tuning massive models."},
            {"title": "Vector Databases", "desc": "Storing semantic embeddings for RAG."},
            {"title": "Generative Adversarial Networks", "desc": "How GANs create realistic images."},
            {"title": "Diffusion Models", "desc": "The tech behind Midjourney and Stable Diffusion."},
            {"title": "Reinforcement Learning with Human Feedback (RLHF)", "desc": "How ChatGPT was aligned."},
            {"title": "Quantization", "desc": "Running large models on consumer hardware."},
            {"title": "AI Governance", "desc": "The EU AI Act and global regulations."},
            {"title": "Multi-Modal AI", "desc": "Models that understand text, audio, and video simultaneously."},
            {"title": "Neuro-symbolic AI", "desc": "Combining neural networks with logic rules."},
            {"title": "Mixture of Experts (MoE)", "desc": "How GPT-4 achieves scale efficiently."},
            {"title": "Model Pruning", "desc": "Removing redundant weights from a network."},
            {"title": "Swarm Intelligence", "desc": "Multiple AI agents working together."},
            {"title": "Few-Shot Prompting", "desc": "Advanced prompt engineering techniques."},
            {"title": "AI Safety and Alignment", "desc": "Solving the control problem."}
        ]
    },
    "programming": {
        "beginner": [
            {"title": "Version Control Basics", "desc": "Why we save code versions."},
            {"title": "What is an IDE?", "desc": "Integrated Development Environments explained."},
            {"title": "Command Line Intro", "desc": "Basic terminal navigation."},
            {"title": "HTML & CSS Basics", "desc": "The building blocks of the web."},
            {"title": "What is a Bug?", "desc": "The history and reality of software bugs."},
            {"title": "Arrays vs Lists", "desc": "Basic collections of data."},
            {"title": "Boolean Logic", "desc": "True, False, AND, OR, NOT."},
            {"title": "Reading Documentation", "desc": "How to learn from official manuals."},
            {"title": "Writing Clean Code", "desc": "Naming conventions and formatting."},
            {"title": "Compilers vs Interpreters", "desc": "How code turns into programs."},
            {"title": "Basic Algorithms", "desc": "Step-by-step problem solving."},
            {"title": "Flowcharts", "desc": "Visualizing your code logic."},
            {"title": "Pseudocode", "desc": "Writing logic without strict syntax."},
            {"title": "Variables Scope", "desc": "Where your data lives in memory."},
            {"title": "Libraries vs Frameworks", "desc": "Understanding the difference."}
        ],
        "intermediate": [
            {"title": "Git and GitHub", "desc": "Commits, branches, and pull requests."},
            {"title": "APIs (Application Programming Interfaces)", "desc": "How programs talk to each other over the web."},
            {"title": "JSON and XML", "desc": "Data interchange formats."},
            {"title": "Asynchronous Programming", "desc": "Promises, callbacks, and async/await."},
            {"title": "Unit Testing", "desc": "Writing code to test your code."},
            {"title": "Database Basics", "desc": "SQL vs NoSQL."},
            {"title": "Regular Expressions (Regex)", "desc": "Pattern matching in strings."},
            {"title": "Design Patterns", "desc": "Singleton, Factory, and Observer patterns."},
            {"title": "Memory Management", "desc": "Pointers, references, and garbage collection."},
            {"title": "Continuous Integration", "desc": "Automating builds and tests."},
            {"title": "Object-Oriented Programming", "desc": "Inheritance, Polymorphism, and Encapsulation."},
            {"title": "Functional Programming", "desc": "Pure functions and immutability."},
            {"title": "RESTful Services", "desc": "Designing standard web APIs."},
            {"title": "WebSockets", "desc": "Real-time communication in apps."},
            {"title": "Caching Strategies", "desc": "Speeding up your applications."}
        ],
        "advanced": [
            {"title": "Microservices Architecture", "desc": "Breaking monolithic apps into smaller services."},
            {"title": "Docker and Containers", "desc": "Packaging apps with their environments."},
            {"title": "Kubernetes", "desc": "Orchestrating containerized applications."},
            {"title": "Concurrency vs Parallelism", "desc": "Threads, processes, and multicore programming."},
            {"title": "Advanced SQL", "desc": "Window functions, CTEs, and query optimization."},
            {"title": "GraphQL", "desc": "A modern alternative to REST APIs."},
            {"title": "System Design", "desc": "Architecting highly scalable systems."},
            {"title": "WebAssembly (Wasm)", "desc": "Running compiled code in the browser at near-native speed."},
            {"title": "Distributed Systems", "desc": "Consensus, CAP theorem, and event sourcing."},
            {"title": "CI/CD Pipelines", "desc": "Advanced deployment strategies."},
            {"title": "Message Queues", "desc": "RabbitMQ, Kafka, and asynchronous processing."},
            {"title": "Graph Databases", "desc": "Neo4j and relationship-first data models."},
            {"title": "gRPC", "desc": "High-performance remote procedure calls."},
            {"title": "Serverless Architecture", "desc": "AWS Lambda and event-driven computing."},
            {"title": "Performance Profiling", "desc": "Finding and fixing CPU/Memory bottlenecks."}
        ]
    }
}

for subject in data:
    for level in data[subject]:
        current_len = len(data[subject][level])
        for idx, t in enumerate(new_topics[subject][level]):
            new_id = f"{subject[:3]}_{level[0]}{current_len + idx + 1}"
            data[subject][level].append({
                "id": new_id,
                "title": t["title"],
                "desc": t["desc"]
            })

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print("Added new topics successfully!")
