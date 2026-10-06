import os
import json
import logging
import random
from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

OLLAMA_CHAT_URL = os.environ.get("OLLAMA_CHAT_URL", "http://localhost:11434/api/chat")
MODEL_NAME = os.environ.get("MODEL_NAME", "gemma2:2b")

SYSTEM_PROMPTS = {
    "cybersecurity": {
        "english": "You are Apex, a friendly cybersecurity teacher. Always reply in clear, simple English. Teach only defense, never hacking. Keep answers concise and practical.",
        "roman-urdu": "Tum Apex ho — ek dostana cybersecurity teacher. Tumhara kaam aam logon ko (khaas tor par Pakistan mein) online khatraat se bachna sikhana hai. HAMESHA ROMAN URDU mein jawab do — aasan alfaz, chhote jumle. Mushkil English terms aayein to aasan lafzon mein samjhao. Kabhi hacking ya ghair-qanooni kaam mat sikhana — sirf bachao (defense). Jawab mukhtasar aur practical rakho.",
        "urdu": "تم ایپکس ہو — ایک دوستانہ سائبر سیکیورٹی ٹیچر۔ تمہارا کام عام لوگوں کو آن لائن خطرات سے بچنا سکھانا ہے۔ ہمیشہ اردو (Urdu script) میں جواب دو — آسان الفاظ، چھوٹے جملے۔ مشکل انگریزی الفاظ کو آسان اردو میں سمجھاؤ۔ کبھی ہیکنگ یا غیر قانونی کام مت سکھانا — صرف بچاؤ (defense) کی تعلیم دو۔ جواب مختصر اور عملی رکھو۔"
    },
    "ai": {
        "english": "You are Apex, an AI teacher. Teach AI/ML basics in simple terms: what is AI, machine learning, LLMs, writing good prompts, proper use of AI tools, and avoiding deepfakes. Keep answers practical and concise.",
        "roman-urdu": "Tum Apex ho — AI teacher. AI/ML basics aasan lafzon mein sikhao: AI kya hai, machine learning, LLMs, achay prompts, AI tools ka sahi istemal, deepfake se bachao. Practical, mukhtasar sikhao.",
        "urdu": "تم ایپکس ہو — اے آئی ٹیچر۔ اے آئی اور مشین لرننگ کی بنیادی باتیں آسان الفاظ میں سکھاؤ: اے آئی کیا ہے، مشین لرننگ، بڑے لینگویج ماڈلز، اچھے پرامپٹ، اے آئی ٹولز کا صحیح استعمال، ڈیپ فیک سے بچاؤ۔ عملی اور مختصر سکھاؤ۔"
    },
    "programming": {
        "english": "You are Apex, a programming teacher. Teach from scratch: what is programming, then Python — variables, loops, functions. Give a short code example (in a code block) for every concept. Teach only ethical things — NEVER hacking or malware code.",
        "roman-urdu": "Tum Apex ho — programming teacher. Zero se sikhao: programming kya hai, phir Python — variables, loops, functions. Har concept ke saath chhota code example (code block mein). Sirf ethical cheezein — hacking/malware code KABHI nahi.",
        "urdu": "تم ایپکس ہو — پروگرامنگ ٹیچر۔ بالکل شروع سے سکھاؤ: پروگرامنگ کیا ہے، پھر پائتھون — ویری ایبلز، لوپس، فنکشنز۔ ہر تصور کے ساتھ کوڈ کی چھوٹی مثال دو (کوڈ بلاک میں)۔ صرف اخلاقی چیزیں سکھاؤ — ہیکنگ یا مالویئر کوڈ کبھی نہیں۔"
    }
}

# Load quiz bank
try:
    with open("quiz_bank.json", "r", encoding="utf-8") as f:
        QUIZ_BANK = json.load(f)
except Exception as e:
    app.logger.error(f"Error loading quiz_bank.json: {e}")
    QUIZ_BANK = []

# Load scenarios
try:
    with open("scenarios.json", "r", encoding="utf-8") as f:
        SCENARIOS = json.load(f)
except Exception as e:
    app.logger.error(f"Error loading scenarios.json: {e}")
    SCENARIOS = []

# Load learning paths
try:
    with open("learning-paths.json", "r", encoding="utf-8") as f:
        LEARNING_PATHS = json.load(f)
except Exception as e:
    app.logger.error(f"Error loading learning-paths.json: {e}")
    LEARNING_PATHS = {}

