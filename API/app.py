from flask import *
import io
import json
import time
import os
import re
from sklearn import preprocessing
import numpy as np
import PyPDF2 as pdf
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from google_drive_downloader import GoogleDriveDownloader as gdd
import nltk
import openai
import time
import smtplib
import ssl
import pymongo
from email.message import EmailMessage

app = Flask(__name__)

nltk.download("stopwords")
tier1=['BITS Pilani',
'DTU',
'NSUT Delhi',
'NIT Tiruchipally',
'NIT Warangal',
'NIT Surathkal',
'Jadavpur University',
'IIIT Allahabad',
'IIT Kharagpur',
'IIT Bombay',
'IIT Madras',
'IIT Kanpur',
'IIT Delhi',
'IIT Guwahati',
'IIT Roorkee',
'IIT Ropar',
'IIT Bhubaneswar',
'IIT Gandhinagar',
'IIT Hyderabad',
'IIT Jodhpur',
'IIT Patna',
'IIT Indore',
'IIT Mandi',
'IIT Varanasi',
'IIT Palakkad',
'IIT Tirupati',
'IIT Dhanbad',
'IIT Bhilai',
'IIT Dharwad',
'IIT Jammu',
'IIT Goa',
'NIT Rourkela',
'IIIT Hyderabad',
'IIIT Delhi']

tier2=['IIIT Bangalore',
'IGDTUW',
'IIITM Gwalior',
'IIIT Lucknow',
'MNNIT Allahabad',
'Punjab Engineering College',
'DAIICT',
'LNMIIT',
'BIT Mesra',
'IIIT Jabalpur',
'Jalpaiguri Government Engineering College',
'IIEST/BESU Shibpur',
'R.V. College of Engineering',
'NIT Bhopal',
'NIT Nagpur',
'NIT Durgapur',
'NIT Jamshedpur',
'NIT Srinagar',
'NIT Allahabad',
'NIT Surat',
'NIT Calicut',
'NIT Jaipur',
'NIT Kurukshetra',
'NIT Silchar',
'NIT Hamirpur',
'NIT Jalandhar',
'NIT Patna',
'NIT Raipur',
'NIT Agartala',
'NIT Arunachal Pradesh',
'NIT Delhi',
'NIT Goa',
'NIT Manipur',
'NIT Meghalaya',
'NIT Mizoram',
'NIT Nagaland',
'NIT Puducherry',
'NIT Sikkim',
'NIT Uttarakhand',
'NIT Andhra Pradesh']

openai.api_key = os.environ["open_ai_key"]

def tokenize(txt):
    tokens= re.split('\W+', txt)
    return tokens

def resume_analysis(file_name):
    f= open(file_name, 'rb')
    reader= pdf.PdfReader(f)
    pg= reader.pages[0]
    txt=pg.extract_text()
    txt=txt.lower()
    resume_vec= tokenize(txt)
    resume_vec = [word for word in resume_vec if not word in stopwords.words()]
    return resume_vec

def avg(a,b):
    return (a+b)/2

def jaccard_similarity(list1, list2):
    set1 = set(list1)
    set2 = set(list2)
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    return intersection / union

def url_to_id(url):
    x = url.split("/")
    return x[5]

def generate_interview_questions(job_description):
    prompt = f"Generate 5 tech interview questions, output each question with ### at start, for a role whose job description is:\n {job_description}."
    response = openai.Completion.create(
        engine="text-davinci-002",  # Use appropriate engine (GPT-3) or any upgraded version
        prompt=prompt,
        max_tokens=150,  # Adjust this to control the response length
        stop=None,  # Stop sequences if necessary
        temperature=0.6,  # Adjust this for diversity in responses
        n=1,  # Number of questions to generate
        echo=True,  # Return the prompt in the response for context
    )

    # Extract the generated questions from the API response
    questions = [choice['text'] for choice in response['choices']]
    return questions

