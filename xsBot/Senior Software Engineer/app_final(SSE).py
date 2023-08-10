import streamlit as st
import requests
import pymongo
import random

# API URLs
QUESTION_API_URL = "https://axisapi.onrender.com/Question"
ASSESS_API_URL = "https://axisapi.onrender.com/Assess"

# Fixed job description
FIXED_JOB_DESCRIPTION = "Senior Software Engineer"

# Function to get interview questions
def get_interview_questions():
    params = {
        'description': FIXED_JOB_DESCRIPTION
    }

    response = requests.get(QUESTION_API_URL, params=params)
    data = response.json()
    return data['questions']

# Function to calculate and display the score
def calculate_and_display_score(questions, answers, email):
    params = {
        'questions': questions,
        'answers': answers,
        'email': email
    }

    response = requests.get(ASSESS_API_URL, params=params)
    if response.status_code == 200:
        score_data = response.json()
        return score_data['score']
    else:
        return None
    

# Function to save data to MongoDB
def save_to_mongodb(email, score):
    client = pymongo.MongoClient("mongodb+srv://mahirakajaria:NL1htAGffe0TLscA@cluster0.estoffi.mongodb.net/")
    db = client["test"]
    # collection = db['testScore']
    user_collection = db['users']
    cvs_collection = db['cvs']

    user = user_collection.find_one({'email': email})

    if user:
        user_id = user['_id']
    else:
        print("Candidate email not found.")
        exit()
    
    job_id = "6789"  # Replace with the actual job ID

    update_result = cvs_collection.update_one(
        {'jobId': job_id, 'owner': user_id},
        {'$set': {'testScore': score}}
    )

    entry = {
        'jobid': "6789",
        'email': email,
        'score': score
    }
    # collection.insert_one(entry)
    client.close()


def main():
    st.title("xsBot.ai")
    
    st.write(f"Role: {FIXED_JOB_DESCRIPTION}")
    questions = get_interview_questions()
    
    email = st.text_input("Enter your email:")
    
    if "question_index" not in st.session_state:
        st.session_state.question_index = 0
        st.session_state.answers = [None] * len(questions)
    
    question_index = st.session_state.question_index
    
    if question_index < len(questions):
        current_question = questions[question_index]
        answer = st.text_area(f"Q{question_index+1}: {current_question}")
        st.session_state.answers[question_index] = answer
        
        if st.button("Next"):
            st.session_state.question_index += 1
    else:
        st.write("All questions answered. Click 'Submit' to see your score.")
    
    if st.button("Submit"):
        answers = st.session_state.answers
        score = calculate_and_display_score(questions, answers, email)
        
        if score is not None:
            st.success(f"Your Score: {score}")
            save_to_mongodb(email, score)

if __name__ == "__main__":
    main()
