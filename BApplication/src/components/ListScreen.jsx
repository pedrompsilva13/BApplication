import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Spinner } from './Spinner/Spinner';

const Buttons = styled.div`
    padding: 10px;
    
    .button:first-child {
        margin-right: 20px;
    }
`

const ListQuestions = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`

const QuestionsBox = styled.div`
    cursor: pointer;
    text-align: left;
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
`;

export const ListScreen = () => {
    const [questions, setQuestions] = useState([]);
    const [params] = useSearchParams();
    const [filter, setFilter] = useState(params.get('filter'));
    const [questionId, setQuestionId] = useState(undefined);
    const searchRef = useRef();
    const [isLoading, setIsLoading] = useState(true);

    const getQuestions = async () => {
        try {
            setIsLoading(true);
            const parameters = {
                limit: 10,
                offset: 10,
                filter
            }
            const { data } = await axios.get(`https://private-anon-22d3fdc680-blissrecruitmentapi.apiary-mock.com/questions`, { params: parameters });
            const allQuestions = [...questions, ...data];
            setQuestions(allQuestions);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            //TODO: ERROR
        }
    };

    useEffect(() => {
        if (filter === "") {
            searchRef.current.focus();
        } else {
            getQuestions();
        }
    }, [filter]);

    const openDetailScreen = useCallback((questionId) => {
        if (questionId) setQuestionId(questionId);
    }, [questionId]);


    if (isLoading) {
        return <Spinner />
    }

    if (questionId) {
        return <Navigate to={`/questions/${questionId}`} />
    }

    return (<div>
        {filter === "" && <input id="searchInput" type="text" ref={searchRef} value={filter} placeholder="search"></input>}
        <ListQuestions>
            {questions.map(question => {
                return <QuestionsBox onClick={() => openDetailScreen(question.id)}>
                    <p key={`question_${question.id}`}>{question.question}</p>
                    {question.choices.map((option, index) => {
                        return <li key={`${index}_option`}>{option.choice}</li>
                    })}
                </QuestionsBox>
            })}
        </ListQuestions>
        <Buttons>
            <button style={{ marginRight: '10px', cursor: 'pointer' }} onClick={getQuestions}>Load More Questions</button>
        </Buttons>
    </div>)
}