def get_question_score(question,response):
    questions=""
    for i in range(len(question)):
        questions=questions+str(i)
        questions=questions+question[i]
    answers=""
    for i in range(len(response)):
        answers=answers+str(i)
        answers=answers+response[i]
    prompt = "The question are: "+questions+" The answers are: "+answers+". Score all the responses combined out of 10 combined considering\
    the answers specific to tech roles. JUST MENTION THE FINAL SCORE\
    AND NOTHING ELSE."
    answer= openai.Completion.create(
        engine="text-davinci-002",  # Use appropriate engine (GPT-3) or any upgraded version
        prompt=prompt,
        max_tokens=150,  # Adjust this to control the response length
        stop=None,  # Stop sequences if necessary
        n=1,  # Number of questions to generate
    )
    score = answer['choices'][0]['text']
    rr = re.findall("[+]?[.]?[\d]+(?:,\d\d\d)*[\.]?\d*(?:[eE][-+]?\d+)?", score)
    return rr[0]

@app.route('/CV',methods=['GET'])
def CV_handle():
    JD_text=str(request.args.get('description'))
    JD_text=JD_text.replace(" ", "")
    JD_text=JD_text.lower()
    jd_vec= tokenize(JD_text)
    jd_vec = [word for word in jd_vec if not word in stopwords.words()]
    email=str(request.args.get('email'))
    cgpa=float(request.args.get('cgpa'))
    inst=str(request.args.get('institute'))
    cv=str(request.args.get('CV'))
    ID=url_to_id(cv)
    gdd.download_file_from_google_drive(file_id=ID, dest_path='./lib/data/CV.pdf')
    location= './lib/data/CV.pdf'
    resume_tokens=resume_analysis(location)
    score=jaccard_similarity(jd_vec, resume_tokens)
    score=score*10
    cgpa=cgpa/10
    inst_score=0
    if inst in tier1:
        inst_score=1
    elif inst in tier2:
        inst_score=0.85
    else:
        inst_score=0.75
    final_score=score*inst_score*cgpa
    response={
        'email' : email,
        'CV_score' : final_score
    }
    
    return jsonify(response)

@app.route('/Paraphrasejd',methods=['GET','POST'])
def paraphrase():
    JD_text=str(request.args.get('description'))
    role=str(request.args.get('role'))
    prompt="For the role of "+role+" and the following JD, rewrite it to suit better to the role and \
    PRINT ONLY THE MODIFIED JD WITH ONLY THE SPECIFICATIONS AND ROLE MENTIONED WHILE REPLACING THE % WITH SPACE as the JD is coming\
    from a URL: "+ JD_text
    response = openai.Completion.create(
        engine="text-davinci-002",  # Use appropriate engine (GPT-3) or any upgraded version
        prompt=prompt,
        max_tokens=len(JD_text),
        stop = ["input:"],
    )

    # Extract the generated questions from the API response
    New_JD = response['choices'][0]['text']
    ans={
        "JD": New_JD
    }
    return jsonify(ans)
    
@app.route('/Question',methods=['GET'])
def gen_questions():
    JD_text=str(request.args.get('description'))
    questions = generate_interview_questions(JD_text)
    no_space=questions[0].replace("\n","")
    int_quest=no_space.split("###")
    final_quest=int_quest[2:]
    response={
        'questions' : final_quest 
    }
    return jsonify(response)
    
