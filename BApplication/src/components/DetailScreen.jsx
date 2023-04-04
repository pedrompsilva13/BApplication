import React, { useCallback, useEffect, useState } from 'react';
import { Spinner } from './Spinner/Spinner';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const DetailScreen = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const { questionId } = useParams();

    const getAllQuestionInfo = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`https://private-anon-22d3fdc680-blissrecruitmentapi.apiary-mock.com/questions/${questionId}`);
            setData(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }, [questionId]);

    const onVoteAnswer = async (optionChoice) => {
        try {
            const choiceIndex = data.choices.findIndex(ch => optionChoice === ch.choice);
            data.choices[choiceIndex].votes += 1;
            setData(data);
            await axios.put(`https://private-anon-22d3fdc680-blissrecruitmentapi.apiary-mock.com/questions/${questionId}`, {
                data
            })
        } catch (error) {

        }
    };

    useEffect(() => {
        getAllQuestionInfo();
    }, [getAllQuestionInfo]);

    console.log('data > ', data)

    if (isLoading) return <Spinner />;

    return (<div style={{ display: 'inline-flex', width: "100%" }}>
        <img src={data.image_url} />
        <div style={{ padding: "20px" }}>
            <h3>{data.question}</h3>
            <div style={{ textAlign: 'left' }}>
                {data.choices.map((option, index) => {
                    return <div style={{ position: "relative", border: "1px solid black", padding: "15px", marginBottom: "10px", cursor: "pointer" }} onClick={() => onVoteAnswer(option.choice)}>
                        <div style={{ display: 'inline-flex' }}>
                            <div>
                                <span>{`${index + 1}) `}</span>
                                <span>{option.choice}</span>
                            </div>
                            <div style={{ position: 'absolute', right: '20px'}}>{option.votes}</div>
                        </div>
                    </div>
                })}
            </div>
            <p>{data.published_at}</p>
        </div>
        <div style={{ margin: "auto" }}>
            <img src={data.thumb_url} width={120} height={120} />
        </div>
    </div>)

}