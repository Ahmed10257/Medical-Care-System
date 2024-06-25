import React, { useState } from 'react';
import './Consultation.css'; 

interface Question {
  id: number;
  patientName: string;
  question: string;
  reply?: string;
}

const Consultation: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, patientName: 'John Doe', question: 'What are the side effects of this medication?' },
    { id: 2, patientName: 'Jane Smith', question: 'How often should I take my medication?' },
  ]);

  const [currentReply, setCurrentReply] = useState<{ [key: number]: string }>({});

  const handleReplyChange = (id: number, reply: string) => {
    setCurrentReply({ ...currentReply, [id]: reply });
  };

  const handleReplySubmit = (id: number) => {
    setQuestions(questions.map(q => (q.id === id ? { ...q, reply: currentReply[id] } : q)));
    setCurrentReply({ ...currentReply, [id]: '' });
  };

  return (
    <>
        <h1 className='h1'>Patient Questions</h1>
    <div className="consultation-container">
      <div className="questions-list">
        {questions.map((question) => (
          <div key={question.id} className="question-card">
            <div className="card-body">
              <h3 className="card-title">{question.patientName}</h3>
              <p className="card-text">{question.question}</p>
              {question.reply ? (
                <div className="reply-section">
                  <h4>Reply:</h4>
                  <p>{question.reply}</p>
                </div>
              ) : (
                <div className="reply-form">
                  <textarea
                    className="reply-input"
                    placeholder="Write your reply here..."
                    value={currentReply[question.id] || ''}
                    onChange={(e) => handleReplyChange(question.id, e.target.value)}
                  ></textarea>
                  <button
                    className="reply-submit-btn"
                    onClick={() => handleReplySubmit(question.id)}
                  >
                    Submit Reply
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Consultation;