def call_ollama(prompt, system_prompt, format_type="", model=None, stream=False):
    model_to_use = model if model else MODEL_NAME
    data = {
        "model": model_to_use,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ],
        "stream": stream
    }
    if format_type == "json":
        data["format"] = "json"
        
    try:
        response = requests.post(OLLAMA_CHAT_URL, json=data, stream=stream, timeout=60)
        response.raise_for_status()
        
        if stream:
            def generate():
                for line in response.iter_lines():
                    if line:
                        yield line + b'\n'
            from flask import Response, stream_with_context
            return Response(stream_with_context(generate()), mimetype="application/x-ndjson")
            
        return response.json().get("message", {}).get("content", "").strip()
    except Exception as e:
        app.logger.error(f"Ollama API Error: {e}")
        return None

@app.route("/")
def index():
    return render_template("index.html")

CURATED_MODELS = [
    "gemma2:2b",
    "llama3.2:3b",
    "llama3.2:1b",
    "qwen2.5:3b",
    "qwen2.5:1.5b",
    "mistral:7b"
]

@app.route("/api/models", methods=["GET"])
def get_models():
    """Fetch available models from Ollama API and merge with curated list"""
    try:
        tags_url = OLLAMA_CHAT_URL.replace("/api/chat", "/api/tags")
        response = requests.get(tags_url, timeout=5)
        installed_models = []
        if response.status_code == 200:
            data = response.json()
            installed_models = [m['name'] for m in data.get('models', [])]
            
        models_info = []
        for cm in CURATED_MODELS:
            models_info.append({
                "name": cm,
                "installed": cm in installed_models,
                "curated": True
            })
            
        for im in installed_models:
            if im not in CURATED_MODELS:
                models_info.append({"name": im, "installed": True, "curated": False})
                
        return jsonify({"models": models_info})
    except Exception as e:
        app.logger.error(f"Error fetching models: {e}")
        models_info = [{"name": m, "installed": m == MODEL_NAME, "curated": True} for m in CURATED_MODELS]
        return jsonify({"models": models_info})

@app.route("/api/learning-paths", methods=["GET"])
def get_learning_paths():
    return jsonify(LEARNING_PATHS)

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    language = data.get("language", "roman-urdu")
    model = data.get("model", None)
    subject = data.get("subject", "cybersecurity")
    lesson_topic = data.get("lesson_topic", None)
    stream = data.get("stream", False)
    
    if not user_message and not lesson_topic:
        return jsonify({"error": "Message is required"}), 400
    
    sys_prompt = SYSTEM_PROMPTS.get(subject, SYSTEM_PROMPTS["cybersecurity"]).get(language, SYSTEM_PROMPTS["cybersecurity"]["roman-urdu"])
    
    if lesson_topic:
        lesson_context = f"\n\nTum is waqt LESSON de rahe ho on topic: [{lesson_topic}]. Aasan steps mein samjhao, 1 practical example do, aakhir mein samajh check karne ke liye 1 chhota sawal poocho. 120 alfaaz se zyada lamba na ho."
        sys_prompt += lesson_context
        if not user_message:
            user_message = f"Please give me a lesson on: {lesson_topic}"
            
    reply = call_ollama(user_message, sys_prompt, model=model, stream=stream)
    
    if stream and reply is not None:
        return reply # This is a streaming Response object
        
    if reply is None:
        return jsonify({"error": "AI se rabta nahi ho saka. Kya Ollama chal raha hai?"}), 500
        
    return jsonify({"reply": reply})

