import './ResponseSidebar.css'
import React, { useEffect } from 'react';
import { Tooltip } from '@mui/material';

interface ResponseSidebarVal {
    answer: string,
    score: number,
    filename: string,
    id: string,
    pdf_page: number,
}

interface ResponseSidebarProps {
    responses: ResponseSidebarVal[],
    setFileTab: React.Dispatch<React.SetStateAction<number>>,
    fileArray: string[],
    setScrollId: React.Dispatch<React.SetStateAction<string>>,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>,
    handleClickParent: () => void,
}

export function ResponseSidebar({ responses, setFileTab, fileArray, setScrollId, setPageNumber, handleClickParent }: ResponseSidebarProps) {
    const [currItem, setCurrItem] = React.useState("");

    useEffect(() => {
        if (currItem == "" && responses.length > 0) {
            setCurrItem(responses[0].id);
        }
    }, [currItem, responses])

    // setScrollId to the first id when the responses change
    useEffect(() => {
        if (responses.length > 0) {
            setScrollId(responses[0].id);
            setCurrItem(responses[0].id);
            setPageNumber(responses[0].pdf_page);
        }
    }, [responses])


    // When a user clicks on an item, set the currItem to that item id
    // Change style based on whether the item is the currItem
    useEffect(() => {
        // remove the class from all that have it
        let items = document.getElementsByClassName("response-sidebar-button-selected");
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            item.classList.remove("response-sidebar-button-selected");
        }

        // add the class to the currItem
        let item = document.getElementById("sidebar_" + currItem)
        if (item) {
            item.classList.add("response-sidebar-button-selected");
        }
    }, [currItem])

    const handleClick = (response: ResponseSidebarVal) => {
        // Find the element of fileArray that matches the filename of the response
        // Set the file tab to the index of that element
        let index = fileArray.indexOf(response.filename);
        setFileTab(index);

        // Scroll to the response
        setScrollId(response.id);

        // Set the currItem to the response id
        setCurrItem(response.id);

        // Set the chosen answer to the response answer
        setPageNumber(response.pdf_page);
        
        // Call the parent function
        handleClickParent();
    }
    
    return (
        <div className="response-sidebar">
            {responses && responses.map((response, index) => (
                <div key={response.id} className="response-sidebar-item">
                    <Tooltip title={response.answer}>
                        <button id={"sidebar_" + response.id} className="response-sidebar-button" onClick={() => handleClick(response)}>
                            <div className="response-sidebar-answer">
                                {response.answer.split(" ").slice(0, 10).join(" ") + "..."}
                            </div>
                            <div className="response-sidebar-score">
                                {response.score}
                            </div>
                        </button>
                    </Tooltip>
                </div>
            ))}
        </div>
    );
}