@app.route('/TestMail',methods=['GET','POST'])
# Set the subject and body of the email
def sendTestMail():
    param=str(request.args.get('email'))
    job_id=str(request.args.get('job_id'))
    print(job_id)
    email_sender = 'hirexs71@gmail.com'
    email_password = 'tcfpjoepyfxyjacd'
    email_receiver = param
    link=''
    if job_id == "6789":
        link = 'https://senior-software-engineer-bot-app-ixyu3x2ys72js3uwpnypgp.streamlit.app/'
    elif job_id == "9023":
        link = 'https://appuct-manager-bot-app-5ktvwc47vhuhwkhow4xdxt.streamlit.app/'
    elif job_id == "5214":
        link = 'https://data-scientist-bot-app-txnu96cu868jnqsxmtcx57.streamlit.app/'
    elif job_id == "7532":
        link = 'https://financial-advisor-bot-app-nttgg5tjvjxup9wxiv6vzh.streamlit.app/'
    elif job_id == "8346":
        link = 'https://software-engineer-bot-app-ec7xda7ny2wx7bilrgbztf.streamlit.app/'
    elif job_id == "1467":
        link = 'https://ai-research-scientist-bot-app-n9ic9sbwabn92y9z5vjpdd.streamlit.app/'
    else:
        link = 'https://software-engineer-bot-app-ec7xda7ny2wx7bilrgbztf.streamlit.app/'
    subject = ' Assessment Link from HireXS - Urgent Completion Required'
    body = f"""
    Dear Candidate,
    I hope this email finds you well. We are excited to inform you that we have identified you as a promising candidate from HireXS.
    As part of our rigorous selection process, we kindly request your assistance in evaluating your suitability for this position.
    Please complete the below assesment within a day so that we can further the evaluation process.
    Assesment Link:- {link}  
    Remember to open the link in a new tab."""

    em = EmailMessage()
    em['From'] = email_sender
    em['To'] = email_receiver
    em['Subject'] = subject
    em.set_content(body)

# Add SSL (layer of security)
    context = ssl.create_default_context()

# Log in and send the email
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, email_receiver, em.as_string())
    response={
        "sent" : "true",
    }
    return jsonify(response)
    
@app.route('/Assess',methods=['GET'])
def assess():
    questions=request.args.getlist('questions')
    answers=request.args.getlist('answers')
    email=request.args.get('email')
    score=float(get_question_score(questions,answers))
    response={
        'email': email,
        'score': score
    }
    return jsonify(response)

@app.route('/SelectMail',methods=['GET','POST'])
def sendSelectMail():
    param=str(request.args.get('email'))
    email_sender = 'hirexs71@gmail.com'
    email_password = 'tcfpjoepyfxyjacd'
    email_receiver = param

# Set the subject and body of the email
    subject = 'Congratulations on Your Selection for an Interview at Axis Bank!1'
    body = """
    Dear Candidate,
    We are thrilled to inform you that after a thorough review of your application, we are impressed with your qualifications and experiences,
    and we would like to invite you for an interview at Axis Bank.
    Your application stood out among a competitive pool of candidates, and we believe your skills and background align well with what we are looking
    for in this position.
    
    Interview Details:
    Date: 15th September 2023
    Time: 10:00 AM
    Location: Axis Bank, Bangalore
    
    Best regards,

    Axis Bank
    From HireXS Portal.
    """

    em = EmailMessage()
    em['From'] = email_sender
    em['To'] = email_receiver
    em['Subject'] = subject
    em.set_content(body)

# Add SSL (layer of security)
    context = ssl.create_default_context()

# Log in and send the email
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, email_receiver, em.as_string())
    response={
        "sent" : "true",
    }
    return jsonify(response)

@app.route('/submit',methods=['GET','POST'])
def save_to_mongodb():
    email= str(request.args.get('email'))
    email=email.replace('%40','@')
    score= request.args.get('score')
    job_id= str(request.args.get('job_id'))
    client = pymongo.MongoClient("mongodb+srv://mahirakajaria:NL1htAGffe0TLscA@cluster0.estoffi.mongodb.net/")
    db = client["test"]
    user_collection = db['users']
    cvs_collection = db['cvs']
    user = user_collection.find_one({'email': email})
    
    if user:
        user_id = user['_id']
        cvs_collection.update_one(
            {'jobId': job_id, 'owner': user_id},
            {"$set": {'testScore': score}}
        )
        client.close()
    else:
        print("Candidate email not found.")
        client.close()
    response={
        "val":"None",
        "email":email,
        'testscore': score,
        'job_id':job_id,
    }
    return jsonify(response) 