@app.route("/api/quiz/generate", methods=["GET"])
def generate_quiz():
    language = request.args.get("language", "roman-urdu")
    model = request.args.get("model", None)
    subject = request.args.get("subject", "cybersecurity")
    count_str = request.args.get("count", "5")
    
    try:
        count = int(count_str)
    except:
        count = 5

    sys_prompt = SYSTEM_PROMPTS.get(subject, SYSTEM_PROMPTS["cybersecurity"]).get(language, SYSTEM_PROMPTS["cybersecurity"]["roman-urdu"])
    
    topics_map = {
        "cybersecurity": {
            "english": "strong passwords, phishing, 2FA, public WiFi, scams",
            "roman-urdu": "mazboot passwords, phishing SMS/email, 2FA, public WiFi, scam calls, app permissions, social media privacy",
            "urdu": "mazboot passwords, phishing, 2FA, public WiFi, scams"
        },
        "ai": "AI basics, ML basics, LLMs, prompting, AI safety/deepfake",
        "programming": "programming basics, Python variables, loops, functions, errors"
    }

    if subject == "cybersecurity":
        topics = topics_map["cybersecurity"].get(language, topics_map["cybersecurity"]["roman-urdu"])
    else:
        topics = topics_map.get(subject, topics_map["cybersecurity"]["english"])
    
    if language == "english":
        prompt = f"""Give me {count} multiple choice questions (MCQs) on {subject}. Topics: {topics}.
Questions and options must be in English.
Output strictly in JSON format as an array of {count} objects:
{{
  "question": "Question text",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "answer": 0,
  "explanation": "Explanation text"
}}
Answer index must be 0 to 3. No markdown blocks, just valid JSON."""
    elif language == "urdu":
        prompt = f"""مجھے {subject} پر {count} کثیر الانتخابی سوالات (MCQs) دو۔ موضوعات: {topics}۔
سوالات اور جوابات اردو میں ہونے چاہئیں۔
آؤٹ پٹ صرف JSON فارمیٹ میں ہو، جس میں {count} سوالات ہوں۔ ہر سوال کا فارمیٹ یہ ہو:
{{
  "question": "سوال",
  "options": ["پہلا آپشن", "دوسرا آپشن", "تیسرا آپشن", "چوتھا آپشن"],
  "answer": 0,
  "explanation": "وضاحت"
}}
جواب کا انڈیکس 0 سے 3 تک ہو۔ کوئی مارک ڈاؤن نہ لکھیں، صرف JSON لکھیں۔"""
    else:
        prompt = f"""Mujhe {subject} par {count} multiple choice questions (MCQs) do. Topics: {topics}.
Sawal aur options Roman Urdu mein hone chahiye.
Output strictly JSON format mein hona chahiye jisme {count} objects ki array ho. Har object ka format:
{{
  "question": "Sawal",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "answer": 0,
  "explanation": "Wazahat"
}}
Answer index 0 se 3 tak hona chahiye. Koi markdown (jaise ```json) mat lagana, sirf valid JSON."""

    # Try to get JSON from model
    response_text = call_ollama(prompt, sys_prompt, format_type="json", model=model)
    if response_text:
        try:
            # Clean response text in case model outputs markdown blocks
            clean_text = response_text.strip()
            if clean_text.startswith("```json"):
                clean_text = clean_text[7:]
            elif clean_text.startswith("```"):
                clean_text = clean_text[3:]
            if clean_text.endswith("```"):
                clean_text = clean_text[:-3]
            clean_text = clean_text.strip()
            
            quiz_data = json.loads(clean_text)
            if isinstance(quiz_data, list) and len(quiz_data) >= 5:
                return jsonify({"quiz": quiz_data[:5]})
        except Exception as e:
            app.logger.error(f"Failed to parse model JSON: {e}")
            app.logger.error(f"Raw response: {response_text}")
    
    # Fallback to backup quiz bank
    if len(QUIZ_BANK) >= 5:
        fallback_quiz = random.sample(QUIZ_BANK, 5)
    else:
        fallback_quiz = QUIZ_BANK
    
    return jsonify({"quiz": fallback_quiz, "fallback": True})

@app.route("/api/scenarios", methods=["GET"])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route("/api/scenario/feedback", methods=["POST"])
def scenario_feedback():
    data = request.json
    situation = data.get("situation", "")
    choice = data.get("choice", "")
    language = data.get("language", "roman-urdu")
    model = data.get("model", None)
    
    sys_prompt = SYSTEM_PROMPTS.get(language, SYSTEM_PROMPTS["roman-urdu"])
    
    if language == "english":
        prompt = f'My scenario was: "{situation}"\nI chose this option: "{choice}"\n\nTell me in English if my decision was right or wrong and why. Also, what should one do in real life in such a situation?'
    elif language == "urdu":
        prompt = f'میرا منظر نامہ یہ تھا: "{situation}"\nمیں نے یہ آپشن چنا: "{choice}"\n\nمجھے اردو میں بتاؤ کہ میرا فیصلہ صحیح تھا یا غلط اور کیوں۔ اور حقیقی زندگی میں ایسی صورتحال میں کیا کرنا چاہیے؟'
    else:
        prompt = f'Mera scenario ye tha: "{situation}"\nMaine ye option chuna: "{choice}"\n\nMujhe Roman Urdu mein batao ke mera faisla sahi tha ya ghalat aur kyun. Aur asal zindagi mein aise halat mein kya karna chahiye.'

    reply = call_ollama(prompt, sys_prompt, model=model)
    if reply is None:
        return jsonify({"error": "AI se rabta nahi ho saka. Kya Ollama chal raha hai?"}), 500
        
    return jsonify({"feedback": reply})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
